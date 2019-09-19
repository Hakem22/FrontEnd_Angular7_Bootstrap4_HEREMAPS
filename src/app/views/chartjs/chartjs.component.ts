import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AlertCService } from '../../services/alert-c.service';
import { AlertSService } from '../../services/alert-s.service';
import { Chart } from 'chart.js';


@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent implements OnInit{

  constructor( private loginService: LoginService, private alertsCitizenService: AlertCService, private alertSensorService: AlertSService) { }

  SelectedRatio: String="Month";
  countSalert:any
  countValid: number;
  countinvalid: number;
  countSensorAlert: number;
  countCitizenAlert: number;
  accident:number;
  fire:number;
  flood:number;
  earth:number;
  wl:number;
  ff:number;
  agr:number;
  chart = [];

  // lineChart1
  public lineChartData: Array<any>=[{ data: []},{data: []}];
  public lineChartLabels: Array<any> = ['March', 'April', 'May', 'June', 'July', 'August', 'September'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },

  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // lineChart2
  public lineChartData2: Array<any>=[{ data: []},{data: []}];
  public lineChartLabels2: Array<any> = ['March', 'April', 'May', 'June', 'July', 'August', 'September'];
  public lineChartOptions2: any = {
    animation: false,
    responsive: true,
     
    
  };
  public lineChartColours2: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(110,171,117)',
      pointBackgroundColor: 'rgba(110,171,117)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(110,171,117)'
    },
    { // dark grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(136,141,13) ',
      pointBackgroundColor: 'rgba(136,141,13) ',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(136,141,13)'
    },

  ];
  public lineChartLegend2 = true;
  public lineChartType2 = 'line';

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    
  };
  public barChartLabels: string[] = ['March', 'April', 'May', 'June', 'July', 'August', 'September'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [{ data: []},{data: []}];

  
  

  

  // PolarArea
  public polarAreaChartLabels: string[] = ['ACCIDENT', 'FIRE', 'FLOOD', 'AGGRESION', 'EARTHQUACK'];
  public polarAreaChartData: number[] = [0,0,0,0,0];
  public polarAreaLegend = true;

  public polarAreaChartType = 'polarArea';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

 
  ngOnInit(){
    
   
    this.alertSensorService.findAll().subscribe(
    
      data => {this.countSensorAlert=data.length;
        this.alertsCitizenService.findAllC().subscribe(
          res => { 
            this.countCitizenAlert=res.length;
           
            this.lineChartData=[
              {data: [6, 4, 8, 11, 8, 4, this.countSensorAlert ], label: "ALERT SENSOR"},
              {data: [6, 5, 3, 8, 3, 8, this.countCitizenAlert ], label: "ALERT CITIZEN"}
            ];
          }, err => console.log(err)
        )     
        console.log(this.countSensorAlert);    
         }, err => console.log(err)
      );

      //Count Citizens'Alerts
    this.alertsCitizenService.findAllC().subscribe(
      data => { ;
        ; console.log(this.countCitizenAlert)}
    );

    


  
    this.alertsCitizenService.findInvalidC().subscribe(
      data=>{ this.countinvalid=data.length;
          this.alertsCitizenService.findInvalidS().subscribe(
            data=> {this.countinvalid=this.countinvalid+data.length;
              console.log("hhhh",this.countValid);
              
              this.alertsCitizenService.findValid().subscribe(
               data=>{ this.countValid=data.length;
              this.alertsCitizenService.findValidS().subscribe(
               res=>{ this.countValid=this.countValid+res.length,
               this.lineChartData2=[
                {data: [9, 5, 10, 14, 6, 11, this.countValid], label: 'VALID ALERTS'},
                {data: [3, 4, 1, 4, 5, 1, this.countinvalid], label: 'INVALID ALERTS'},
              ];},
               err => console.log(err)
              )
           console.log(this.countValid)
          });
            },
            err => console.log(err)
          )
           console.log(this.countValid)
          });
    this.alertsCitizenService.findAlertByTypeC('acc').subscribe(
      data => {this.accident=data.length;
        console.log("acc", this.accident)
        this.alertsCitizenService.findAlertByTypeC('fire').subscribe(
          data1 => {this.fire=data1.length;
            this.alertsCitizenService.findAlertByTypeC('etq').subscribe(
              data2 =>{ this.earth=data2.length;
                this.alertsCitizenService.findAlertByTypeC('flood').subscribe(
                  data3 => {this.flood=data3.length;
                    this.alertsCitizenService.findAlertByTypeC('agr').subscribe(
                      data4 => { this.agr=data4.length;
                        this.polarAreaChartData= [this.accident, this.fire, this.flood, this.agr, this.earth];
                      }
    
                    )
                  }
                );
              }
            );
          }
        );
      },
      err => console.log(err)
    );

    
    
   

    this.alertsCitizenService.findAlertByTypeS("wl").subscribe(
      data =>{ this.wl=data.length;
        console.log("wl", this.wl);
        this.alertsCitizenService.findAlertByTypeS("ff").subscribe(
          res => {
            this.ff=res.length;
            this.barChartData=[
              {data: [3, 4, 5, 6, 2, 0, this.wl], label: 'WATER_LEVEL'},
              {data: [3, 1, 3, 5, 3, 5, this.ff], label: 'FOREST_FIRE'}
            ];
          }, err => console.log(err)
        )

      }, err => console.log(err)
    )
    
  }

  isAuthenticated(){
    console.log(this.loginService.isAuthenticated());
    return this.loginService.isAuthenticated();
  }

  
  
}
