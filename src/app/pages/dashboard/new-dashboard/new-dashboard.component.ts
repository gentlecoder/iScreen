import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DashboardService } from '../../../connector/dashboard.service';
import { Dashboard } from '../../../connector/dashboard';
import { ThemeService } from '../../../connector/theme.service';
import { Theme } from '../../../connector/theme';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.less']
})
export class NewDashboardComponent implements OnInit {
  themes: Theme[];
  name: string;
  description: any;
  theme: string;
  resolutionWidth: number;
  resolutionHeight: number;
  landscapeNum: number;
  portraitNum: number;
  horizontalDivision: number;
  verticalDivision: number;
  blockGap: number;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private toastrService: ToastrService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.getAllThemes();
  }

  getAllThemes(): void {
    this.themeService
        .getAllItems()
        .then(themes => this.themes = themes);
  }

  onSubmit(formValue:any):void {
    let formData = {
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
      content: ''
    }
    this.dashboardService.create(formData)
      .then(res => {
        if (res.success){
          this.router.navigate(['/dashboard']);
        } else {
          this.toastrService.error(res.message, 'Error!');
        }
      })
  }

}
