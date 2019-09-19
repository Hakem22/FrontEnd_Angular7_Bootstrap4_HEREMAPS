import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';


declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.scss']
})
export class OutputGraphComponent implements OnInit {
  
  private serverUrl = 'http://localhost:8080/live-stream'
  private stompClient;
  dataaaa:any;
  value: Observable<Object>;

  @ViewChild('chart') 
  public container: ElementRef;
  public options: any = {
    chart: {
      zoomType: 'x',
      //animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {
          load: function () {

              // set up the updating of the chart each second
              var series = this.series[0];
              setInterval(function () {
                  var x = (new Date()).getTime(), // current time
                      y = Math.random();
                  series.addPoint([x, y], true, true);
              }, 1000);
          }
      }
  },

  time: {
      useUTC: false
  },

  title: {
      text: 'Live random data'
  },
  xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
  },
  yAxis: {
      title: {
          text: 'Value'
      },
      plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
      }]
  },
  tooltip: {
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
  },
  legend: {
      enabled: false
  },
 
  plotOptions: {
    area: {
        fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            },
            stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, new Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
        },
        marker: {
          radius: 2
      },
      lineWidth: 1,
      states: {
          hover: {
              lineWidth: 1
          }
      },
      threshold: null
  }
},
  series: [{
      name: 'Random data',
      data: (function () {
          // generate an array of random data
          var data = [],
              time = (new Date()).getTime(),
              i;

          for (i = -19; i <= 0; i += 1) {
              data.push({
                  x: time + i * 1000,
                  y: Math.random()
              });
          }
          return data;
      }())
  }]
}
  constructor() { this.initializeWebSocketConnection();}

  ngOnInit(){
    Highcharts.chart(this.container.nativeElement, this.options);
  }



  
  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/data/value", (message) => {
        this.dataaaa=message.body.substring(21, 23);
        let val=parseInt(this.dataaaa);
        that.updateChartData(val);
        that.update(val)
        console.log("********",message.body);
        console.log("--------",this.dataaaa, "  ",this.value)
      });
    });
  }
  datasets: any[]= [{ data: [] }];
  
  updateChartData(val){
    this.value=val;
    console.log("heer",this.value);
  }
  getValue(){
    return this.value;
  }

  update(val){
    this.datasets[0].data.push({
      x: Date.now(),
      y: val
    });
  }


    sendMessage(message){
      this.stompClient.send("/app/send/message" , {}, message);
      $('#input').val('');
    }
  
}