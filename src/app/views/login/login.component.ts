import { Component,  OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Acteur } from '../../data/acteur';
import { ActeurService } from '../../services/acteur.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{



 private mode=0;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    let token= this.loginService.loadToken();
    this.loginService.initParams();
   // if(token!= null) this.router.navigate(['/actors']);
  }

  checkLogin(data){
    console.log(data);
    this.loginService.login(data).subscribe
    (resp=>{ 
      console.log(resp)
      console.log(resp.headers.get('Authorization'));
      let jwt=resp.headers.get('Authorization');
      let username=this.loginService.getUsername();
      console.log(username);
      this.loginService.saveToken(jwt);
      this.loginService.saveusername(username);
      this.loginService.parseJWT();
      console.log(this.isAdmin());
      this.router.navigate(['/dashboard']);
    }, err=>{
      this.mode=1;
      console.log("error alors");
    })
   
    
    
   

  }

  isAdmin(){
    return this.loginService.isAdmin();
  }
   isUser(){
     return this.loginService.isUser();
   }

 }
