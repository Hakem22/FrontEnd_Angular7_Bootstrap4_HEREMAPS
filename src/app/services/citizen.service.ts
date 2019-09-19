import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {
  url="http://localhost:8080";
  constructor(private http: HttpClient, private loginService: LoginService) { }

  public findAll(): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/citizens',{headers: headers});   
  }

  getCitizen(id: number): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/citizen/'+id, {headers: headers});
  }

  createCitizen(citizen: Object): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.post(this.url+'/citizen', citizen, {headers: headers});
  }


  deleteCitizen(id: number): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.delete(this.url+'/citizen/'+id, {headers: headers, responseType: 'text' });
  }

  findAllAlerts(id: any):Observable<any>{
    if(this.loginService.jwt==null) this.loginService.loadToken();
    console.log('id:', id);
   let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/citizen/'+id+'/alerts', {headers: headers}); 

  }

  findCitizenByAlertState(state: any):Observable<any>{
    if(this.loginService.jwt==null) this.loginService.loadToken();
    console.log('state:', state);
   let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/citizen/alertState/'+state, {headers: headers}); 
  }

  findCitizenByAlertType(type: any):Observable<any>{
    if(this.loginService.jwt==null) this.loginService.loadToken();
    console.log('id:', type);
   let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/citizen/alertType/'+type, {headers: headers}); 
  }

}
