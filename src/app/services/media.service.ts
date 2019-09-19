import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class MediaService {

  url="http://localhost:8080";
  constructor(private http: HttpClient, private loginService: LoginService) { }

  public findAll(): Observable<any> {
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/medias', {headers: headers});   
  }

  getMedia(id: number): Observable<Object> {
    return this.http.get(this.url+'/media/'+id);
  }

  createMedia(media: Object): Observable<Object> {
    return this.http.post(this.url+'/media', media);
  }

  updateMedia(id: number, value: any): Observable<Object> {
    return this.http.put(this.url+'/media/'+id, value);
  }

  deleteMedia(id: number): Observable<any> {
    return this.http.delete(this.url+'/media/'+id, { responseType: 'text' });
  }

  getUri(id: number):Observable<any>{
    if(this.loginService.jwt==null) this.loginService.loadToken();
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' +this.loginService.jwt});
    return this.http.get(this.url+'/uri/'+id, {headers: headers}); 
  }
}
