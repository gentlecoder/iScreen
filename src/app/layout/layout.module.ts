import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout.routing.module';

import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout.component';
import { TopComponent } from './top/top.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    LayoutComponent,
    TopComponent,
    MenuComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
  exports: [
    TopComponent,
    MenuComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
})
export class LayoutModule { }
