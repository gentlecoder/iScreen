import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { ToastrService } from 'ngx-toastr';
import ConstantsList from '../app.constants';

import { Chart } from './chart';
import { Res } from './res';

@Injectable()
export class ChartService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private chartUrl = `${ConstantsList.devUrl}chart`;  // URL to web api

  constructor(
    private http: Http,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.options.headers.set('X-Access-Token', sessionStorage.getItem('accessToken'));
  }

  getAllItems(): Promise<Chart[]>{
    return this.http.get(this.chartUrl + '/all', this.options)
               .toPromise()
               .then(response => {
                  if(response.json().returnCode == ConstantsList.codeSessionOutdate) {
                    this.router.navigate(['login']);
                  }
                  return response.json().data as Chart[];
                })
               .catch(this.handleError);
  }

  getChart(id: string): Promise<Chart> {
    const url = `${this.chartUrl}/${id}`;
    return this.http.get(url, this.options)
      .toPromise()
      .then(response => {
        if(response.json().returnCode == ConstantsList.codeSessionOutdate) {
          this.router.navigate(['login']);
        }
        return response.json().data as Chart;
      })
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.chartUrl}/${id}`;
    return this.http.delete(url, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(chart: any): Promise<Res> {
    let headers = new Headers();
    let options = new RequestOptions({headers: headers});
    options.headers.set('X-Access-Token', sessionStorage.getItem('accessToken'));
    return this.http
      .post(this.chartUrl, chart, options)
      .toPromise()
      .then(response => {
        if(response.json().returnCode == ConstantsList.codeSessionOutdate) {
          this.router.navigate(['login']);
        }
        return response.json() as Res;
      })
      .catch(this.handleError);
  }

  update(chart: any): Promise<Res> {
    let headers = new Headers();
    let options = new RequestOptions({headers: headers});
    options.headers.set('X-Access-Token', sessionStorage.getItem('accessToken'));
    const url = `${this.chartUrl}/update`;
    return this.http
      .post(url, chart, options)
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
