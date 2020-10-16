import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppWorker } from "./worker";

@Injectable({
  providedIn: 'root'
})
export class WorkerServiceService {
  private workersUrl = 'app/workers';

  constructor(private http: HttpClient) { }

  getWorkers() {
    return this.http
      .get<AppWorker[]>(this.workersUrl)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getworker(id: number): Observable<AppWorker> {
    return this.getWorkers().pipe(
      map(workers => workers.find(worker => worker.id === id))
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
