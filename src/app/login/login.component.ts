import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, {validators: [Validators.required]}),
  })
}

login() {
  console.log(this.form.value);
  if(this.form.invalid) {
    return;
  }
  console.log(this.form.value);
  this.auth.login(this.form.value);
}

}
