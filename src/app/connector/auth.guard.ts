import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private status: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (sessionStorage.getItem('accessToken') !== null) {
      return true;
    }

    let url: string = state.url;
    sessionStorage.setItem('redirectUrl', url);
    this.router.navigate(['login']);
    return false;
  }
}
