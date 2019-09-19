import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs/public_api';
import { PopoverModule } from 'ngx-bootstrap/popover/public_api';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar/public_api';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FaqRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CollapseModule.forRoot()
  ],
  declarations: [ FaqComponent]
})
export class FaqModule { }
