import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { ToastrService } from 'ngx-toastr';
import ConstantsList from '../app.constants';

import { Dashboard } from './dashboard';
import { Res } from './res';

@Injectable()
export class DashboardService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private dashboardUrl = `${ConstantsList.devUrl}screen`;  // URL to web api

  constructor(
    private http: Http,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.options.headers.set('X-Access-Token', sessionStorage.getItem('accessToken'));
  }

  getAllItems(): Promise<Dashboard[]>{
    return this.http.get(this.dashboardUrl + '/all', this.options)
               .toPromise()
               .then(response => {
                  if(response.json().returnCode == ConstantsList.codeSessionOutdate) {
                    this.router.navigate(['login']);
                  }
                  return response.json().data as Dashboard[];
               })
               .catch(this.handleError);
  }

  getDashboard(id: string): Promise<Dashboard> {
    const url = `${this.dashboardUrl}/${id}`;
    return this.http.get(url, this.options)
      .toPromise()
      .then(response => {
        if(response.json().returnCode == ConstantsList.codeSessionOutdate) {
          this.router.navigate(['login']);
        }
        return response.json().data as Dashboard;
      })
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.dashboardUrl}/${id}`;
    return this.http.delete(url, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(dashboard: any): Promise<Res> {
    return this.http
      .post(this.dashboardUrl, JSON.stringify(dashboard), this.options)
      .toPromise()
      .then(response => {
        if(response.json().returnCode == ConstantsList.codeSessionOutdate) {
          this.router.navigate(['login']);
        }
        return response.json() as Res;
      })
      .catch(this.handleError);
  }

  update(dashboard: Dashboard): Promise<Res> {
    const url = `${this.dashboardUrl}`;
    return this.http
      .put(url, JSON.stringify(dashboard), this.options)
      .toPromise()
      .then(response => {
        if(response.json().returnCode == ConstantsList.codeSessionOutdate) {
          this.router.navigate(['login']);
        }
        return response.json() as Res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    this.toastrService.error('服务器出错！', 'Error!');
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
