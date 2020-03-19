import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  },
]


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SignupModule { }
