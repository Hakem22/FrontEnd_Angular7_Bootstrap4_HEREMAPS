import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Acteur } from '../data/acteur';

@Injectable({
  providedIn: 'root'
})
export class ActeurService {
   url="http://localhost:8080";
  constructor(private http: HttpClient, private loginService: LoginService) { }

  public findAll(): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
   let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    //this.http.options('http://localhost:8080/admins',{headers: headers});
    return this.http.get(this.url+'/actors', {headers: headers});   
  }
  public findAllAdmins(): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
   let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    //this.http.options('http://localhost:8080/admins',{headers: headers});
    return this.http.get(this.url+'/admins', {headers: headers});   
  }
  public findAllAgents(): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
   let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    //this.http.options('http://localhost:8080/admins',{headers: headers});
    return this.http.get(this.url+'/agents', {headers: headers});   
  }

 

  getActor(username: any): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/actor/'+username,{headers: headers});
  }

  createAdmin(data): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.post(this.url+'/admin', data,{headers: headers});
  }

  createAgent(data): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.post(this.url+'/agent', data,{headers: headers});
  }

  updateActeur(id: number, value: any): Observable<Object> {
    return this.http.put(this.url+'/acteur/'+id, value);
  }


  deleteActeur(id: number): Observable<any> {
    let headers=new HttpHeaders({'Authorization': 'Bearer ' +this.loginService.jwt});
    return this.http.delete(this.url+'/actor/'+id, {headers: headers, responseType: 'text' });
  }


  findByUsername(username: any):any{
    if(this.loginService.jwt==null) this.loginService.loadToken();
    console.log("halo",username);
   let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/actor/'+username, {headers: headers}); 
  }

  findAllAlertSensor(id: any):Observable<any>{
    if(this.loginService.jwt==null) this.loginService.loadToken();
    console.log('id:', id);
   let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/actor/'+id+'/alertsensor', {headers: headers}); 

  }

  findAllAlertCitizen(id: any):Observable<any>{
    if(this.loginService.jwt==null) this.loginService.loadToken();
    console.log('id:', id);
   let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/actor/'+id+'/alertscitizen', {headers: headers}); 

  }
  findByRole(role:any):Observable<any>{
    if(this.loginService.jwt==null) this.loginService.loadToken();
    console.log('id:', role);
   let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
   if(role="admin") return this.http.get('http://localhost:8080/admins', {headers: headers}); 
   else  return this.http.get(this.url+'/agents', {headers: headers}); 

  }

  SendEmail(email):Observable<any>{
   return this.http.get(this.url+'/simpleemail/'+email); 

  }
}
