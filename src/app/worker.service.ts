import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {AppWorker} from './worker';
import {environment} from '../environments/environment';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) {
  }
  private url = environment.urlCRUD + 'workers';

  getWorkers(): Observable<AppWorker[]> {
    return this.http.get(
      `${this.url}`, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log(res);
        return new Observable<AppWorker[]>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            let workers = parsed.response.worker;
            if (!Array.isArray(parsed.response.worker)) {
              workers = [];
              workers.push(parsed.response.worker);
            }
            console.log(workers);
            workers.forEach(worker => {
              worker.creationDate = worker.creationDate.slice(0, worker.creationDate.indexOf('['));
              if (worker.startDate && worker.startDate.charAt(0) === '0') { // todo check worker.startDate exists and nullable
                worker.startDate = worker.startDate.replace('0', '2');
              }
              if (worker.endDate && worker.endDate.charAt(0) === '0') { // todo check worker.endDate exists and nullable
                worker.endDate = worker.endDate.replace('0', '2');
              }
            });
            subscriber.next(workers);
            subscriber.complete();
          });
        });
      })
    );
  }

  getWorkersFilterSort(filterFields: string, sortFields: string, filterValues: string,
                       pageSize: number, pageNumber: number): Observable<AppWorker[]> {
    const url = `${this.url}` + this.makeFilterSortArgs(filterFields, sortFields, filterValues, pageSize, pageNumber);
    console.log(url);
    return this.http.get(
      url, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log(res);
        return new Observable<AppWorker[]>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            let workers = parsed.response.worker;
            if (!Array.isArray(parsed.response.worker)) {
              workers = [];
              workers.push(parsed.response.worker);
            }
            console.log(workers);
            workers.forEach(worker => {
              worker.creationDate = worker.creationDate.slice(0, worker.creationDate.indexOf('['));
              if (worker.startDate && worker.startDate.charAt(0) === '0') { // todo check worker.startDate exists and nullable
                worker.startDate = worker.startDate.replace('0', '2');
              }
              if (worker.endDate && worker.endDate.charAt(0) === '0') { // todo check worker.endDate exists and nullable
                worker.endDate = worker.endDate.replace('0', '2');
              }
            });
            subscriber.next(workers);
            subscriber.complete();
          });
        });
      })
    );
  }

  private makeFilterSortArgs(filterFields: string, sortFields: string, filterValues: string,
                             pageSize: number, pageNumber: number): string {
    let args = ('?' + ((filterFields !== '') ? 'filterFields=' + filterFields + '&' : '')
      + ((sortFields !== '') ? 'sortFields=' + sortFields + '&' : '')
      + ((filterValues !== '') ? 'filterValues=' + filterValues + '&' : '')
      + ((pageSize !== null) ? 'pageSize=' + pageSize + '&' : '')
      + ((pageNumber !== null) ? 'pageNumber=' + pageNumber + '&' : '')).trim();
    args = args.slice(0, -1);
    return args;
  }

  getWorker(id: number): Observable<AppWorker> {
    return this.http.get(
      `${this.url}/${id}`, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log(res);
        return new Observable<AppWorker>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            console.log(parsed);
            parsed.response.worker.creationDate =
              parsed.response.worker.creationDate.slice(0, parsed.response.worker.creationDate.indexOf('['));
            if (parsed.response.worker.startDate && parsed.response.worker.startDate.charAt(0) === '0') {
              // todo check worker.startDate exists and nullable
              parsed.response.worker.startDate = parsed.response.worker.startDate.replace('0', '2');
            }
            if (parsed.response.worker.endDate && parsed.response.worker.endDate.charAt(0) === '0') {
              // todo check worker.endDate exists and nullable
              parsed.response.worker.endDate = parsed.response.worker.endDate.replace('0', '2');
            }
            subscriber.next(parsed.response.worker);
            subscriber.complete();
          });
        });
      }));
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.url}/${id}`;
    return this.http.delete(
      url, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log(res);
        return new Observable<boolean>(subscriber => {
          subscriber.next(true);
          subscriber.complete();
        });
      })
    );
  }

  public getWorkerWithMaxSalary(): Observable<AppWorker> {
    const url = `${this.url}/max-salary`;
    return this.http.get(
      url, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log(res);
        return new Observable<AppWorker>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            console.log(parsed);
            parsed.response.worker.creationDate = parsed.response.worker.creationDate
              .slice(0, parsed.response.worker.creationDate.indexOf('['));
            if (parsed.response.worker.startDate && parsed.response.worker.startDate.charAt(0) === '0') {
              // todo check worker.startDate exists and nullable
              parsed.response.worker.startDate = parsed.response.worker.startDate.replace('0', '2');
            }
            if (parsed.response.worker.endDate && parsed.response.worker.endDate.charAt(0) === '0') {
              // todo check worker.endDate exists and nullable
              parsed.response.worker.endDate = parsed.response.worker.endDate.replace('0', '2');
            }
            subscriber.next(parsed.response.worker);
            subscriber.complete();
          });
        });
      })
    );
  }

  public getWorkersCountWithSalary(salary: number): Observable<number> {
    const url = `${this.url}/equal-salary?salary=${salary}`;
    return this.http.get(
      url, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log(res);
        return new Observable<number>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            console.log(parsed);
            subscriber.next(parsed.response.count);
            subscriber.complete();
          });
        });
      }));
  }

  public getWorkersWithPrefix(prefix: string): Observable<AppWorker[]> {
    const url = `${this.url}/name-starts-with?prefix=${prefix}`;
    return this.http.get(
      url, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log(res);
        return new Observable<AppWorker[]>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            let workers = parsed.response.worker;
            if (!Array.isArray(parsed.response.worker)) {
              workers = [];
              workers.push(parsed.response.worker);
            }
            console.log(workers);
            workers.forEach(worker => {
              worker.creationDate = worker.creationDate.slice(0, worker.creationDate.indexOf('['));
              if (worker.startDate && worker.startDate.charAt(0) === '0') { // todo check worker.startDate exists and nullable
                worker.startDate = worker.startDate.replace('0', '2');
              }
              if (worker.endDate && worker.endDate.charAt(0) === '0') { // todo check worker.endDate exists and nullable
                worker.endDate = worker.endDate.replace('0', '2');
              }
            });
            subscriber.next(workers);
            subscriber.complete();
          });
        });
      }));
  }

  save(worker: AppWorker) {
    if (worker.id) {
      return this.put(worker);
    }
    return this.post(worker);
  }

  // Add new worker
  private post(worker: AppWorker) {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/xml');
    return this.http.post(
      this.url, this.makeArgsForBody(worker), {responseType: 'text', headers}
    ).subscribe(res => {
      console.log(res);
      window.location.reload();
      return new Observable<AppWorker>(subscriber => {
        xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
          console.log(parsed);
          parsed.response.worker.creationDate = parsed.response.worker.creationDate
            .slice(0, parsed.response.worker.creationDate.indexOf('['));
          if (worker.startDate && worker.startDate.charAt(0) === '0') { // todo check worker.startDate exists and nullable
            worker.startDate = worker.startDate.replace('0', '2');
          }
          if (worker.endDate && worker.endDate.charAt(0) === '0') { // todo check worker.endDate exists and nullable
            worker.endDate = worker.endDate.replace('0', '2');
          }
          subscriber.next(parsed.response.worker);
          subscriber.complete();
        });
      });
    });
  }

  // Update existing worker
  private put(worker: AppWorker) {
    const url = `${this.url}/${worker.id}`; // todo test body
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/xml');
    return this.http.put(
      url, this.makeArgsForBody(worker), {responseType: 'text', headers}
    ).subscribe(res => {
      console.log(res);
      window.location.reload();
      return new Observable<AppWorker>(subscriber => {
        xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
          console.log(parsed);
          parsed.response.worker.creationDate = parsed.response.worker.creationDate
            .slice(0, parsed.response.worker.creationDate.indexOf('['));
          if (parsed.response.worker.startDate && parsed.response.worker.startDate.charAt(0) === '0') {
            // todo check worker.startDate exists and nullable
            parsed.response.worker.startDate = parsed.response.worker.startDate.replace('0', '2');
          }
          if (parsed.response.worker.endDate && parsed.response.worker.endDate.charAt(0) === '0') {
            // todo check worker.endDate exists and nullable
            parsed.response.worker.endDate = parsed.response.worker.endDate.replace('0', '2');
          }
          subscriber.next(parsed.response.worker);
          subscriber.complete();
        });
      });
    });
  }

  private makeArgsForBody(worker: AppWorker): string {
    return ('<worker>'
      + ((worker.name) ? '<name>' + worker.name + '</name>' : '')
      + ((worker.coordinateX)
        ? '<coordinates>'
        + '<x>' + worker.coordinateX + '</x>'
        + '<y>' + worker.coordinateY + '</y>'
        + '</coordinates>'
        : '')
      + ((worker.salary) ? '<salary>' + worker.salary + '</salary>' : '')
      + ((worker.startDate) ? '<startDate>' + worker.startDate + '</startDate>' : '')
      + ((worker.endDate) ? '<endDate>' + worker.endDate + '</endDate>' : '')
      + ((worker.position) ? '<position>' + worker.position + '</position>' : '')
      + ((worker.status) ? '<status>' + worker.status + '</status>' : '')
      + ((worker.organizationType)
        ? '<organization>'
        + '<annualTurnover>' + worker.annualTurnover + '</annualTurnover>'
        + '<employeesCount>' + worker.employeesCount + '</employeesCount>'
        + '<type>' + worker.organizationType + '</type>'
        + '</organization>'
        : '')
      + '</worker>');
  }
}
