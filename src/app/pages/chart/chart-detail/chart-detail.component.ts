import 'rxjs/add/operator/switchMap';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import ConstantsList from '../../../app.constants';

import * as ace from 'brace';
import * as _ from 'lodash';

import 'brace/mode/javascript';
import 'brace/theme/chrome';

import { ChartService } from '../../../connector/chart.service';
import { Chart } from '../../../connector/chart';

declare let $: any;

@Component({
  selector: 'app-chart-detail',
  templateUrl: './chart-detail.component.html',
  styleUrls: ['./chart-detail.component.less']
})
export class ChartDetailComponent {
  types: any = ConstantsList.chartType;
  categories: any = ConstantsList.chartCategory;
  chartInstance: any;
  content: any;
  file: any;
  editor: any;
  chart: Chart;
  devUrl: string = ConstantsList.devUrl;

  constructor(
    private chartService: ChartService,
    private router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {    
    this.activatedRoute.params
      .switchMap((params: Params) => this.chartService.getChart(params['id']))
      .subscribe(res => {
        this.chart = {
          name: res.name,
          description: res.description,
          content: !_.isEmpty(res.content) ? JSON.parse(res.content) : res.content,
          type: res.type,
          category: res.category,
          thumb: res.thumb,
          id: res.id
        },

        this.editor = ace.edit('ace-editor'),
        this.editor.$blockScrolling = Infinity,
        this.editor.getSession().setMode('ace/mode/javascript'),
        this.editor.getSession().setUseWrapMode(true),
        this.editor.getSession().setUseSoftTabs(true),
        this.editor.setTheme('ace/theme/chrome'),
        
        this.editor.setValue('option = ' + res.content)
      });
  }

  ngAfterViewInit() {
    // 使用ace的file input控件，美化作用
    $(function(){
      $('#form-thumb').ace_file_input({
        no_file:'No File ...',
        btn_choose:'Choose',
        btn_change:'Change',
        droppable:false,
        onchange:null,
        thumbnail:false
      });
    });
  }

  fileChanged(e: Event) {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    for (var i = 0; i < target.files.length; i++) {
      this.file = target.files[i];
    }
  }

  onChartInit(ec) {
    this.chartInstance = ec;
  }

  onPreview() {
    this.chartInstance.clear();
    var editorVal = 'var option;' + this.editor.getValue() + '; this.chart.content = option';
    
    // 执行获取的javascript
    eval(editorVal);
  }

  onSubmit(formValue: any): void {
    var formData: FormData = new FormData();

    if (_.isUndefined(this.file)){
      // Nothing need do here. hahahahahahaha
    } else {
      formData.append("file", this.file, this.file.name);
    }

    formData.append("id", this.chart.id);
    formData.append("name", formValue.name);
    formData.append("description", formValue.description);
    formData.append("type", formValue.type);
    formData.append("category", formValue.category);
    formData.append("content", JSON.stringify(this.chart.content));    

    this.chartService.update(formData)
      .then(res => {
        if (res.success){
          this.toastrService.success('更新成功!', 'Success!');
        } else {
          this.toastrService.error(res.message, 'Error!');
        }
      });
  }

}
