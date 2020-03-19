import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, {validators: [Validators.required]}),
      cpassword: new FormControl(null, {validators: [Validators.required]}),
  })
}

register() {
  console.log(this.form.value);
  if(this.form.invalid) {
    return;
  }
  if(this.form.value.password != this.form.value.cpassword) return alert("Password not Matched");
  console.log(this.form.value);
  this.auth.register(this.form.value);
}

}
