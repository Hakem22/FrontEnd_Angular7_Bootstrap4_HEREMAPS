import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [
      ProfileRoutingModule,
      CollapseModule.forRoot(),
      ProgressbarModule.forRoot(),
      CommonModule,
    ],
    declarations: [ ProfileComponent ]
  })
  export class ProfileModule { }
  