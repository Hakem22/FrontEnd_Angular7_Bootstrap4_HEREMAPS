import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SensorService } from '../../services/sensor.service';
import { InterventionUnitService } from '../../services/intervention-unit.service';
import { Observable } from 'rxjs';
import { Sensor } from '../../data/sensor';
import { InterventionUnit } from '../../data/intervention-unit';
import { AlertCService } from '../../services/alert-c.service';
import { AlertSService } from '../../services/alert-s.service';
import { AlertS } from '../../data/alert-s';
import { AlertC } from '../../data/alert-c';
import { LoginService } from '../../services/login.service';
import { ActeurService } from '../../services/acteur.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaService } from '../../services/media.service';
declare var L: any;
declare var H: any
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

    allSensors: Observable< any>;
    allUnits: Observable< any>;
    alertsSensor: Observable< any>;
    alertsCitizen: Observable< any>;
    SelectedSensorType: string= "None";
    SelectedUnitsType: String= "None;"
    selectedAlert: boolean=false;
    fullResult:any;
    blob: any;




    @ViewChild("map")
    public mapElement: ElementRef;
    private appId="DWYW4NT6SmZxJ1HlOXIx";
    private appCode="lvhjnhHfAOZFhygL_QtBeA";
    private map: any;
    public srcTiles: string;
    public height: string;
    public weather: any;
    isCollapsed: boolean=false;
    clicked: boolean=false;
    username:any;

   
    //Icons
    alertCIcon = L.icon({
        iconUrl: '../../../assets/img/avatars/icon2.png',
        iconSize:     [50, 50], // size of the icon
        });
    alertSIcon = L.icon({
            iconUrl: '../../../assets/img/avatars/icon3.png',
            iconSize:     [50, 50], // size of the icon
            });

    sensorIcon = L.icon({
       iconUrl: '../../../assets/img/avatars/icon4.png',
       iconSize:     [50, 50], // size of the icon
              });

    public constructor(private http: HttpClient, private sensorService: SensorService, private unitsService: InterventionUnitService, 
        private alertCService: AlertCService, private alertSService: AlertSService, private loginService: LoginService, private actorService: ActeurService,
        private sanitizer: DomSanitizer, private mediaService: MediaService) {

        this.height = window.innerHeight + "px";
        this.weather = [];
        setInterval(()=> { this.getSensor() }, 60000); 
        setInterval(()=> { this.getCitizens() }, 60000); 
    }


    collapsed(event: any): void {
        // console.log(event);
      }
    public ngOnInit() {
        this.srcTiles = "https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/512/png8?app_id=" + this.appId + "&app_code=" + this.appCode + "&ppi=320";

        this.sensorService.findAll().subscribe(data => {
            this.allSensors = data},
            err=>{
                console.log("Couldn't fetch all sensors")
        });

        this.unitsService.findAll().subscribe(data => {
            this.allUnits = data},
            err=>{
                console.log("Couldn't fetch all intervention units")
        });
        this.username=this.loginService.username;
        console.log(this.username);
        this.alertCService.findAllStatlessS().subscribe(data => {
          this.alertsSensor = data;
          console.log(data);
          this.alertsSensor.forEach(element => {
              this.seeOnMapAlertSensor(element.altitude, element.longitude,element.dateSend,element.timeSend,element.sensor.reference, element.sensor.type,element.id);
                  
          });
  
      }, err=>{
        console.log("Couldn't fetch all statless sensor's alerts")
  });

        this.alertCService.findAllStatlessC().subscribe(data => {
            this.alertsCitizen = data;
            console.log(data);
            this.alertsCitizen.forEach(element => { 
                this.mediaService.getUri(element.id).subscribe(
                  data => {
                    console.log(data);
                  // this.downloadFileSystem(data);
                  },
                  err =>{
                    let fileName=err.error.text
                    console.log("heeer", fileName);
                    this.alertCService.getFile(fileName).subscribe(
                      response => {
                        const filename = response.headers.get('filename');
                        console.log("#####",response);
                        //this.saveFile(response.body, filename);
                        this.blob = new Blob([response.body], {type: 'image/jpeg'}); 
                        let objectURL = URL.createObjectURL(this.blob);
                        element.uri = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                        console.log("jjjjj", element.uri);
                              },
                      err=> {
                          console.log("-------",err)
                       });
                      });
                  
        
              });

              this.alertsCitizen.forEach(element => {
              this.seeOnMapAlertCitizen(element.altitude, element.longitude,element.dateSend,element.timeSend,element.alertType,element.citizen.phoneNumber, element.id);
                    
            });
        },
            err=>{
                console.log("Couldn't fetch all statless citizen's alerts")
        });
/*
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.getWeather(position.coords.latitude,position.coords.longitude);
            });
        } else {
            console.error("The browser does not support geolocation...");
       */
            this.getWeather(35.1947429, -0.6238866);

        this.unitsService.getnearestunits(35.1937429,-0.6238866, 0.009).subscribe(data=> console.log("bbbbbbbbbbb",data), err=> console.log(err));
        this.direction();
    }
  

    public getWeather(al, log) {
    this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + al + "&longitude=" + log + "&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
        .subscribe(
            result => {
             this.fullResult=result;   
            this.weather = this.fullResult.dailyForecasts.forecastLocation.forecast;
            console.log("rrr",this.fullResult);
        }, 
             error => {
            console.error(error);
        });

    }


    public ngAfterViewInit() {
        this.map = L.map(this.mapElement.nativeElement, {
            center: [35.1947429, -0.6238866],
            zoom: 10,
            layers: [L.tileLayer(this.srcTiles)],
            zoomControl: true
        });
    }

    
   
    validateC(idA){
        this.alertCService.getAlert(idA).subscribe(
            data=>{
             console.log(data);
             let value:any;
             let idAc:any
             value=data;
             value.alertState='VALIDE';
             if (this.username==null) this.username=this.loginService.getUsername();

             this.actorService.getActor(this.username).subscribe(
                 data =>{ 
                  let u:any;
                  u=data;
                  idAc=u.id;
                console.log("acror", idAc);
                this.alertCService.updateAlertC(idA,idAc,value).subscribe(res => {
                  console.log(res);
                  this.map.remove();
                  this.ngAfterViewInit();
                  this.ngOnInit();
                },
           
                err=> console.log("2", err))
              
              },
                 err => console.log("error in getting actor")
           )
             
           }, 
           err=> console.log("1",err)
         )
    }

    invalidateC(idA){
        this.alertCService.getAlert(idA).subscribe(
            data=>{
             console.log(data);
             let value:any;
             let idAc:any;
             value=data;
             value.alertState='INVALIDE';
             if (this.username==null) this.username=this.loginService.getUsername();

             this.actorService.getActor(this.username).subscribe(
              data =>{ 
                let u:any;
                u=data;
                idAc=u.id;
             console.log("acror", idAc);
             this.alertCService.updateAlertC(idA,idAc,value).subscribe(res => {
               console.log(res);
               this.map.remove();
               this.ngAfterViewInit();
               this.ngOnInit();
             },
        
             err=> console.log("2", err))
           
           },
              err => console.log("error in getting actor")
        )
           }, 
           err=> console.log("1",err)
         )
    }

    invalidateS(idA){
        this.alertCService.getAlert(idA).subscribe(
            data=>{
             console.log(data);
             let value:any;
             let idAc:any;
             value=data;
             value.alertState='INVALIDE';
             if (this.username==null) this.username=this.loginService.getUsername();
             this.actorService.getActor(this.username).subscribe(
              data =>{ 
                let u:any;
                u=data;
                idAc=u.id;
             console.log("acror", idAc);
             this.alertCService.updateAlertS(idA,idAc,value).subscribe(res => {
               console.log(res);
               this.map.remove();
               this.ngAfterViewInit();
               console.log("before onint");
               this.ngOnInit();
             },
        
             err=> {console.log("2", err);
             this.map.remove();
             this.ngAfterViewInit();
             this.ngOnInit();})
           
           },
              err => console.log("error in getting actor")
        )
           }, 
           err=> console.log("1",err)
         )
    }


    validateS(idA){
        this.alertCService.getAlert(idA).subscribe(
            data=>{
             console.log(data);
             let value:any;
             let idAc:any;
             value=data;
             value.alertState='VALIDE';
             if (this.username==null) this.username=this.loginService.getUsername();

             this.actorService.getActor(this.username).subscribe(
              data =>{ 
                let u:any;
                u=data;
                idAc=u.id;
             console.log("acror", idAc);
             this.alertCService.updateAlertS(idA,idAc,value).subscribe(res => {
               console.log(res);
               this.map.remove();
               this.ngAfterViewInit();
               this.ngOnInit();
             },
        
             err=> {console.log("2", err);
             this.map.remove();
             this.ngAfterViewInit();
             this.ngOnInit();})
           
           },
              err => console.log("error in getting actor")
        )
           }, 
           err=> console.log("1",err)
         )
    }

    

   

    //search an address
    geocodeAdr(address){
      this.ngOnInit();

        this.http.get("https://geocoder.api.here.com/6.2/geocode.json", {
            params: {
                app_id: this.appId,
                app_code: this.appCode,
                searchtext: address
            }
        }).subscribe(result => {
          console.log("result",result);
          let val:any;
          val=result;
            let location = val.Response.View[0].Result[0].Location.DisplayPosition;
            let marker = new L.Marker([location.Latitude, location.Longitude]);
            marker.addTo(this.map);
        });
    }

    direction(){
      this.http.get("https://route.api.here.com/routing/7.2/calculateroute.json", {
            params: {
              app_id: this.appId,
              app_code: this.appCode,
              waypoint0: '35.1937429,-0.6238866',
              waypoint1: '35.2237429,-0.6238866',
              mode: 'fastest;car;traffic:enabled',
              departure: 'now'
            }
        }).subscribe(result => {
          console.log("result",result);
           // let location = result.Response.View[0].Result[0].Location.DisplayPosition;
           // let marker = new L.Marker([location.Latitude, location.Longitude]);
           // marker.addTo(this.map);
          
        });
    }

    //Display sensors on maps
    selectedSensors(event: any){
        this.SelectedSensorType = event.target.value;
        console.log(this.SelectedSensorType);
          if(this.SelectedSensorType=="WATER_LEVEL") this.sensorService.findSensorByType("water").subscribe(
              data => {this.allSensors=data;
                console.log(data);
                this.allSensors.forEach(element => {
                  this.seeOnMapSensor(element.altitude, element.longitude, element.type,element.state, element.reference);
                      
              });},
                err => console.log(err));
                
          else if(this.SelectedSensorType=="FOREST_FIRE") this.sensorService.findSensorByType("fire").subscribe(
                  data => {this.allSensors=data;
                    console.log(data);
                    console.log(data);
                    this.allSensors.forEach(element => {
                      this.seeOnMapSensor(element.altitude, element.longitude, element.type,element.state, element.reference);
                          
                  });},
                    err => console.log(err));
      
          else if(this.SelectedSensorType=="ALL") this.sensorService.findAll().subscribe(
            data => {
              this.allSensors=data;
              console.log(data);
                this.allSensors.forEach(element => {
                  this.seeOnMapSensor(element.altitude, element.longitude, element.type,element.state, element.reference);
                      
              });
              
            },
            err=> console.log(err)
          )
      else {
      this.map.remove();
      this.ngAfterViewInit();
      this.ngOnInit();
    };
        

    }

    //Display units on maps
    selectedUnits(event: any){
      this.SelectedUnitsType = event.target.value;
  console.log(event);
  console.log(this.SelectedUnitsType);
    if(this.SelectedUnitsType=="HOSPITALITY") this.unitsService.findUnitsByType("hospitality").subscribe(
      data => {this.allUnits=data;
        console.log(data);
        this.allUnits.forEach(element => {
          this.seeOnMapUnit(element.altitude, element.longitude, element.interventionType, element.address);
              
      });},
        err => console.log(err));
  
     else if(this.SelectedUnitsType=="CIVIL_PROTECTION") this.unitsService.findUnitsByType("civilprotection").subscribe(
          data => {this.allUnits=data;
            console.log(data);
            this.allUnits.forEach(element => {
              this.seeOnMapUnit(element.altitude, element.longitude, element.interventionType, element.address);
                  
          });},
            err => console.log(err));
            
    else  if(this.SelectedUnitsType=="POLICE_DIRECTION") this.unitsService.findUnitsByType("policedirection").subscribe(
              data => {this.allUnits=data;
                console.log(data);
                this.allUnits.forEach(element => {
                  this.seeOnMapUnit(element.altitude, element.longitude, element.interventionType, element.address);
                      
              });},
                err => console.log(err));
      
    else if(this.SelectedUnitsType=="GENDARMERIE") this.unitsService.findUnitsByType("gendarmerie").subscribe(
           data => {this.allUnits=data;
                console.log(data);
                this.allUnits.forEach(element => {
                  this.seeOnMapUnit(element.altitude, element.longitude, element.interventionType, element.address);
                      
              });},
                err => console.log(err));
  
  
      else if(this.SelectedUnitsType=="ALL") this.unitsService.findAll().subscribe(
        data => {
          this.allUnits=data;
          console.log(data);
          this.allUnits.forEach(element => {
            this.seeOnMapUnit(element.altitude, element.longitude, element.interventionType, element.address);
                
        });
        },
        err => console.log(err)
      );
      

      else {
        this.map.remove();
        this.ngAfterViewInit();
        this.ngOnInit();
      };
    }




    isAuthenticated(){
        console.log(this.loginService.isAuthenticated());
        this.username=this.loginService.username;
        return this.loginService.isAuthenticated();

      }


      seeOnMapAlertCitizen(al,log,date,time,type,num,id){
        console.log(al, log);
       L.marker([al, log], {icon: this.alertSIcon}).addTo(this.map).bindPopup(
        '<div  class="card " style="width: 18rem;" >'+
        '<div class="card-header">'+
            '<h5 class= "text-center font-weight-bold text-uppercase">'+type+'</h5>'+  

          '<dl class="row align-items-center mt-3">'+
            '<!--phone-->'+
            '<dt class="col-sm-3"><i class="fa fa-mobile"></i></dt>'+
            '<dd class="col-sm-9">'+num+'</dd>'+
            '<!--time-->'+
            '<dt class="col-sm-3"><i class="fa fa-clock-o"></i></dt>'+
            '<dd class="col-sm-9"><p>'+time+'</p></dd>'+

            '<!--date-->'+
            '<dt class="col-sm-3"><i class="fa fa-calendar"></i></dt>'+
            '<dd class="col-sm-9"><p>'+date+'</p></dd>'+

      '</dl> '+
      '<div class="row align-items-center mt-3 >  '+  
      '<button class="btn btn-sucess " (click)=" deleteAlert(alert.id)"></button>'+  
      '</div> '+     
'</div>'
    );   
      }

      seeOnMapAlertSensor(al,log,date,time,ref,type,id){
        console.log(al, log);
       L.marker([al, log],{icon: this.alertCIcon}).addTo(this.map).bindPopup(
        '<div  class="card " style="width: 18rem;" >'+
        '<div class="card-header">'+
            '<h5 class= "text-center font-weight-bold text-uppercase">'+type+'</h5>'+
          '<dl class="row align-items-center mt-3">'+
            '<!--name-->'+
            '<dt class="col-sm-3"><i class="fa fa-user"></i></dt>'+
            '<dd class="col-sm-9"><p class="text-uppercase">'+ref+'</p></dd>'+

            '<!--time-->'+
            '<dt class="col-sm-3"><i class="fa fa-clock-o"></i></dt>'+
            '<dd class="col-sm-9"><p>'+time+'</p></dd>'+

            '<!--date-->'+
            '<dt class="col-sm-3"><i class="fa fa-calendar"></i></dt>'+
            '<dd class="col-sm-9"><p>'+date+'</p></dd>'+

      '</dl> '+
      '<div class="row align-items-center mt-3 >  '+  
      '<button class="btn btn-sucess " (click)=" deleteAlert(alert.id)"></button>'+  
      '</div> '+     
'</div>'
    );   ;
      }


      seeOnMapSensor(al, log,type,state,ref){
        console.log(al,log);
        L.marker([al, log],{icon: this.sensorIcon}).addTo(this.map).bindPopup(
          '<div  class="card " style="width: 18rem;" >'+
          '<div class="card-header">'+
              '<h5 class= "text-center font-weight-bold text-uppercase">'+type+' ('+ref+')'+state+'</h5>'+
          '</div>'+    
  '</div>');
      }

   
      seeOnMapUnit(al,log,type,adr){
        console.log(al,log);
        L.marker([al, log]).addTo(this.map).bindPopup(
          '<div  class="card " style="width: 18rem;" >'+
          '<div class="card-header">'+
              '<h5 class= "text-center font-weight-bold text-uppercase">'+type+'</h5>'+
              
             '<dl class="row align-items-center mt-3">'+
              '<!--phone-->'+
              '<dt class="col-sm-3"><i class="fa fa-mobile"></i></dt>'+
              '<dd class="col-sm-9">1234567890</dd>'+
              '<!--name-->'+
              '<dt class="col-sm-3"><i class="fa fa-map-marker"></i></dt>'+
              '<dd class="col-sm-9"><p class="text-uppercase">'+adr+'</p></dd>'+

        '</dl> '+ 
        '</div>'+    
'</div>');
      }


      nearestUnits(al, log){
        this.selectedAlert=!this.selectedAlert;
        this.clicked= !this.clicked;
        if(this.clicked){

        this.getWeather(al,log);
        this.unitsService.getnearestunits(al,log,0.009).subscribe(
         data=> {
           console.log(data);
           this.map.remove();
           this.ngAfterViewInit();
           this.ngOnInit();
           this.allUnits=data;
           this.allUnits.forEach(element => {
            this.seeOnMapUnit(element.altitude, element.longitude, element.interventionType, element.address);
        });
        var circle = L.circle([al, log], 1200, {
          color: 'green',
          fillColor: '#008080',
          fillOpacity: 0.5
      }).addTo(this.map);
          }
        )}
        else {
          this.ngAfterViewInit();
           this.ngOnInit();
        } 
      }
    
   getSensor(){
     
    this.alertCService.findAllStatlessS().subscribe(data => {
      this.alertsSensor = data;
      console.log(data);
      this.alertsSensor.forEach(element => {
          this.seeOnMapAlertSensor(element.altitude, element.longitude,element.dateSend,element.timeSend,element.sensor.reference, element.sensor.type,element.id);
              
      });

  }, err=>{
    console.log("Couldn't fetch all statless sensor's alerts")
});
   }


   getCitizens(){
    this.alertCService.findAllStatlessC().subscribe(data => {
      this.alertsCitizen = data;
      console.log(data);
      this.alertsCitizen.forEach(element => { 
          this.mediaService.getUri(element.id).subscribe(
            data => {
              console.log(data);
            // this.downloadFileSystem(data);
            },
            err =>{
              let fileName=err.error.text
              console.log("heeer", fileName);
              this.alertCService.getFile(fileName).subscribe(
                response => {
                  const filename = response.headers.get('filename');
                  console.log("#####",response);
                  //this.saveFile(response.body, filename);
                  this.blob = new Blob([response.body], {type: 'image/jpeg'}); 
                  let objectURL = URL.createObjectURL(this.blob);
                  element.uri = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                  console.log("jjjjj", element.uri);
                        },
                err=> {
                    console.log("-------",err)
                 });
                });
            
  
        });

        this.alertsCitizen.forEach(element => {
        this.seeOnMapAlertCitizen(element.altitude, element.longitude,element.dateSend,element.timeSend,element.alertType,element.citizen.phoneNumber, element.id);
              
      });
  },
      err=>{
          console.log("Couldn't fetch all statless citizen's alerts")
  });
   }
}