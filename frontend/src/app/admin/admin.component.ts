import { Component, OnInit } from '@angular/core';

import * as Chart from 'chart.js';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	title = "Chart js demo";
	BarChart: any;
	PieChart: any;
	PolarAreaChart: any;
	LineChart: any;
	DoughNutChart: any;
	RadarChart: any;


  constructor() { 
  }

  ngOnInit() {

  	//Bar Chart

  	this.BarChart = new Chart('barChart',{
  		type: 'bar',
  		data: {
  			labels: ["red", "blue", "yellow", "green"],
  			datasets: [{
  				label: '# of votes',
  				data: [9,8,10,3],
  				backgroundColor:[
  					'rgba(255,255,255,0.2)',
            'rgba(255,255,255,0.2)',
            'rgba(255,255,255,0.2)',
            'rgba(255,255,255,0.2)'
  				],
  				borderColor:[
  					'rgba(255,255,255,1)',
            'rgba(255,255,255,1)',
            'rgba(255,255,255,1)',
            'rgba(255,255,255,1)'
  				],
  				borderWidth: 5
  			}]
  		},
  		options:{
  			title:{
  				text: "Awesome analytical data",
  				display: true
  			},
  			scales:{
  				yAxes: [{
  					ticks:{
  						beginAtZero: true
  					}
  				}]
  			}
  		}
  	});


    //Line Chart


    this.LineChart = new Chart('lineChart',{
      type: 'line',
      data: {
        labels: ["red", "blue", "yellow", "green"],
        datasets: [{
          label: '# of votes',
          data: [9,8,10,3],
          fill:false,
          lineTension:0.4,
          
          borderColor:"white",
          borderWidth: 3
        }]
      },
      options:{
        title:{
          text: "Weekly garbage collection of data",
          display: true
        },
        scales:{
          yAxes: [{
            ticks:{
              beginAtZero: true
            }
          }]
        }
      }
    });

  // Radar Chart 1

   this.RadarChart = new Chart('radarChart1',{
      type: 'radar',
      data: {
        labels: ["red", "blue", "yellow", "green"],
        datasets: [{
          label: '# of votes',
          data: [9,8,10,3],
          backgroundColor:[
            "yellow",
            "yellow",
            "yellow",
            "yellow"
          ],
          borderColor:[
            "yellow",
            "yellow",
            "yellow",
            "yellow"
          ],
          borderWidth: 3
          
        }]
      },
      options:{
        title:{
          text: "Types of garbage",
          display: true
        },
        scales:{
          yAxes: [{
            ticks:{
              beginAtZero: true
            }
          }]
        }
      }
    });

// Radar Chart 2

   this.RadarChart = new Chart('radarChart2',{
      type: 'radar',
      data: {
        labels: ["red", "blue", "yellow", "green"],
        datasets: [{
          label: '# of votes',
          data: [9,8,10,3],
          backgroundColor:[
            "yellow",
            "yellow",
            "yellow",
            "yellow"
          ],
          borderColor:[
            "yellow",
            "yellow",
            "yellow",
            "yellow"
          ],
          borderWidth: 3
          
        }]
      },
      options:{
        title:{
          text: "Area of collection",
          display: true
        },
        scales:{
          yAxes: [{
            ticks:{
              beginAtZero: true
            }
          }]
        }
      }
    });

// Radar Chart 3

   this.RadarChart = new Chart('radarChart3',{
      type: 'radar',
      data: {
        labels: ["red", "blue", "yellow", "green"],
        datasets: [{
          label: '# of votes',
          data: [9,8,10,3],
          backgroundColor:[
            "yellow",
            "yellow",
            "yellow",
            "yellow"
          ],
          borderColor:[
            "yellow",
            "yellow",
            "yellow",
            "yellow"
          ],
          borderWidth: 3
          
        }]
      },
      options:{
        title:{
          text: "Quantity of garbage collected",
          display: true
        },
        scales:{
          yAxes: [{
            ticks:{
              beginAtZero: true
            }
          }]
        }
      }
    });


  }

}
