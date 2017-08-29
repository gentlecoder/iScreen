import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import ConstantsList from '../app.constants';

import { Theme } from './theme';
import { Res } from './res';

@Injectable()
export class ThemeService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private themeUrl = `${ConstantsList.devUrl}theme`;  // URL to web api

  constructor(
    private http: Http,
    private router: Router
  ) {
    this.options.headers.set('X-Access-Token', sessionStorage.getItem('accessToken'));
  }

  getAllItems(): Promise<Theme[]>{
    return this.http.get(this.themeUrl, this.options)
               .toPromise()
               .then(response => {
                  if(response.json().returnCode == ConstantsList.codeSessionOutdate) {
                    this.router.navigate(['login']);
                  }
                  return response.json().data as Theme[]
                })
               .catch(this.handleError);
  }

  getTheme(id: number): Promise<Theme> {
    const url = `${this.themeUrl}/${id}`;
    return this.http.get(url, this.options)
      .toPromise()
      .then(response => {
        if(response.json().returnCode == ConstantsList.codeSessionOutdate) {
          this.router.navigate(['login']);
        }
        return response.json().data as Theme;
      })
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.themeUrl}/${id}`;
    return this.http.delete(url, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(theme: any): Promise<Res> {
    let headers = new Headers();
    let options = new RequestOptions({headers: headers});
    options.headers.set('X-Access-Token', sessionStorage.getItem('accessToken'));
    return this.http
      .post(this.themeUrl, theme, options)
      .toPromise()
      .then(response => {
        if(response.json().returnCode == ConstantsList.codeSessionOutdate) {
          this.router.navigate(['login']);
        }
        return response.json() as Res;
      })
      .catch(this.handleError);
  }

  update(theme: Theme): Promise<Res> {
    let headers = new Headers();
    let options = new RequestOptions({headers: headers});
    options.headers.set('X-Access-Token', sessionStorage.getItem('accessToken'));
    const url = `${this.themeUrl}/${theme.id}`;
    return this.http
      .put(url, theme, options)
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
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
