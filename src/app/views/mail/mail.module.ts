import { NgModule } from '@angular/core';
import { MailRoutingModule } from './mail-routing.module';
import { MailComponent } from './mail.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
     MailRoutingModule,
     CommonModule,
    ],
    declarations: [ MailComponent ]
  })
  export class MailModule { }
  