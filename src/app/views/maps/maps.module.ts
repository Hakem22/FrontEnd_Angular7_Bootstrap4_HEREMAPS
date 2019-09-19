import { NgModule } from '@angular/core';
import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTableModule } from '@angular/material';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
    imports: [
      MapsRoutingModule,
      FormsModule,
      CommonModule,
      CollapseModule.forRoot(),
      MDBBootstrapModule.forRoot(),
      MatTableModule,

 
    ],
    declarations: [ MapsComponent ]
  })
  export class MapsModule { }
  