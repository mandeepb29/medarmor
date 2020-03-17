import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenomeDataComponent } from './genome-data.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: GenomeDataComponent,
  }
];

@NgModule({
  declarations: [GenomeDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class GenomeDataModule { }
