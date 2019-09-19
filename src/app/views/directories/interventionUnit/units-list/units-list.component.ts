import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InterventionUnit } from '../../../../data/intervention-unit';
import { InterventionUnitService } from '../../../../services/intervention-unit.service';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-units-list',
  templateUrl: './units-list.component.html',
  styleUrls: ['./units-list.component.scss']
})
export class UnitsListComponent implements OnInit {

  units: Observable< InterventionUnit[]>;
  SelectedType: String="CIVIL_PROTECTION";
  headElements = ['','INTERVENTION_TYPE','ALTITUDE','LONGITUDE','ADDRESS','DELETE'];
  constructor(private unitService: InterventionUnitService, private loginService: LoginService) { }

  ngOnInit() {
    this.unitService.findAll().subscribe(data => {
      this.units = data,
      console.log(data)},
      err => console.log(err));

     // this.SelectedType="HOSPITALITY";
      //this.UnitsByType();
  }

  addNewUnit(newUnit){

    console.log(newUnit);

    this.unitService.createUnit(newUnit).subscribe(
        data=> { console.log(data);
          if(newUnit.interventionType==this.SelectedType)
          this.UnitsByType2(this.SelectedType);
          else this.ngOnInit();
          //this.ngOnInit();
        }, 
        err =>{ console.log("Couldn't creat new alert");
    });
    
  
  }

  UnitsByType2(Select){
    if(Select=="HOSPITALITY") this.unitService.findUnitsByType("hospitality").subscribe(
      data => {this.units=data;
        console.log(data);},
        err => console.log(err));
  
     else if(Select=="CIVIL_PROTECTION") this.unitService.findUnitsByType("civilprotection").subscribe(
          data => {this.units=data;
            console.log(data);},
            err => console.log(err));
            
    else  if(Select=="POLICE_DIRECTION") this.unitService.findUnitsByType("policedirection").subscribe(
              data => {this.units=data;
                console.log(data);},
                err => console.log(err));
      
    else if(Select=="GENDARMERIE") this.unitService.findUnitsByType("gendarmerie").subscribe(
           data => {this.units=data;
                console.log(data);},
                err => console.log(err));
  
  
      else this.ngOnInit();          
   
  }

  UnitsByType(event){
  this.SelectedType = event.target.value;
  console.log(event);
  console.log(this.SelectedType);
    if(this.SelectedType=="HOSPITALITY") this.unitService.findUnitsByType("hospitality").subscribe(
      data => {this.units=data;
        console.log(data);},
        err => console.log(err));
  
     else if(this.SelectedType=="CIVIL_PROTECTION") this.unitService.findUnitsByType("civilprotection").subscribe(
          data => {this.units=data;
            console.log(data);},
            err => console.log(err));
            
    else  if(this.SelectedType=="POLICE_DIRECTION") this.unitService.findUnitsByType("policedirection").subscribe(
              data => {this.units=data;
                console.log(data);},
                err => console.log(err));
      
    else if(this.SelectedType=="GENDARMERIE") this.unitService.findUnitsByType("gendarmerie").subscribe(
           data => {this.units=data;
                console.log(data);},
                err => console.log(err));
  
  
      else this.ngOnInit();          
   }


  deleteUnit(id: number, type:any) {
    let c= confirm("are you sure ?");
    if(!c) return;
    console.log("avant");
    this.unitService.deleteUnit(id)
      .subscribe(
        data => {
          console.log(data);
          confirm("Intervention unit Deleted");
          console.log(type);
          this.UnitsByType2(type);            
        },
        error => {console.log(error);
        confirm("It couldn't been deleted") });
  }

  editField: any;
  changeValue(id: number, property: string, event: any) {
    console.log("id", id);
    
    this.editField = event.target.textContent;
  }
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
  this.unitService.getUnit(id).subscribe(
    data=>{
      console.log(data);
      let value=data;
      value[property]=editField;
      console.log(value);
      this.unitService.updateUnit(id,value).subscribe(res => console.log(res),
      err=> console.log("error2"))
    }, 
    err=> console.log("error1")
  )
  }
 
  isAuthenticated(){
    console.log(this.loginService.isAuthenticated());
    return this.loginService.isAuthenticated();
  }

}
