import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import * as _ from 'lodash';

import { DashboardService } from '../../../connector/dashboard.service';
import { Dashboard } from '../../../connector/dashboard';
import { ThemeService } from '../../../connector/theme.service';
import { Theme } from '../../../connector/theme';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.less']
})
export class DashboardDetailComponent implements OnInit {
  closeResult: string;
  dashboard: Dashboard;
  themes: Theme[];

  constructor(
    private dashboardService: DashboardService,
    private themeService: ThemeService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getAllThemes();

    this.activatedRoute.params
      .switchMap((params: Params) => this.dashboardService.getDashboard(params['id']))
      .subscribe(res => {
        this.dashboard = {
          name: res.name,
          desc: res.desc,
          content: !_.isEmpty(res.content) ? JSON.parse(res.content) : res.content,
          option: !_.isEmpty(res.option) ? JSON.parse(res.option): res.option,
          id: res.id
        }
      });
  }

  getAllThemes(): void {
    this.themeService
        .getAllItems()
        .then(themes => this.themes = themes);
  }

  gotoSettings(dashboard: Dashboard): void {
    this.router.navigate(['/dashboard', dashboard.id, 'settings'])
  }

  onSubmit(formValue:any):void {
    let formData = {
      id: this.dashboard.id,
      name: formValue.name,
      desc: formValue.description ? formValue.description : '',
      option: JSON.stringify({
        theme: formValue.theme,
        resolutionWidth: formValue.resolutionWidth,
        resolutionHeight: formValue.resolutionHeight,
        landscapeNum: formValue.landscapeNum,
        portraitNum: formValue.portraitNum,
        horizontalDivision: formValue.horizontalDivision,
        verticalDivision: formValue.verticalDivision,
        blockGap: formValue.blockGap
      }),
      content: !_.isEmpty(this.dashboard.content) ? JSON.stringify(this.dashboard.content) : this.dashboard.content
    }
    this.dashboardService.update(formData)
      .then(res => {
        if (res.success){
          this.toastrService.success('更新成功!', 'Success!');
        } else {
          this.toastrService.error(res.message, 'Error!');
        }
      });
  }
}
