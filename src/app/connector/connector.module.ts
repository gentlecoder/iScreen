import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { DashboardService } from './dashboard.service';
import { ThemeService } from './theme.service';
import { ChartService } from './chart.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AuthGuard, DashboardService, ThemeService, ChartService]
})
export class ConnectorModule {
}
