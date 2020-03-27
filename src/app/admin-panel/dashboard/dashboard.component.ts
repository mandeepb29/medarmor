import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
declare var d3:any;
declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user;

  user_detail;
  disease;
  probability;
  cardData=[];

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.getUser()
    .subscribe(result=> {
      console.log(result);
      this.user = result.result
      this.user_detail = JSON.stringify(this.user)
    })

    this.DrawBar();
    this.Draw();

  }

  async Draw()
  {
    let data= await fetch('https://abc-machine.herokuapp.com/disease?_id=5e729baa9e6c9e34040dae7f&age=24&gender=Male&education_completion_year=5&census_region=West&marital_status=Married&race=American%20Indian,%20Alaskan%20Native%20or%20Multiple%20races&employement_status=Permanently%20Employed&insurance_coverage=Public&income_segment=Middle%20Income&current_income=39000&health_status=Very%20Good&mental_health_status=Very%20Good');

  var jsonData=await data.json();
    jsonData=jsonData.task;
    var dataLine=[];
   for(let i=0;i<jsonData.Year.length;i++)
     {
      let year=d3.timeParse("%d-%m-%Y")(jsonData.Year[i].split("/").join("-"));
       let prediction=parseInt(jsonData.prediction[i]);
       let el={"date":year,"close":prediction};
      dataLine.push(el);
     }
    console.log(dataLine);
  this.lineGraph(dataLine);
  }

  lineGraph(data){
  // set the dimensions and margins of the graph


  var lineChartWidth = $("#lineChartWrap").width()*0.95;
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = lineChartWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#graphicLine")
    .append("svg")
      .attr("width", "95%")
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
      // Add X axis --> it is a date format
      var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([ 0, width ]);

      let xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.close; })])
        .range([ height, 0 ]);
      let yAxis = svg.append("g")
        .call(d3.axisLeft(y));

      // Add a clipPath: everything out of this area won't be drawn.
      var clip = svg.append("defs").append("svg:clipPath")
          .attr("id", "clip")
          .append("svg:rect")
          .attr("width", width )
          .attr("height", height )
          .attr("x", 0)
          .attr("y", 0);

      // Create the line variable: where both the line and the brush take place
      var line = svg.append('g')
        .attr("clip-path", "url(#clip)")

      // Add the line
      line.append("path")
        .datum(data)
        .attr("class", "line")  // I add the class line to be able to modify this line later on.
        .attr("fill", "none")
        .attr("stroke", "#163a5f")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.close) })
          )

      // A function that set idleTimeOut to null
      var idleTimeout
      function idled() { idleTimeout = null; }

  }


  async DrawBar(){
    let data= await fetch('https://abc-machine.herokuapp.com/disease?_id=5e729baa9e6c9e34040dae7f&age=24&gender=Male&education_completion_year=5&census_region=West&marital_status=Married&race=American%20Indian,%20Alaskan%20Native%20or%20Multiple%20races&employement_status=Permanently%20Employed&insurance_coverage=Public&income_segment=Middle%20Income&current_income=39000&health_status=Very%20Good&mental_health_status=Very%20Good');

   var jsonData=await data.json();

    jsonData=jsonData.task;
    this.disease = jsonData.disease;
    this.auth.diseases_name = this.disease
    this.auth.diseases_probablity = jsonData.probability
    this.probability = Math.round(jsonData.probability * 100);
    console.log(jsonData, this.disease);
    for(let i=0;i<jsonData.event_names.length;i++){
      let t = {
        title: jsonData.event_names[i],
        value: jsonData.event_costs[i]
      }
      this.cardData.push(t);
    }


    console.log(this.cardData);
    let specifiData=[];
   for(let i=0;i<jsonData.event_names.length;i++)
     {
       let name=jsonData.event_names[i];
       let cost=jsonData.event_costs[i];
       let el={"name":name,"value":cost};
      console.log("Pushing: "+el);
       specifiData.push(el)
     }
  this.barGraph(specifiData);
  }


   barGraph(data)
  {

          //sort bars based on value
          data = data.sort(function (a, b) {
              return d3.ascending(a.value, b.value);
          })

          //set up svg using margin conventions - we'll need plenty of room on the left for labels
          var margin = {
              top: 15,
              right: 15,
              bottom: 15,
              left: 180
          };

          var width = 650 - margin.left - margin.right,
              height = 280 - margin.top - margin.bottom;

          var svg = d3.select("#graphic").append("svg")
              .attr("width", "100%")
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var x = d3.scaleLinear()
              .range([0, width])
              .domain([0, d3.max(data, function (d) {
                  return d.value;
              })]);

          var y = d3.scaleBand()
              // .range([height, 0])
              // .round(.1)
              .rangeRound([0, height])
              .padding(0.1)
              .domain(data.map(function (d) {
                  return d.name;
              }));

          //make y axis to show bar names
          var yAxis = d3.axisLeft(y)
              //no tick marks
              // .tickSize(0)
              // .orient("left");

          var gy = svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)

          var bars = svg.selectAll(".bar")
              .data(data)
              .enter()
              .append("g")


          //append rects
          bars.append("rect")
              .attr("class", "bar")
              .attr("y", function (d) {
                  return y(d.name);
              })
              .attr("height", 35)
              .attr("x", 1)
              .attr("width", function (d) {
                  return x(d.value);
              })
              .attr("fill",d=>{
              let color=['#45eba5','#21aba5','#1d566e','#163a5f'];
              let rand=Math.floor(Math.random() * 3) + 1;
              return color[rand];
          })


          //add a value label to the right of each bar
          bars.append("text")

              .attr("class", "label")
              //y position of the label is halfway down the bar
              .attr("y", function (d) {
                  return y(d.name) + 35/2  + 4;
              })
              //x position is 3 pixels to the right of the bar
              .attr("x", function (d) {
                  return x(d.value) + 5;
              })
              .text(function (d) {
                  return Number(d.value).toFixed(2);
              });
  }


send() {
    // this.auth.sendRequest('wfwf');
}

}
