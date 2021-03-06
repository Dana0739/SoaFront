import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {AppOrganization} from './AppOrganization';
import * as xml2js from 'xml2js';
import {HireFormData} from './hr-rpc/hr-rpc.component';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  constructor(private http: HttpClient) {
  }
  private urlCRUD = environment.urlCRUD + 'organizations';
  private urlHR = environment.urlHR;

  getOrganizations(): Observable<AppOrganization[]> {
    return this.http.get(
      `${this.urlCRUD}`, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log(res);
        return new Observable<AppOrganization[]>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            let organizations = parsed.response.organization;
            if (!Array.isArray(parsed.response.organization)) {
              organizations = [];
              organizations.push(parsed.response.organization);
            }
            console.log(organizations);
            subscriber.next(organizations);
            subscriber.complete();
          });
        });
      })
    );
  }

  getOrganization(id: number): Observable<AppOrganization> {
    return this.http.get(
      `${this.urlCRUD}/${id}`, {responseType: 'text'}
    ).pipe(
      mergeMap(res => {
        console.log(res);
        return new Observable<AppOrganization>(subscriber => {
          xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
            console.log(parsed);
            subscriber.next(parsed.response.organization);
            subscriber.complete();
          });
        });
      }));
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.urlCRUD}/${id}`;
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

  save(organization: AppOrganization) {
    console.log(organization);
    if (organization.id) {
      return this.put(organization);
    }
    return this.post(organization);
  }

  // Add new organization
  private post(organization: AppOrganization) {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/xml');
    return this.http.post(
      this.urlCRUD, this.makeArgsForBody(organization), {responseType: 'text', headers}
    ).subscribe(res => {
      console.log(res);
      window.location.reload();
      return new Observable<AppOrganization>(subscriber => {
        xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
          console.log(parsed);
          subscriber.next(parsed.response.organization);
          subscriber.complete();
        });
      });
    });
  }

  // Update existing organization
  private put(organization: AppOrganization) {
    const url = `${this.urlCRUD}/${organization.id}`;
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/xml');
    return this.http.put(
      url, this.makeArgsForBody(organization), {responseType: 'text', headers}
    ).subscribe(res => {
      console.log(res);
      window.location.reload();
      return new Observable<AppOrganization>(subscriber => {
        xml2js.parseString(res, {explicitArray: false}, (err, parsed) => {
          console.log(parsed);
          subscriber.next(parsed.response.organization);
          subscriber.complete();
        });
      });
    });
  }

  private makeArgsForBody(organization: AppOrganization): string {
    return ('<organization>'
        + '<annualTurnover>' + organization.annualTurnover + '</annualTurnover>'
        + '<employeesCount>' + organization.employeesCount + '</employeesCount>'
        + '<type>' + organization.organizationType + '</type>'
      + '</organization>');
  }

  hire(data: HireFormData): void {
    const url = `${this.urlHR}hire/${data.personId}/${data.orgId}/${data.position}/${data.status}/${data.startDate}`;
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/xml');
    this.http.post(
      url, null, {responseType: 'text', headers}
    ).subscribe(res => {
      console.log(res);
      window.location.reload();
    });
  }

  fire(id: number): void {
    const url = `${this.urlHR}fire/${id}`;
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/xml');
    this.http.post(
      url, null, {responseType: 'text', headers}
    ).subscribe(res => {
      console.log(res);
      window.location.reload();
    });
  }
}
