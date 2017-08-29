import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../connector/auth.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.less']
})
export class TopComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
  }

  onClickLogout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessToken');

    this.router.navigate(['login']);
  }

}
