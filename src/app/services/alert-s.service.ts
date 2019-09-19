import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AlertSService {
 url="http://localhost:8080"
  constructor(private http: HttpClient, private loginService: LoginService) { }

  public findAll(): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alertsensor',{headers: headers});   
  }

  getAlert(id: number): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alertsensor/'+id,{headers: headers});
  }

  createAlert(alert: Object): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.post(this.url+'/alertsensor', alert, {headers: headers});
  }

  updateAlert(id: number, value: any): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.put(this.url+'/alertsensor/'+id, value, {headers: headers});
  }

  deleteAlert(id: number): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.delete(this.url+'/alertsensor/'+id, {headers: headers, responseType: 'text' });
  }

  findStaless() : Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alertssensor',{headers: headers});   
  }

  findValid():Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alertssensor/valid',{headers: headers});   
  }

}
