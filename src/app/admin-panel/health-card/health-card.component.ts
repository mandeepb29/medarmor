import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-health-card',
  templateUrl: './health-card.component.html',
  styleUrls: ['./health-card.component.scss']
})
export class HealthCardComponent implements OnInit {

  user;
  probability;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.getUser()
    .subscribe(result=> {
      console.log(result);
      this.user = result.result
      this.probability = this.user.probability * 100;
    })

    
  }

}
