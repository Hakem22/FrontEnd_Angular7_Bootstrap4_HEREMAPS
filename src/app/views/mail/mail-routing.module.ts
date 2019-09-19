import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MailComponent } from './mail.component';

const routes: Routes = [
    {
      path: '',
      component: MailComponent,
      data: {
        title: 'Mail'
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MailRoutingModule {}
  