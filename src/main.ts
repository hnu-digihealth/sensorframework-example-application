import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {defineCustomElements} from 'sensors/loader';
import {SensorFrameworkManager} from 'sensors';
import {Battery} from './app/home/components/custom-battery-sensor/battery.sensor';

if (environment.production) {
  enableProdMode();
}

(async () => await defineCustomElements(window))();
SensorFrameworkManager.registerSensor(Battery);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
