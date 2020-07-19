import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HeartRateComponent} from './components/heart-rate/heart-rate.component';
import {GeolocationComponent} from './components/geolocation/geolocation.component';

import { HomePage } from './home.page';
import {CustomBatterySensorComponent} from './components/custom-battery-sensor/custom-battery-sensor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
      HomePage,
      HeartRateComponent,
      GeolocationComponent,
      CustomBatterySensorComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
