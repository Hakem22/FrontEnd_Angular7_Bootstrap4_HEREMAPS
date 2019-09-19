import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<any> {
    return this.http.get('http://localhost:8080/interventions');   
  }

  getUnit(id: number): Observable<Object> {
    return this.http.get('http://localhost:8080/intervention/'+id);
  }

  createUnit(unit: Object): Observable<Object> {
    return this.http.post('http://localhost:8080/intervention', unit);
  }

  updateUnit(id: number, value: any): Observable<Object> {
    return this.http.put('http://localhost:8080/intervention/'+id, value);
  }

  deleteUnit(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/intervention/'+id, { responseType: 'text' });
  }

  
}
