import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { DashboardService } from '../../../connector/dashboard.service';
import { Dashboard, Block } from '../../../connector/dashboard';

import ConstantsList from '../../../app.constants';

import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.less']
})
export class DashboardViewComponent implements OnInit {
  dashboard: Dashboard;
  blocks: Block[];
  width: number;
  height: number;
  url: string = ConstantsList.devUrl;
  chartInstance;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document,
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.dashboardService.getDashboard(params['id']))
      .subscribe(res => {
        this.dashboard = {
          name: res.name,
          desc: res.desc,
          content: !_.isEmpty(res.content) ? JSON.parse(res.content) : JSON.parse('[]'),
          option: !_.isEmpty(res.option) ? JSON.parse(res.option): JSON.parse('[]'),
          id: res.id
        }

        let option: Object = JSON.parse(res.option);
        let gap: number = +option['blockGap'];
        this.width = +option['landscapeNum'] * +option['resolutionWidth'];
        this.height = +option['portraitNum'] * +option['resolutionHeight'];        
        let theme = option['theme'];

        // 读取主题css
        var themeLink = this.document.createElement("link");
        themeLink.href = `${this.url}resource/theme/${theme}/main.css`;
        themeLink.rel = "stylesheet";
        themeLink.type = "text/css";
        this.document.getElementsByTagName('head')[0].append(themeLink);

        let content: any = JSON.parse(res.content);

        let allBlocks = [];
        for (var c of content) {
          let block: Block = {
            left: gap + c['x'] * (this.width - gap) / +option['horizontalDivision'] / +option['landscapeNum'],
            top: gap + c['y'] * (this.height - gap) / +option['verticalDivision'] / +option['portraitNum'],
            width: ((this.width - gap) / +option['horizontalDivision'] / +option['landscapeNum'] - gap) * c['w'] + (c['w'] - 1) * gap,
            height: ((this.height - gap) / +option['verticalDivision'] / +option['portraitNum'] - gap) * c['h'] + (c['h'] - 1) * gap,
            content: c['content']
          }

          allBlocks.push(block);
        }

        this.blocks = allBlocks;
      });
  }

  onChartInit(ec) {
    this.chartInstance = ec;
  }

}
