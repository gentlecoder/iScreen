import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../connector/auth.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit() {
    $(function () {
      $('.login').height($(window).height());
    });
  }

  onSubmit(formValue: any):void {
    this.authService
      .loginWithCredentials(formValue.username, formValue.password)
      .then(res => {
        if (res.success) {
          // let redirectUrl = (sessionStorage.getItem('redirectUrl') === null) ? '/': sessionStorage.getItem('redirectUrl');
          this.router.navigate(['dashboard']);
        } else {
          this.toastrService.error(res.message, 'Error!');
        }
      });
  }
}
