import {Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ChartService} from '../../../connector/chart.service';
import {Chart} from '../../../connector/chart';

import ConstantsList from '../../../app.constants';

import * as _ from 'lodash';

declare let $: any;

@Component({
  selector: 'app-dashboard-settings-modal',
  templateUrl: './dashboard-settings-modal.component.html',
  styleUrls: ['./dashboard-settings-modal.component.less']
})
export class DashboardSettingsModalComponent implements OnInit {
  @Input() widget;

  types: any = ConstantsList.chartType;
  categories: any = ConstantsList.chartCategory;
  devUrl: string = ConstantsList.devUrl;
  charts: Chart[] = [];
  chartInstance: any;
  chosenTypes = [];

  constructor(public activeModal: NgbActiveModal,
              public chartService: ChartService) {
  }

  ngOnInit() {
    $(function () {
      $('#echarts-setting').on('focus', 'input[id$=color]', function () {
        $('input[id$=color]').colorpicker();
      });
      // $('#echarts-setting').on('change', 'input[id$=color]', function () {
      //   debugger
      // });
    });

    if (_.isUndefined(this.widget.chart)) {
      this.widget.chart = new Object();
    }

    this.getAllCharts();
  }

  getAllCharts(): void {
    this.chartService.getAllItems()
      .then(res => this.charts = res);
  }

  onChartInit(ec) {
    this.chartInstance = ec;
  }

  onSubmit(formValue: any): void {

    console.info(this.widget.content);
    // let tmp = [];
    // for (let i = 0; i < this.widget.content.series.length; i++) {
    //   tmp.push(this.widget.content.series[i].name);
    // }
    // if (this.widget.content.legend) {
    //   this.widget.content.legend.data = tmp;
    // }
    this.widget.content = Object.assign({}, this.widget.content);
  }

  chartChoose(chart: Chart) {
    this.widget.chart.id = chart.id;

    if (_.isUndefined(this.chartInstance)) {
      // TODO
    } else {
      this.chartInstance.clear();
    }
    // echarts一些默认值初始化
    let tmpOption: any = JSON.parse(chart.content);
    if (chart.type === 'echarts') {
      if (tmpOption.title == null) {
        tmpOption.title = {};
        tmpOption.title.show = true;
      }
      if (tmpOption.title.textStyle == null) {
        tmpOption.title.textStyle = {};
        tmpOption.title.textStyle.color = '#333';
        tmpOption.title.textStyle.fontWeight = 'bolder';
        tmpOption.title.textStyle.fontSize = 18;
      }
      if (tmpOption.title.subtextStyle == null) {
        tmpOption.title.subtextStyle = {};
        tmpOption.title.subtextStyle.color = '#333';
        tmpOption.title.subtextStyle.fontWeight = 'bolder';
        tmpOption.title.subtextStyle.fontSize = 18;
      }
      if (tmpOption.title != null && tmpOption.title.show === undefined) {
        tmpOption.title.show = true;
      }
      if (tmpOption.legend != null && tmpOption.legend.show === undefined) {
        tmpOption.legend.show = true;
      }
      if (tmpOption.grid != null && tmpOption.grid.show === undefined) {
        tmpOption.grid.show = false;
      }
      if (tmpOption.xAxis != null && tmpOption.xAxis.show === undefined) {
        tmpOption.xAxis.show = true;
      }
      if (tmpOption.yAxis != null && tmpOption.yAxis.show === undefined) {
        tmpOption.yAxis.show = true;
      }
      if (tmpOption.tooltip != null && tmpOption.tooltip.show === undefined) {
        tmpOption.tooltip.show = true;
      }
      if (tmpOption.toolbox != null && tmpOption.toolbox.show === undefined) {
        tmpOption.toolbox.show = true;
      }
    }
    this.widget.content = Object.assign({}, tmpOption);
  }

  chooseColor(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    console.log(target);

  }

  rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? '#' + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }

  // 解决angular中使用jQuery操作dom元素视图不更新的问题
  changeColor(v1, v2) {
    let tmp = v1.split('.');
    switch (tmp.length) {
      case 2:
        this.widget.content[tmp[0]][tmp[1]] = $('#' + v2)[0].value;
        break;
      case 3:
        this.widget.content[tmp[0]][tmp[1]][tmp[2]] = $('#' + v2)[0].value;
        break;
      case 4:
        this.widget.content[tmp[0]][tmp[1]][tmp[2]][tmp[3]] = $('#' + v2)[0].value;
        break;
      case 5:
        this.widget.content[tmp[0]][tmp[1]][tmp[2]][tmp[3]][tmp[4]] = $('#' + v2)[0].value;
        break;
      case 6:
        this.widget.content[tmp[0]][tmp[1]][tmp[2]][tmp[3]][tmp[4]][tmp[5]] = $('#' + v2)[0].value;
        break;
    }
  }

  get diagnostic() {
    return JSON.stringify(this.widget.content);
  }


  // 实时有问题
  // ngDoCheck() {
  //   this.widget.content = Object.assign({}, this.widget.content);
  // }
}
