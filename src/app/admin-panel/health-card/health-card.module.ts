import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthCardComponent } from './health-card.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: HealthCardComponent,
  }
];


@NgModule({
  declarations: [HealthCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class HealthCardModule { }
