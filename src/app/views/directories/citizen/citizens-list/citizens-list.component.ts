import { Component, OnInit } from '@angular/core';
import { Citizen } from '../../../../data/citizen';
import { Observable } from 'rxjs';
import { CitizenService } from '../../../../services/citizen.service';
import { LoginService } from '../../../../services/login.service';
import { AlertC } from '../../../../data/alert-c';

@Component({
  selector: 'app-citizens-list',
  templateUrl: './citizens-list.component.html',
  styleUrls: ['./citizens-list.component.scss']
})
export class CitizensListComponent implements OnInit {

  citizens: Observable< Citizen[]>;
  alerts: Observable< AlertC[]>;
  selectedAlertState: String="ALL";
  selectedAlertType : String ="ALL";

  headElements = ['', 'FIRSTNAME', 'LASTNAME','PHONE','ALERTS'];
  constructor(private citizenService: CitizenService, private loginService: LoginService) { }

  ngOnInit() {
    this.citizenService.findAll().subscribe(data => {
      this.citizens = data;
      console.log(data)},
      err=>console.log(err));
  }

 


  CitizensByAlertState(event){
    this.selectedAlertState = event.target.value;
    if(this.selectedAlertState =="VALID") this.citizenService.findCitizenByAlertState("valide").subscribe(
      data => {this.citizens=data;
        console.log(data);},
        err => console.log(err));
  
    else  if(this.selectedAlertState =="INVALID") this.citizenService.findCitizenByAlertState("invalide").subscribe(
          data => {this.citizens=data;
            console.log(data);},
            err => console.log(err));
  
  
      else this.ngOnInit();          
   }

   CitizensByAlertType(event: any){
    this.selectedAlertType = event.target.value;
    if(this.selectedAlertType =="FIRE") this.citizenService.findCitizenByAlertType("fire").subscribe(
      data => {this.citizens=data;
        console.log(data);},
        err => console.log(err));
  
    else  if(this.selectedAlertType =="FLOOD") this.citizenService.findCitizenByAlertType("flood").subscribe(
          data => {this.citizens=data;
            console.log(data);},
            err => console.log(err));

    else if(this.selectedAlertType =="ACCIDENT") this.citizenService.findCitizenByAlertType("accident").subscribe(
          data => {this.citizens=data;
            console.log(data);},
            err => console.log(err));
    
    else if(this.selectedAlertType =="EARTHEQUAKE") this.citizenService.findCitizenByAlertType("earthquack").subscribe(
              data => {this.citizens=data;
                console.log(data);},
                err => console.log(err));
  
  
    else   if(this.selectedAlertType =="AGGRESSION") this.citizenService.findCitizenByAlertType("aggression").subscribe(
           data => {this.citizens=data;
                    console.log(data);},
                    err => console.log(err));
      else this.ngOnInit();          
   }
  


  isAuthenticated(){
    console.log(this.loginService.isAuthenticated());
    return this.loginService.isAuthenticated();
  }
}
