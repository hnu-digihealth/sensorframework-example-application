import {AfterViewInit, Component, ContentChild, ElementRef, ViewChild} from '@angular/core';
import {SensorFrameworkManager} from 'sensors';
import {BleHeartRateData} from 'sensors/dist/types/core/sensors/external/bluetooth-low-energy/ble-heart-rate/ble-heart-rate.data';
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  @ViewChild('map', {static: true}) mapRef: ElementRef;

  heartRate: BleHeartRateData;

  constructor() {}

  setHeartRate(event) {
    console.log("TRIGGER")
    const {detail} = event;
    this.heartRate = detail.data;

  }
}
