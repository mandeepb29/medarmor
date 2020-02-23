import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AdminPanelComponent, DashboardComponent],
  imports: [
    CommonModule
  ]
})

export class AdminPanelModule { }
