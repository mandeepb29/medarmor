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
  user_detail;
  token=null;
  email=null;
  id=null;
  form_filled = 'false';

  constructor(public http: HttpClient, public router: Router){}

  checkLocalStorage() {
    this.token = localStorage.getItem('token')
    if(!this.token) return;

    this.user_detail = JSON.parse(localStorage.getItem('user_detail'));
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
      this.user_detail = result.result
      this.id = result.result.id
      this.email = result.result.email
      this.token = result.result.token
      this.form_filled = result.result.form_filled

      localStorage.setItem('user_detail',JSON.stringify(this.user_detail));
      localStorage.setItem('token', this.token);
      localStorage.setItem('email', this.email);
      localStorage.setItem('id', this.id);
      localStorage.setItem('form_filled', this.form_filled);

      if(localStorage.getItem('form_filled') == 'true') this.router.navigate(['/admin/genome-data'])
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

  sendRequest(data) {
    // console.log(data);
    this.getUser()
    .subscribe(result=> {
      this.user_detail=result.result;
      // console.log(`https://abc-machine.herokuapp.com/disease?chr=[${data.chr}]&position_hg19=[${data.position_hg19}]&effect_allele=[${data.effect_allele}]&Alt_allele=[${data.Alt_allele}]&dis=bc&_id=${this.user_detail._id}&age=${this.user_detail.age}&gender=${this.user_detail.gender}&education_completion_year=${this.user_detail.education_completion_year}&census_region=${this.user_detail.census_region}&marital_status=${this.user_detail.marital_status}&race=${this.user_detail.race}&employement_status=${this.user_detail.employement_status}&insurance_coverage=${this.user_detail.insurance_coverage}&income_segment=${this.user_detail.income_segment}&current_income=${this.user_detail.current_income}&health_status=${this.user_detail.health_status}&mental_health_status=${this.user_detail.mental_health_status}`)
      let queryParms = `https://abc-machine.herokuapp.com/disease?chr=[${data.chr}]&position_hg19=[${data.position_hg19}]&effect_allele=[${data.effect_allele}]&Alt_allele=[${data.Alt_allele}]&dis=bc&_id=${this.user_detail._id}&age=${this.user_detail.age}&gender=${this.user_detail.gender}&education_completion_year=${this.user_detail.education_completion_year}&census_region=${this.user_detail.census_region}&marital_status=${this.user_detail.marital_status}&race=${this.user_detail.race}&employement_status=${this.user_detail.employement_status}&insurance_coverage=${this.user_detail.insurance_coverage}&income_segment=${this.user_detail.income_segment}&current_income=${this.user_detail.current_income}&health_status=${this.user_detail.health_status}&mental_health_status=${this.user_detail.mental_health_status}`
      console.log(queryParms.replace(/ /g, '%20'));
      // return this.http.get<{msg: string, blog: any, totalBlogs: number}>('https://abc-machine.herokuapp.com/disease'+queryParms);
    })
  }

}
