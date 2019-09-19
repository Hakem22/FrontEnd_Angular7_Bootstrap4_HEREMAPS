import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class InterventionUnitService {
 
  url="http://localhost:8080";
  constructor(private http: HttpClient, private loginService: LoginService) { }

  public findAll(): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/units',{headers: headers});   
  }

  getUnit(id: number): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/unit/'+id, {headers: headers});

  }

  createUnit(unit: Object): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.post(this.url+'/unit', unit,{headers: headers});
  }

  updateUnit(id: number, value: any): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.put(this.url+'/unit/'+id, value,{headers: headers});
  }

  deleteUnit(id: number): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.delete(this.url+'/unit/'+id,{headers: headers, responseType: 'text' });
  }
  
  findUnitsByType(type:any):Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/unit/unitType/'+type, {headers: headers});
  }

  getnearestunits(al,log,val):Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/nearestunits/coords?al='+al+'&log='+log+'&rayon='+val, {headers: headers});
  }
}
