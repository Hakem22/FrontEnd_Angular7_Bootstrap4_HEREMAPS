import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import {FileUploadModule} from 'ng2-file-upload';
import { OutputGraphComponent } from '../../output-graph/output-graph.component';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ButtonsModule.forRoot(),
    FileUploadModule,
  
  ],
  declarations: [ DashboardComponent,
    OutputGraphComponent,
   ]
})
export class DashboardModule { }
