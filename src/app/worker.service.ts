import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {from, Observable, of, throwError as observableThrowError} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AppWorker} from './worker';
import {environment} from '../environments/environment';
import * as xml2js from 'xml2js';


const WORKER_DATA: any[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
];


@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) {
  }
  private url = environment.url;

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
              if (worker.endDate.charAt(0) === '0') {
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
              if (worker.endDate.charAt(0) === '0') {
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
            if (parsed.response.worker.endDate.charAt(0) === '0') {
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
            if (parsed.response.worker.endDate.charAt(0) === '0') {
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
              if (worker.endDate.charAt(0) === '0') {
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
    console.log('posting');
    let url = this.url + '?' + this.makeArgsForUrl(worker);
    url = (url[-1] === '?') ? url.slice(0, -1) : url;
    return this.http.post(
      url, null, {responseType: 'text'}
    ).subscribe(res => {
      console.log(res);
      window.location.reload();
      return new Observable<AppWorker>(subscriber => {
        xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
          console.log(parsed);
          parsed.response.worker.creationDate = parsed.response.worker.creationDate
            .slice(0, parsed.response.worker.creationDate.indexOf('['));
          if (worker.endDate.charAt(0) === '0') {
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
    console.log('putting');
    let url = `${this.url}/${worker.id}?` + this.makeArgsForUrl(worker);
    url = (url[-1] === '?') ? url.slice(0, -1) : url;
    return this.http.put(
      url, null, {responseType: 'text'}
    ).subscribe(res => {
      console.log(res);
      window.location.reload();
      return new Observable<AppWorker>(subscriber => {
        xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
          console.log(parsed);
          parsed.response.worker.creationDate = parsed.response.worker.creationDate
            .slice(0, parsed.response.worker.creationDate.indexOf('['));
          if (parsed.response.worker.endDate.charAt(0) === '0') {
            parsed.response.worker.endDate = parsed.response.worker.endDate.replace('0', '2');
          }
          subscriber.next(parsed.response.worker);
          subscriber.complete();
        });
      });
    });
  }

  private makeArgsForUrl(worker: AppWorker): string {
    let args = (((worker.salary) ? 'salary=' + worker.salary + '&' : '')
      + ((worker.coordinateX) ? 'coordinateX=' + worker.coordinateX + '&' : '')
      + ((worker.coordinateY) ? 'coordinateY=' + worker.coordinateY + '&' : '')
      + ((worker.organizationType) ? 'organizationType=' + worker.organizationType + '&' : '')
      + ((worker.annualTurnover) ? 'annualTurnover=' + worker.annualTurnover + '&' : '')
      + ((worker.endDate) ? 'endDate=' + worker.endDate + '&' : '')
      + ((worker.name) ? 'name=' + worker.name + '&' : '')
      + ((worker.position) ? 'position=' + worker.position + '&' : '')
      + ((worker.status) ? 'status=' + worker.status + '&' : '')
      + ((worker.employeesCount) ? 'employeesCount=' + worker.employeesCount + '&' : '')).trim();
    args = (args[-1] === '&') ? args.slice(0, -1) : args;
    return args;
  }
}
