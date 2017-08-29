import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ThemeService } from '../../../connector/theme.service';
import { Theme } from '../../../connector/theme';

import * as _ from 'lodash';
declare let $: any;

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.less']
})
export class NewThemeComponent implements OnInit {
  name: string;
  path: string;
  file: any;

  constructor(private themeService: ThemeService, private router: Router, private toastrService: ToastrService) { }

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
  }

  fileChanged(e: Event) {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    for (var i = 0; i < target.files.length; i++) {
      this.file = target.files[i];
    }
  }

  onSubmit(formValue:any):void {
    var formData: FormData = new FormData();

    if (_.isUndefined(this.file)){
      this.toastrService.error('请上传图表预览图！', 'Error!');
      return;
    }
    formData.append("file", this.file, this.file.name);
    formData.append("name", formValue.name);

    this.themeService.create(formData)
      .then(res => {
        if (res.success){
          this.router.navigate(['/theme']);
        } else {
          this.toastrService.error(res.message, 'Error!');
        }
      })
  }

}
