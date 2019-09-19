import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ActeurService } from '../../services/acteur.service';
import { Acteur } from '../../data/acteur';
import { Observable, BehaviorSubject } from 'rxjs';
import { AlertC } from '../../data/alert-c';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: String;
  profile:  Acteur;
  alerts: Observable<any>;

  
  
  constructor(private loginService: LoginService, private acteurService: ActeurService) { }

  ngOnInit() {
    const _this=this;
    this.username=this.loginService.getUsername();
/*
    this.acteurService.findByUsername(this.username).subscribe(data =>{
      console.log(data.id);
      this.profile=data;
        this.acteurService.findAllAlerts(data.id).subscribe(res =>{

          console.log(res);
         },
          err => console.log(err));

   });
    
*/
  }


  isAuthenticated(){
    return this.loginService.isAuthenticated();
  }

 

  
}
