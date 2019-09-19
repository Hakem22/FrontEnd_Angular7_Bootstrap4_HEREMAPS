import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class SensorService {

  url="http://localhost:8080";
  constructor(private http: HttpClient, private loginService: LoginService) { }

  public findAll(): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/sensors',{headers: headers});   
  }

  getSensor(id: number): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/sensor/'+id, {headers: headers});
  }

  createSensor(sensor: Object): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.post(this.url+'/sensor', sensor, {headers: headers});
  }

  updateSensor(id: number, value: any): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.put(this.url+'/sensor/'+id, value,{headers: headers});
  }

  deleteSensor(id: number): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.delete(this.url+'/sensor/'+id, {headers: headers, responseType: 'text' });
  }

  findAllAlerts(id: any):Observable<any>{
    if(this.loginService.jwt==null) this.loginService.loadToken();
    console.log('id:', id);
   let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/sensor/'+id+'/alerts/', {headers: headers}); 

  }
  findSensorByType(type:any):Observable<any>{
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/sensor/type/'+type,{headers: headers});

  }
  findSensorByStatus(status:any):Observable<any>{
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/sensor/status/'+status, {headers: headers});

  }
}
