import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: AdminPanelComponent,
    children: [
      {
        path:'',
        component: DashboardComponent
      },
      {
        path:'genome-data',
        loadChildren: './genome-data/genome-data.module#GenomeDataModule'
      },
      {
        path:'edit-profile',
        loadChildren: './edit-profile/edit-profile.module#EditProfileModule'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminPanelRoutingModule { }
