import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor } from '../../../../data/sensor';
import { SensorService } from '../../../../services/sensor.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
import { AlertS } from '../../../../data/alert-s';



@Component({
  selector: 'app-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.scss']
})
export class SensorsListComponent implements OnInit {

  sensors: Observable< Sensor[]>;
  SelectedSensorType: string= "All";
  SelectedSensorStatus: string="All";
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective
  elements: any = [];
  previous: any = [];
  headElements = ['REFERENCE', 'STATE', 'TYPE','ALTITUDE','LONGITUDE', 'CHANGE STATE','DELETE','ALERTS'];
  editField: string;

  constructor(private router: Router, private sensorService: SensorService, private loginService: LoginService) { }


  ngOnInit(){
    this.sensorService.findAll().subscribe(data => {
      this.sensors = data;
    console.log(data)},
      err=>{
      console.log("error in data loading using service!")
      });
    
      
  }
    

  changeValue(id: number, property: string, event: any) {
    console.log("id", id);
    
    this.editField = event.target.textContent;
  }
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    console.log("idd",id);
    this.sensorService.getSensor(id).subscribe(
     data=>{
      console.log(data);
      let value=data;
      value[property]=editField;
      console.log(value);
      this.sensorService.updateSensor(id,value).subscribe(res => console.log(res),
      err=> console.log("error2"))
    }, 
    err=> console.log("error1")
  )

  }


  //Display chart by selected creteria
  SensorsByType(event: any){
  this.SelectedSensorType = event.target.value;
  console.log(this.SelectedSensorType);

    if(this.SelectedSensorType=="WATER_LEVEL") this.sensorService.findSensorByType("water").subscribe(
        data => {this.sensors=data;
          console.log(data);},
          err => console.log(err));
          
    else if(this.SelectedSensorType=="FOREST_FIRE") this.sensorService.findSensorByType("fire").subscribe(
            data => {this.sensors=data;
              console.log(data);},
              err => console.log(err));


    else this.ngOnInit();  

 }

 SensorsByStatus(event: any){
  this.SelectedSensorStatus = event.target.value;
  console.log(this.SelectedSensorStatus);
  if(this.SelectedSensorStatus=="ACTIVE") this.sensorService.findSensorByStatus("active").subscribe(
    data => {this.sensors=data;
      console.log(data);},
      err => console.log(err));

   else if(this.SelectedSensorStatus=="DISABLED") this.sensorService.findSensorByStatus("disabled").subscribe(
        data => {this.sensors=data;
          console.log(data);},
          err => console.log(err));
          
    else if(this.SelectedSensorStatus=="SUSPEND") this.sensorService.findSensorByStatus("suspend").subscribe(
            data => {this.sensors=data;
              console.log(data);},
              err => console.log(err));


    else this.ngOnInit();          
 }



RemoveSensor(id){
  let c= confirm("are you sure ?");
    if(!c) return;
    console.log("avant");
    this.sensorService.deleteSensor(id)
      .subscribe(
        data => {
          console.log(data);
          confirm("Sensor Deleted");
          this.ngOnInit();
          
          
        },
        error => {console.log(error);
        confirm("It can be deletd beacause it has his trace on some alerts") });

}


 addNewSensor(newSensor){
  this.sensorService.createSensor(newSensor).subscribe(
      data=> { console.log("2 ",data);
      this.ngOnInit();
      }, 
      err =>{ console.log("Couldn't creat new alert");
  });

}

isAuthenticated(){
  console.log(this.loginService.isAuthenticated());
  return this.loginService.isAuthenticated();
}

changeStateA(id){
  this.sensorService.getSensor(id).subscribe(
    data=>{
     console.log(data);
     let value:any;
     value=data;
     value.state='ACTIVE';
     console.log(value);
     this.sensorService.updateSensor(id,value).subscribe(res => {
       console.log(res);
       this.ngOnInit();
     },

     err=> console.log("error2"))
   }, 
   err=> console.log("error1")
 )
}

changeStateD(id){

  this.sensorService.getSensor(id).subscribe(
    data=>{
     console.log(data);
     let value:any;
     value=data;
     value.state='DISABLED';
     console.log(value);
     this.sensorService.updateSensor(id,value).subscribe(res =>{ console.log(res);
    this.ngOnInit()},
     err=> console.log("error2"))
   }, 
   err=> console.log("error1")
 )
}


changeStateS(id){

  this.sensorService.getSensor(id).subscribe(
    data=>{
     console.log(data);
     let value:any;
     value=data;
     value.state='SUSPEND';
     console.log(value);
     this.sensorService.updateSensor(id,value).subscribe(res => 
      {console.log(res);
        this.ngOnInit();},
     err=> console.log("error2"))
   }, 
   err=> console.log("error1")
 )
}

}

