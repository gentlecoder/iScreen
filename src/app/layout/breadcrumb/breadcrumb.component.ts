import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less']
})
export class BreadcrumbComponent implements OnInit {

  @Input() Showtitle: string = '标题';
  @Input() Subtitle: string = '副标题';

  @Input() Web: string = '站点';
  @Input() Module: string = '模块';
  @Input() Page: string = '页面';

  constructor() { }

  ngOnInit() {
  }

}
