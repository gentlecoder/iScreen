import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { ThemeComponent } from './theme/theme.component';
import { NewDashboardComponent } from './dashboard/new-dashboard/new-dashboard.component';
import { DashboardDetailComponent } from './dashboard/dashboard-detail/dashboard-detail.component';
import { DashboardSettingsComponent } from './dashboard/dashboard-settings/dashboard-settings.component';
import { NewThemeComponent } from './theme/new-theme/new-theme.component';
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { ChartComponent } from './chart/chart.component';
import { NewChartComponent } from './chart/new-chart/new-chart.component';
import { ChartDetailComponent } from './chart/chart-detail/chart-detail.component';

import { AuthGuard } from '../connector/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'dashboard/new',
    canActivate: [AuthGuard],
    component: NewDashboardComponent,
  },
  {
    path: 'dashboard/:id/edit',
    canActivate: [AuthGuard],
    component: DashboardDetailComponent,
  },
  {
    path: 'dashboard/:id/settings',
    canActivate: [AuthGuard],
    component: DashboardSettingsComponent,
  },
  {
    path: 'v/:id',
    component: DashboardViewComponent,
  },
  {
    path: 'charts',
    canActivate: [AuthGuard],
    component: ChartComponent,
  },
  {
    path: 'chart/new',
    canActivate: [AuthGuard],
    component: NewChartComponent,
  },
  {
    path: 'chart/:id/edit',
    canActivate: [AuthGuard],
    component: ChartDetailComponent,
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsComponent,
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserComponent,
  },
  {
    path: 'theme',
    canActivate: [AuthGuard],
    component: ThemeComponent,
  },
  {
    path: 'theme/new',
    canActivate: [AuthGuard],
    component: NewThemeComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
