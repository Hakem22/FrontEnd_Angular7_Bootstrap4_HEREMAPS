import { NgModule } from '@angular/core';
import { SettingsdRoutingModule } from './settings-routing.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons/public_api';
import { SettingsComponent } from './settings.component';

@NgModule({
    imports: [
        SettingsdRoutingModule,
    ],
    declarations: [ SettingsComponent]
})
export class SettingsModule { }