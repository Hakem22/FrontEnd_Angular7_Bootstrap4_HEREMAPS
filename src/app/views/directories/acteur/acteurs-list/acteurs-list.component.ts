import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Acteur } from '../../../../data/acteur';
import { ActeurService } from '../../../../services/acteur.service';
import { LoginService } from '../../../../services/login.service';
import { Router } from '@angular/router';
import { AlertS } from '../../../../data/alert-s';

@Component({
  selector: 'app-acteurs-list',
  templateUrl: './acteurs-list.component.html',
  styleUrls: ['./acteurs-list.component.scss']
})
export class ActeursListComponent implements OnInit {

 acteurs: Observable<Acteur[]>;
 selectedRole: String;
 selectedRole2: String;
 hisAlerts: Observable<AlertS[]>;


 constructor(private router: Router, private acteurService: ActeurService, private loginService: LoginService) { }

  ngOnInit() {
    this.acteurService.findAll().subscribe(data => {
      this.acteurs = data;
    console.log(data)},
      err=>{
      console.log(err);
      });

   
  }

  deleteActeur(id: number) {
    let c= confirm("are you sure ?");
    if(!c) return;
    console.log("avant");
    this.acteurService.deleteActeur(id)
      .subscribe(
        data => {
          console.log(data);
          confirm("Actor Deleted");
          this.ngOnInit();
          
          
        },
        error => {console.log(error);
        confirm("It can be deletd beacause it has his trace on some alerts") });
  }

  isAdmin(){
    console.log(this.loginService.isAdmin());
    return this.loginService.isAdmin();
  }


//Add New Acteur
  addNewActeur(actor){
    console.log(this.selectedRole2);
    console.log(actor);
    if(this.selectedRole2=="ADMIN"){
        this.acteurService.createAdmin(actor).subscribe(
            data=> { 
               console.log(data);
            }, 
            err =>{ console.log("Couldn't creat new Admin");
        });}
    else 
    this.acteurService.createAgent(actor).subscribe(
      data=> { 
         console.log(data);
      }, 
      err =>{ console.log("Couldn't creat new Manager");
  });

  }
  selectRole(event){
    this.selectedRole2 = event.target.value; 
  }
//Display Actors by selected creteria
  DisplayBySelected(event: any){
    this.selectedRole = event.target.value;
    console.log(this.selectedRole);
    if(this.selectedRole=="MANAGER") this.acteurService.findAllAgents().subscribe(
      data=> {this.acteurs=data; console.log("1",data)},
      err => console.log(err));
    else if(this.selectedRole=="ADMIN")  this.acteurService.findAllAdmins().subscribe(
      data=> {this.acteurs=data; console.log("2", data)},
      err => console.log(err));
    else this.ngOnInit();

  }

 

 

}
