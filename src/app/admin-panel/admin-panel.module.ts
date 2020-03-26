import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

  @NgModule({
    declarations: [AdminPanelComponent,DashboardComponent,TopbarComponent,SidebarComponent],
    imports: [
      CommonModule,
      AdminPanelRoutingModule,
      
    ]
  })
  
  export class AdminPanelModule { }
  