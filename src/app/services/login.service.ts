import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class 
LoginService {
 url="http://localhost:8080";
  jwt: string;
  username: string;
  roles: Array<any>=[];

  constructor(private http: HttpClient) { }


  login(data){
    this.username=data.username;
    console.log("1", this.username);
    return this.http.post(this.url+'/login', data, {observe: 'response'});
  
  }

  saveToken(jwt: string){
    localStorage.setItem('token', jwt);
    this.jwt=jwt;
    this.parseJWT();

  }

  parseJWT(){
    let jwtHelper= new JwtHelperService()
    let jwtObj= jwtHelper.decodeToken(this.jwt);
    this.roles=jwtObj.roles;
  }
  saveusername(username: string){
    localStorage.setItem('username', username);
    this.username=username;
  }

  loadToken(){
    this.jwt= localStorage.getItem('token');
    return this.jwt;
  }

  isAdmin(){
    for(let r of this.roles){
      if(r=='ADMIN') return true;
    }
    return false;
  }
  isUser(){
    for(let r of this.roles){
      if(r=='USER') return true;
    }
    return false;
  }

  isAuthenticated(){
    return this.isAdmin() || this.isUser();
  }

  logout(){
    localStorage.removeItem('token');
    this.initParams();
    
  }
  initParams(){
    this.jwt=undefined;
    this.username=undefined;
    this.roles=undefined;
  }

  getUsername(){
    this.username=localStorage.getItem('username');
    console.log("2",this.username);
    return this.username;
  }

  getId(){
    
  }
}
