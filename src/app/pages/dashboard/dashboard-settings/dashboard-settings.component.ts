import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { GridsterComponent } from '../../../components/gridster/gridster.component';
import { IGridsterOptions } from '../../../components/gridster/IGridsterOptions';
import { IGridsterDraggableOptions } from '../../../components/gridster/IGridsterDraggableOptions';
import { ToastrService } from 'ngx-toastr';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DashboardService } from '../../../connector/dashboard.service';
import { Dashboard } from '../../../connector/dashboard';

import { DashboardSettingsModalComponent } from '../dashboard-settings-modal/dashboard-settings-modal.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.less']
})
export class DashboardSettingsComponent implements OnInit {
  closeResult: string;
  dashboard: Dashboard;
  widgets: Array<any>;
  itemOptions: any;
  gridsterOptions: IGridsterOptions;

  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
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
        this.itemOptions = {
          maxWidth: JSON.parse(res.option).horizontalDivision,
          maxHeight: JSON.parse(res.option).verticalDivision
        };
        this.gridsterOptions = {
          lanes: +JSON.parse(res.option).horizontalDivision * +JSON.parse(res.option).landscapeNum,
          direction: 'vertical',
          dragAndDrop: true,
          resizable: true,
          widthHeightRatio: 1,
          shrink: true,
          responsiveView: true,
          responsiveDebounce: 500
        };
      });
  }

  gotoDetail(dashboard: Dashboard): void {
    this.router.navigate(['/dashboard', dashboard.id, 'edit']);
  }

  gotoView(dashboard: Dashboard): void {
    this.router.navigate(['/v', dashboard.id])
  }

  openModal(widget) {
    const modalRef = this.modalService.open(DashboardSettingsModalComponent);
    modalRef.componentInstance.widget = widget;
  }

  @ViewChild(GridsterComponent) gridster: GridsterComponent;
  gridsterDraggableOptions: IGridsterDraggableOptions = {
    handlerClass: 'widget-move'
  };

  optionsChange(options: IGridsterOptions) {
    this.gridsterOptions = options;
  }

  addWidget(widgets) {
    widgets.push({
      title: 'Basic X',
      w: 1,
      h: 1,
      dragAndDrop: true,
      resizable: true,
      content: ''
    });
  }

  removeWidget($event, widgets, index: number, gridster: GridsterComponent) {
    $event.preventDefault();
    widgets.splice(index, 1);
    console.log('widget remove', index);
  }

  saveWidgets(dashboard: Dashboard) {
    let newWidgets = {
      id: dashboard.id,
      name: dashboard.name,
      desc: dashboard.desc ? dashboard.desc : '',
      option: JSON.stringify(dashboard.option),
      content: !_.isEmpty(dashboard.content) ? JSON.stringify(dashboard.content) : '[]'
    }

    this.dashboardService.update(newWidgets)
      .then(res => {
        if (res.success){
          this.toastrService.success('更新成功!', 'Success!');
        } else {
          this.toastrService.error(res.message, 'Error!');
        }
      });
  }

  itemChange($event: any, gridster) {
    console.log('item change', $event);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
