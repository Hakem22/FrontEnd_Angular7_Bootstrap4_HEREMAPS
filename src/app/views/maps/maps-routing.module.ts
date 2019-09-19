import { Routes, RouterModule } from '@angular/router';
import { MapsComponent } from './maps.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
      path: '',
      component: MapsComponent,
      data: {
        title: 'Maps'
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MapsRoutingModule {}
  