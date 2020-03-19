import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  user;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.getUser()
    .subscribe(result=> {
      console.log(result);
      this.user = result.result
    })
  }

  logout() {
    this.auth.logout();
  }
}
