import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Profile } from 'selenium-webdriver/firefox';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
    {
      path: '',
      component: ProfileComponent,
      data: {
        title: 'Profile'
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProfileRoutingModule {}
  