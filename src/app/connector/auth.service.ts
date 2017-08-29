import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import ConstantsList from '../app.constants';

import { Auth, User, Xxtea } from './auth';
import { Res } from './res';

@Injectable()
export class AuthService {
  private xxtea = new Xxtea('uniportal');
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private authUrl = `${ConstantsList.devUrl}unify-auth`;  // URL to web api

  constructor(
    private http: Http
  ) { }

  loginWithCredentials(username: string, password: string): Promise<Res> {
    return this.http
      .post(this.authUrl, JSON.stringify({ username: username, password: this.xxtea.xxtea_encrypt(password) }), { headers: this.headers })
      .toPromise()
      .then(response => {
        let res: Res = response.json();
        if (res.success) {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('accessToken', res.data.accessToken);
        }

        return response.json() as Res;
      })
      .catch(this.handleError);
  }

  logout(): Promise<Res> {
    return this.http
      .get(`${this.authUrl}/logout`)
      .toPromise()
      .then(response => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('accessToken');
        
        return response.json().data as Res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
