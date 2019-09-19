import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActeursListComponent } from './acteur/acteurs-list/acteurs-list.component';
import { AlertscitizenListComponent } from './alertsC/alertscitizen-list/alertscitizen-list.component';
import { CitizensListComponent } from './citizen/citizens-list/citizens-list.component';
import { SensorsListComponent } from './sensor/sensors-list/sensors-list.component';
import { UnitsListComponent } from './interventionUnit/units-list/units-list.component';
import { GetitsAlertsComponent } from './getits-alerts/getits-alerts.component';
import { GetcitizenAlertsComponent } from './getcitizen-alerts/getcitizen-alerts.component';
import { GetactorAlertsComponent } from './getactor-alerts/getactor-alerts.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Directories'
    },
    children: [
      {
        path: '',
        redirectTo: 'actors'
      },
      {
        path: 'actors',
        component: ActeursListComponent,
        data: {
          title: 'Actors'
        }
      },
      {
        path: 'alerts',
        component: AlertscitizenListComponent,
        data: {
          title: 'Alerts'
        }
      },
      {
        path: 'citizens',
        component: CitizensListComponent,
        data: {
          title: 'Citizens'
        }
      },
      {
        path: 'sensors',
        component: SensorsListComponent,
        data: {
          title: 'Sensor'
        }
      },
      {
        path: 'units',
        component: UnitsListComponent,
        data: {
          title: 'Intervention Unit'
        }
      },
      {
        path: 'getthissensoralerts/:id',
        component: GetitsAlertsComponent,
        data: {
          title: 'Alerts Send By Selected Sensor'
        }
      },
      {
        path: 'getthiscitizenalerts/:id',
        component: GetcitizenAlertsComponent,
        data: {
          title: 'Alerts Send By Selected Citizen'
        }
      },
      {
        path: 'getthisactoralerts/:id',
        component: GetactorAlertsComponent,
        data: {
          title: 'Alerts Traited By Selected Actor'
        }
      },
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectoriesRoutingModule {}
