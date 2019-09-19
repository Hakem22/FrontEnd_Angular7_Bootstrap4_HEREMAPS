
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalenderComponent } from './calender.component';

const routes: Routes = [
    {
      path: '',
      component: CalenderComponent,
      data: {
        title: 'Calender'
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CalenderRoutingModule {}
  