import { NgModule } from '@angular/core';
import { CalenderComponent } from './calender.component';
import { CalenderRoutingModule } from './calender-routing.module';

@NgModule({
    imports: [
      CalenderRoutingModule,
    ],
    declarations: [ CalenderComponent ]
  })
  export class CalenderModule { }
  