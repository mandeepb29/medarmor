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
  form_filled = 'false';

  constructor(public http: HttpClient, public router: Router){}

  checkLocalStorage() {
    this.token = localStorage.getItem('token')
    if(!this.token) return;

    this.email = localStorage.getItem('email');
    this.id = localStorage.getItem('id');
    this.form_filled = localStorage.getItem('form_filled');
    console.log(this.form_filled)
    if(this.form_filled == 'true') this.router.navigate(['/admin'])
    else this.router.navigate(['/register'])
  }

  register(values) {
    return this.http.post<{
      status: string;
      msg: string;
      result: any;
    }>("https://medarmor-api.herokuapp.com/newuser", values)
    .subscribe(result=> {
      console.log(result);
      alert('Registered Successfully');
    })
  }

  login(values) {
   this.http.post<{
      status: string;
      msg: string;
      result: any;
    }>("https://medarmor-api.herokuapp.com/login", values)
    .subscribe(result=> {
      console.log(result)
      if(result.msg != 'Login Successfully') return alert(result.msg);
      this.id = result.result.id
      this.email = result.result.email
      this.token = result.result.token
      this.form_filled = result.result.form_filled

      localStorage.setItem('token', this.token);
      localStorage.setItem('email', this.email);
      localStorage.setItem('id', this.id);
      localStorage.setItem('form_filled', this.form_filled);

      if(localStorage.getItem('form_filled') == 'true') this.router.navigate(['/admin'])
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
      this.form_filled = 'true';
      localStorage.setItem('form_filled', 'true');
    })
  }

  logout() {
    this.token = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUser() {
    return this.http.get<{
      status: string;
      msg: string;
      result: any;
    }>("https://medarmor-api.herokuapp.com/user/"+this.id);
  }

}
