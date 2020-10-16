import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {from, Observable, of, throwError as observableThrowError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppWorker } from "./worker";

const WORKER_DATA: AppWorker[] = [
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

  constructor(private http: HttpClient) { }

  getWorkers() {
    return of(WORKER_DATA);
    // this.http
    //   .get<AppWorker[]>(this.workersUrl)
    //   .pipe(map(data => data), catchError(this.handleError));
  }

  getWorker(id: number): Observable<AppWorker> {
    return from(this.getWorkers()).pipe(
      map(
        workers => workers[0]
          //.find(worker => worker.id === id)
      )
    );
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
