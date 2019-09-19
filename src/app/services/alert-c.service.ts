import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AlertCService {

  url="http://localhost:8080";
  constructor(private http: HttpClient, private loginService: LoginService) { }

  public findAllC(): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/alertscitizen',{headers: headers});   
  }

  public findAll(): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alerts',{headers: headers});   
  }
  getAlert(id: number): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alerts/'+id,{headers: headers});
  }

  createAlert(alert: Object): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.post(this.url+'/alertcitizen', alert, {headers: headers});
  }

  updateAlertC(id: number,idAc:number, value: any): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.put(this.url+'/alertcitizen/'+id+'/'+idAc, value, {headers: headers});
  }

  

  deleteAlert(id: number): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.delete(this.url+'/alertall/'+id, {headers: headers, responseType: 'text' });
  }

  findStaless() : Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alertscitizen',{headers: headers});   
  }

  findValid():Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alertscitizen/valid',{headers: headers});   
  }

  public findAllS(): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/alertsensor',{headers: headers});   
  }

  getAlertS(id: number): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alertsensor/'+id,{headers: headers});
  }



  updateAlertS(id:  number,idAc:number, value: any): Observable<Object> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.put(this.url+'/alertsensor/'+id+'/'+idAc, value, {headers: headers});
  }

  deleteAlertS(id: number): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.delete(this.url+'/alertsensor/'+id, {headers: headers, responseType: 'text' });
  }

  findStalessS() : Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alertssensor',{headers: headers});   
  }

  findValidS():Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alertssensor/valid',{headers: headers});   
  }

  findInvalidS():Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alertssensor/invalid',{headers: headers});   
  }

  findInvalidC():Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log("findAll"+ this.loginService.jwt);
    return this.http.get(this.url+'/alertscitizen/invalid',{headers: headers});   
  }

  findAlertSByState(state:any):Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log(state);
    return this.http.get(this.url+'/alertsensor/state/'+state,{headers: headers});   
  }
  findAlertCByState(state:any):Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    console.log(state);
    return this.http.get(this.url+'/alertcitizen/state/'+state,{headers: headers});   
  }

  
  findAlertByTypeC(type:any):Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/alertscitizen/type/'+type,{headers: headers});   
  }

  findAlertByTypeS(type:any):Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/alertsensor/type/'+type,{headers: headers});
}

pushFileToStorage(file: File): Observable<any> {
  const formdata: FormData = new FormData();

  formdata.append('file', file);
  if(this.loginService.jwt==null) this.loginService.loadToken();
  let headers=new HttpHeaders({'Content-Type':'multipart/*'});
  const req = new HttpRequest('POST', this.url+'/api/files', formdata, {
    reportProgress: true,
    responseType: 'text'
  });
  return this.http.post(this.url+'/api/files', formdata);

 // return this.http.request(req);
}

getFile(filename: any): Observable<any> {
  console.log(filename);
  let headers = new HttpHeaders();
  return this.http.get(this.url+'/files/'+filename,{
    observe: 'response',
    responseType: 'blob'});
}

getImage(filename:any):Observable<any>{
  return this.http.get(this.url+'/getimage/'+filename);
}

findAllStatfulC():Observable<any> {
  if(this.loginService.jwt==null) this.loginService.loadToken();
  let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
  return this.http.get(this.url+'/statfulalertscitizen',{headers: headers});   
}

findAllStatfulS():Observable<any> {
  if(this.loginService.jwt==null) this.loginService.loadToken();
  let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
  return this.http.get(this.url+'/statfulalertssensor',{headers: headers});   
}

findAllStatlessC():Observable<any> {
  if(this.loginService.jwt==null) this.loginService.loadToken();
  let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
  return this.http.get(this.url+'/statlessalertscitizen',{headers: headers});   
}

findAllStatlessS():Observable<any> {
  if(this.loginService.jwt==null) this.loginService.loadToken();
  let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
  return this.http.get(this.url+'/statlessalertssensor',{headers: headers});   
}

getTime():Observable<any> {
  if(this.loginService.jwt==null) this.loginService.loadToken();
  let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
  return this.http.get(this.url+'/localtime',{headers: headers});   
}

findbystate(state:any):Observable<any> {
  if(this.loginService.jwt==null) this.loginService.loadToken();
  let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
  return this.http.get(this.url+'/alerts/state/'+state,{headers: headers});   
}
}
