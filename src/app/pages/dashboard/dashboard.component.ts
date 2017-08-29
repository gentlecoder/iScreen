import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DashboardService } from '../../connector/dashboard.service';
import { Dashboard } from '../../connector/dashboard';

import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})

export class DashboardComponent implements OnInit {
  dashboards: Dashboard[] = [];
  
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getAllDashboards();
  }

  getAllDashboards(): void {
    this.dashboardService.getAllItems()
      .then(res => {
        let formatDashboards = [];
        for (var i = 0; i < res.length; i++) {
          formatDashboards.push({
            name: res[i].name,
            desc: res[i].desc,
            content: !_.isEmpty(res[i].content) ? JSON.parse(res[i].content) : res[i].content,
            option: !_.isEmpty(res[i].option) ? JSON.parse(res[i].option): res[i].option,
            id: res[i].id
          })
        }

        this.dashboards = formatDashboards;
      });
  }

  delete(dashboard: Dashboard): void {
    this.dashboardService
        .delete(dashboard.id)
        .then(() => {
          this.dashboards = this.dashboards.filter(h => h !== dashboard);

          this.toastrService.success(dashboard.name + '已删除！', 'Success!');
        });
  }

  gotoDetail(dashboard: Dashboard): void {
    this.router.navigate(['/dashboard', dashboard.id, 'edit']);
  }

  gotoSettings(dashboard: Dashboard): void {
    this.router.navigate(['/dashboard', dashboard.id, 'settings'])
  }

  gotoView(dashboard: Dashboard): void {
    this.router.navigate(['/v', dashboard.id])
  }
}
