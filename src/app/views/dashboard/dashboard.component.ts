import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { LoginService } from '../../services/login.service';
import { AlertSService } from '../../services/alert-s.service';
import { AlertCService } from '../../services/alert-c.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import 'chartjs-plugin-streaming';
import { Observable } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import * as fileSaver from 'file-saver'
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private serverUrl = 'http://localhost:8090/live-stream'
  private stompClient;
  countValid:number;
  countinvalid: number;
  countSensorAlert: number;
  countCitizenAlert: number;
  accident:number;
  fire:number;
  flood:number;
  earth:number;
  dataaaa:any;
  value: Observable<Object>;
  selectedFiles: FileList;
  currentFileUpload: File; 
  uploader: FileUploader;
  isDropOver: boolean;
  subscribed: boolean=false;

  constructor(private loginService: LoginService, private alertSensorService: AlertSService, private alertsCitizenService: AlertCService,private sanitizer: DomSanitizer) {
    this.initializeWebSocketConnection();   }

  
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },

    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value.charAt(0);
          }
        }
      }],
    },

  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  

  ngOnInit(): void {
    //Count Sensors' alerts
    this.alertSensorService.findAll().subscribe(
      data => {this.countSensorAlert=data.length; console.log(this.countSensorAlert)}
      );

      //Count Citizens'Alerts
    this.alertsCitizenService.findAllC().subscribe(
      data => {this.countCitizenAlert=data.length; console.log(this.countCitizenAlert)}
    );
/*
    // Count Valid citizens' Alerts
    this.alertsCitizenService.findValid().subscribe(
      data=>{ this.countValid=data.length;
          this.alertsCitizenService.findValidS().subscribe(
            res=> this.countValid=this.countValid+res,
            err => console.log(err)
          )
           console.log(this.countValid)
          });
*/

  this.alertsCitizenService.findbystate('valid').subscribe( data => this.countValid=data.length)
  this.alertsCitizenService.findbystate('invalid').subscribe( data => this.countinvalid=data.length)

  //Count Valid Sensors' Alerts
  /*  this.alertsCitizenService.findInvalidC().subscribe(
      data=>{ this.countValid=data.length;
          this.alertsCitizenService.findInvalidS().subscribe(
            res=> {this.countValid=this.countValid+res;
            console.log(this.countinvalid)},
            err => console.log(err)
          )
           console.log(this.countValid)
          });*/
    this.alertsCitizenService.findAlertByTypeC('acc').subscribe(
      data => this.accident=data.length
    );

    this.alertsCitizenService.findAlertByTypeC('fire').subscribe(
      data => this.fire=data.length
    );
    this.alertsCitizenService.findAlertByTypeC('etq').subscribe(
      data => this.earth=data.length
    );
    this.alertsCitizenService.findAlertByTypeC('flood').subscribe(
      data => this.flood=data.length
    );
  }


  isAuthenticated(){
    return this.loginService.isAuthenticated();
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

  update2(val){
   let time = (new Date()).getTime(),
     i;
   for (i = -19; i <= 0; i += 1) {
    this.datasets[0].data.push({
      x: time + i * 1000,
      y: val
    });
  }
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
  

   
    options: any = {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{ type: 'realtime' }],
        yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 10,
          stepSize: 10,
          max: 50
        }
      }]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        }
      },
      legend: {
        display: false
      },
      plugins: {
        streaming: {
          frameRate: 30,
          duration: 10000,
          refresh: 1000,
          delay: 0,
          },
        }
    };

    suscribe(){
      this.subscribed=!this.subscribed;
    }

    
        
}
