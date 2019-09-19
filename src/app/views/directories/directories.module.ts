import { NgModule } from '@angular/core';
import { ActeursListComponent } from './acteur/acteurs-list/acteurs-list.component';
import { SensorsListComponent } from './sensor/sensors-list/sensors-list.component';
import { UnitsListComponent } from './interventionUnit/units-list/units-list.component';
import { CitizensListComponent } from './citizen/citizens-list/citizens-list.component';
import { AlertscitizenListComponent } from './alertsC/alertscitizen-list/alertscitizen-list.component';
import { AlertssensorListComponent } from './alertsS/alertssensor-list/alertssensor-list.component';
import { DirectoriesRoutingModule } from './directories-routing.module';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatTableModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { GetitsAlertsComponent } from './getits-alerts/getits-alerts.component';
import { GetcitizenAlertsComponent } from './getcitizen-alerts/getcitizen-alerts.component';
import { GetactorAlertsComponent } from './getactor-alerts/getactor-alerts.component';


@NgModule({
    imports: [
      DirectoriesRoutingModule,
      FormsModule,
      CommonModule,
      MDBBootstrapModule.forRoot(),
      MatTableModule,
      CollapseModule.forRoot(),

      
    ],
    declarations: [ 
    ActeursListComponent,
    AlertscitizenListComponent,
    CitizensListComponent,
    SensorsListComponent,
    UnitsListComponent,
    AlertssensorListComponent,
    GetitsAlertsComponent,
    GetcitizenAlertsComponent,
    GetactorAlertsComponent
   
    ]
  })
  export class DirectoriesModule { }
  