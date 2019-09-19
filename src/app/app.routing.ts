import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { ActeursListComponent } from './views/directories/acteur/acteurs-list/acteurs-list.component'
import { PasswordForgotComponent } from './views/password-forgot/password-forgot.component';
import { LockScreenComponent } from './views/lock-screen/lock-screen.component';
import { SensorsListComponent } from './views/directories/sensor/sensors-list/sensors-list.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'passwordforgot',
    component: PasswordForgotComponent,
    data: {
      title: 'Password Recuperation Page'
    }
  },
  {
    path: 'lockscreen',
    component: LockScreenComponent,
    data: {
      title: 'Lock Screen Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home '
    },
    children: [
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'calender',
        loadChildren: './views/calender/calender.module#CalenderModule'
      },
      {
        path: 'faq',
        loadChildren: './views/faq/faq.module#FaqModule'
      },
      {
        path: 'maps',
        loadChildren: './views/maps/maps.module#MapsModule'
      },
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule'
      },
      {
        path: 'mails',
        loadChildren: './views/mail/mail.module#MailModule'
      },
      {
        path: 'settings',
        loadChildren: './views/settings/setting.module#SettingsModule'
      },
      {
        path: 'directories',
        loadChildren: './views/directories/directories.module#DirectoriesModule'
      },
      
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
