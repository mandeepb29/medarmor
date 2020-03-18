import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn:boolean=false;
  token=null;
  email=null;
  id=null;
  form_filled:boolean = false;

  constructor(public http: HttpClient, public router: Router){}

  checkLocalStorage() {
    this.token = localStorage.getItem('token')
    if(!this.token) return;

    this.email = localStorage.getItem('email');
    this.id = localStorage.getItem('id');
    this.form_filled = Boolean(localStorage.getItem('form_filled'));
    console.log(this.form_filled)
    if(this.form_filled) this.router.navigate(['/admin'])
    else this.router.navigate(['/register'])
  }

  login(values) {
   this.http.post<{
      status: string;
      msg: string;
      result: any;
    }>("https://medarmor-api.herokuapp.com/login", values)
    .subscribe(result=> {
      this.id = result.result.id
      this.email = result.result.email
      this.token = result.result.token
      this.form_filled = result.result.form_filled

      localStorage.setItem('token', this.token);
      localStorage.setItem('email', this.email);
      localStorage.setItem('id', this.id);
      localStorage.setItem('form_filled', String(this.form_filled));

      if(this.form_filled) this.router.navigate(['/admin'])
      else this.router.navigate(['/register'])
    })
  }

  updateProfile(values) {
    return this.http.patch<{
      status: string;
      msg: string;
      result: any;
    }>("https://medarmor-api.herokuapp.com/update-profile", values)
    .subscribe(result=> {
      console.log(result);
      this.form_filled = true;
      localStorage.setItem('form_filled', 'true');
    })
  }

  getUser() {
    return this.http.get<{
      status: string;
      msg: string;
      result: any;
    }>("https://medarmor-api.herokuapp.com/user/"+this.id);
  }

}
