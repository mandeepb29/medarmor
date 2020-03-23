import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55], label: 'lorem'
    , backgroundColor: [
      '#6DB3BF','#6DB3BF','#6DB3BF','#6DB3BF','#6DB3BF','#6DB3BF'
  ],
  },
    {data: [28, 48, 40, 19, 86, 27], label: 'lorem ispum',backgroundColor: [
      '#153641','#153641','#153641','#153641','#153641','#153641'
    ]},

  ];

  user;
  user_detail;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.getUser()
    .subscribe(result=> {
      console.log(result);
      this.user = result.result
      this.user_detail = JSON.stringify(this.user)
    })
  }

  send() {
    // this.auth.sendRequest('wfwf');
  }

}
