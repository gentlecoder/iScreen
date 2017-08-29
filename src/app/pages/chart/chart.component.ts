import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ChartService } from '../../connector/chart.service';
import { Chart } from '../../connector/chart';

import ConstantsList from '../../app.constants';

import * as _ from 'lodash';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent {
  charts: Chart[] = [];
  devUrl: string = ConstantsList.devUrl;

  constructor(
    private router: Router,
    private chartService: ChartService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllCharts();
  }

  getAllCharts(): void {
    this.chartService.getAllItems()
      .then(res => this.charts = res);
  }

  delete(chart: Chart): void {
    this.chartService
        .delete(chart.id)
        .then(() => {
          this.charts = this.charts.filter(h => h !== chart);

          this.toastrService.success(chart.name + '已删除！', 'Success!');
        });
  }

  gotoDetail(chart: Chart): void {
    this.router.navigate(['/chart', chart.id, 'edit']);
  }

}
