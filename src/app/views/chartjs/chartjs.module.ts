import { NgModule } from '@angular/core';

import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    CommonModule
  ],
  declarations: [ ChartJSComponent ]
})
export class ChartJSModule { }
