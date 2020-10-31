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
            console.log(parsed);
            parsed.response.worker.forEach(worker => {
              worker.creationDate = worker.creationDate.slice(0, worker.creationDate.indexOf('['));
            });
            subscriber.next(parsed.response.worker);
            subscriber.complete();
          });
        });
      })
    );
  }

  getWorker(id: number): Observable<AppWorker> {
    return this.http.get(
      `${this.url}?id=${id}`, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log(res);
        return new Observable<AppWorker>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            console.log(parsed);
            parsed.response.worker.creationDate =
              parsed.response.worker.creationDate.slice(0, parsed.response.worker.creationDate.indexOf('['));
            subscriber.next(parsed.response.worker);
            subscriber.complete();
          });
        });
      })
    );
  }

  save(worker: AppWorker) {
    if (worker.id) {
      return this.put(worker);
    }
    return this.post(worker);
  }

  delete(id: number): Observable<AppWorker> {
    const url = `${this.url}?id=${id}`;
    return this.http.delete(
      url, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log('res');
        console.log(res);
        return new Observable<AppWorker>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            console.log('parsed');
            console.log(parsed);
            parsed.response.worker.creationDate = parsed.response.worker.creationDate
              .slice(0, parsed.response.worker.creationDate.indexOf('['));
            subscriber.next(parsed.response.worker);
            subscriber.complete();
          });
        });
      })
    );

    // return this.http.delete(
    //   url, {responseType: 'text'}
    // ).subscribe(res => {
    //   console.log('res');
    //   console.log(res);
    //   return new Observable<AppWorker>(subscriber => {
    //     xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
    //       console.log('parsed');
    //       console.log(parsed);
    //       parsed.response.worker.creationDate = parsed.response.worker.creationDate
    //       .slice(0, parsed.response.worker.creationDate.indexOf('['));
    //       subscriber.next(parsed.response.worker);
    //       subscriber.complete();
    //     });
    //   });
    // });
  }

  public getWorkerWithMaxSalary(): Observable<AppWorker> {
    const url = `${this.url}/max-salary`;
    return this.http.get(
      url, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log('res');
        console.log(res);
        return new Observable<AppWorker>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            console.log('parsed');
            console.log(parsed);
            parsed.response.worker.creationDate = parsed.response.worker.creationDate
              .slice(0, parsed.response.worker.creationDate.indexOf('['));
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
        console.log('res');
        console.log(res);
        return new Observable<number>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            console.log('parsed');
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
        console.log('res');
        console.log(res);
        return new Observable<AppWorker[]>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            console.log('parsed');
            console.log(parsed);
            parsed.response.worker.forEach(worker => {
              worker.creationDate = worker.creationDate.slice(0, worker.creationDate.indexOf('['));
            });
            subscriber.next(parsed.response.worker);
            subscriber.complete();
          });
        });
      }));
  }

  // Add new worker
  private post(worker: AppWorker) {
    console.log('posting');
    return this.http.post(
      this.makeUrlWithArgs(worker), null, {responseType: 'text'}
    ).subscribe(res => {
      console.log('res');
      console.log(res);
      window.location.reload();
      return new Observable<AppWorker>(subscriber => {
        xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
          console.log('parsed');
          console.log(parsed);
          parsed.response.worker.creationDate = parsed.response.worker.creationDate
            .slice(0, parsed.response.worker.creationDate.indexOf('['));
          subscriber.next(parsed.response.worker);
          subscriber.complete();
        });
      });
    });
  }

  // Update existing worker
  private put(worker: AppWorker) {
    console.log('putting');
    return this.http.put(
      this.makeUrlWithArgs(worker), null, {responseType: 'text'}
    ).subscribe(res => {
      console.log('res');
      console.log(res);
      window.location.reload();
      return new Observable<AppWorker>(subscriber => {
        xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
          console.log('parsed');
          console.log(parsed);
          parsed.response.worker.creationDate = parsed.response.worker.creationDate
            .slice(0, parsed.response.worker.creationDate.indexOf('['));
          subscriber.next(parsed.response.worker);
          subscriber.complete();
        });
      });
    });
  }

  private makeUrlWithArgs(worker: AppWorker): string {
    console.log('making url');
    return (this.url + '?'
      + ((worker.id) ? 'id=' + worker.id + '&' : '')
      + ((worker.coordinateX) ? 'coordinateX=' + worker.coordinateX + '&' : '')
      + ((worker.coordinateY) ? 'coordinateY=' + worker.coordinateY + '&' : '')
      + ((worker.employeesCount) ? 'employeesCount=' + worker.employeesCount + '&' : '')
      + ((worker.organizationType) ? 'organizationType=' + worker.organizationType + '&' : '')
      + ((worker.annualTurnover) ? 'annualTurnover=' + worker.annualTurnover + '&' : '')
      + ((worker.endDate) ? 'endDate=' + worker.endDate + '&' : '')
      + ((worker.name) ? 'name=' + worker.name + '&' : '')
      + ((worker.position) ? 'position=' + worker.position + '&' : '')
      + ((worker.status) ? 'status=' + worker.status + '&' : '')
      + ((worker.salary) ? 'salary=' + worker.salary + '&' : '')).slice(0, -1);
  }
}
