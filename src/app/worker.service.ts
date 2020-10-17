import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {from, Observable, of, throwError as observableThrowError} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AppWorker} from "./worker";
import {environment} from "../environments/environment";
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
  private workersUrl = 'app/workers';
  private url = environment.url;

  constructor(private http: HttpClient) {
  }

  getWorkers(): Observable<AppWorker[]> {
    // return of(WORKER_DATA);
    return this.http.get(
      `${this.url}/Main?function=getAllWorkers`, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log(res);
        return new Observable<AppWorker[]>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, res) => {
            console.log(res);
            res.response.worker.forEach(worker => {
              worker.creationDate = worker.creationDate.slice(0, 32);
            })
            subscriber.next(res.response.worker);
            subscriber.complete();
          })
        });
      })
    )
  }

  ß

  getWorker(id: number): Observable<AppWorker> {
    return of(WORKER_DATA[0])
  }

  save(worker: AppWorker) {
    if (worker.id) {
      return this.put(worker);
    }
    return this.post(worker);
  }

  delete(worker: AppWorker) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.workersUrl}/${worker.id}`;

    return this.http.delete<AppWorker>(url).pipe(catchError(this.handleError));
  }

  public getWorkerWithMaxSalary(): Observable<AppWorker> {
    return of(WORKER_DATA[0]);
  }

  public getWorkersCountWithSalary(salary: number): Observable<number> {
    return of(12);
  }

  public getWorkersWithPrefix(prefix: string): Observable<AppWorker[]> {
    return of(WORKER_DATA);
  }

  // Add new worker
  private post(worker: AppWorker) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<AppWorker>(this.workersUrl, worker)
      .pipe(catchError(this.handleError));
  }

  // Update existing worker
  private put(worker: AppWorker) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.workersUrl}/${worker.id}`;

    return this.http.put<AppWorker>(url, worker).pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
