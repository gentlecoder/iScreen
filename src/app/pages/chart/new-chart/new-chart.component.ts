import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-new-chart',
  templateUrl: './new-chart.component.html',
  styleUrls: ['./new-chart.component.less']
})
export class NewChartComponent implements OnInit {
  name: string;
  description: any;
  thumb: any;
  
  types: any = ConstantsList.chartType;
  categories: any = ConstantsList.chartCategory;
  chartInstance: any;
  content: any;
  file: any;
  editor: any;

  constructor(
    private chartService: ChartService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
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
    
    this.editor = ace.edit('ace-editor');
    this.editor.$blockScrolling = Infinity;
    this.editor.getSession().setMode('ace/mode/javascript');
    this.editor.setTheme('ace/theme/chrome');
    this.editor.setValue('option = {\n    \n};\n');

    this.content = this.editor.getValue();
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
    var editorVal = 'var option;' + this.editor.getValue() + 'this.content = option';
    
    // 执行获取的javascript
    eval(editorVal);
  }

  onSubmit(formValue: any): void {
    var formData: FormData = new FormData();

    if (_.isUndefined(this.file)){
      this.toastrService.error('请上传图表预览图！', 'Error!');
      return;
    }
    formData.append("file", this.file, this.file.name);
    formData.append("name", formValue.name);
    formData.append("description", formValue.description);
    formData.append("type", formValue.type);
    formData.append("category", formValue.category);
    formData.append("content", JSON.stringify(this.content));    

    this.chartService.create(formData)
      .then(res => {
        if (res.success) {
          this.router.navigate(['/charts']);
        } else {
          this.toastrService.error(res.message, 'Error!');
        }
      })
  }

}
