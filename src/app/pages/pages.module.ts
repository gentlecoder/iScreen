import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridsterModule } from '../components/gridster/gridster.module';
import { AngularEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutModule } from '../layout/layout.module';
import { PagesRoutingModule } from './pages.routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './settings/settings.component';
import { ThemeComponent } from './theme/theme.component';
import { NewDashboardComponent } from './dashboard/new-dashboard/new-dashboard.component';
import { NewThemeComponent } from './theme/new-theme/new-theme.component';
import { DashboardDetailComponent } from './dashboard/dashboard-detail/dashboard-detail.component';
import { DashboardSettingsComponent } from './dashboard/dashboard-settings/dashboard-settings.component';
import { DashboardSettingsModalComponent } from './dashboard/dashboard-settings-modal/dashboard-settings-modal.component';
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { ChartComponent } from './chart/chart.component';
import { NewChartComponent } from './chart/new-chart/new-chart.component';
import { ChartDetailComponent } from './chart/chart-detail/chart-detail.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    PagesRoutingModule,
    FormsModule,
    GridsterModule,
    AngularEchartsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    SettingsComponent,
    ThemeComponent,
    NewDashboardComponent,
    NewThemeComponent,
    DashboardDetailComponent,
    DashboardSettingsComponent,
    DashboardSettingsModalComponent,
    DashboardViewComponent,
    ChartComponent,
    NewChartComponent,
    ChartDetailComponent
  ],
  entryComponents: [
    DashboardSettingsModalComponent
  ],
  providers: []
})
export class PagesModule { }
