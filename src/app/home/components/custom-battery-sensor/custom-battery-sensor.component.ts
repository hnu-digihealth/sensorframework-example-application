import {Component, NgZone, OnInit} from '@angular/core';
import {SensorFrameworkManager} from 'sensors';

@Component({
  selector: 'app-custom-battery-sensor',
  templateUrl: './custom-battery-sensor.component.html',
  styleUrls: ['./custom-battery-sensor.component.scss'],
})
export class CustomBatterySensorComponent implements OnInit {

  public batteryStatus;

  constructor(private zone: NgZone) {
  }

  ngOnInit() {
    SensorFrameworkManager.start('battery').then(async () => {

      const {data} = await SensorFrameworkManager.get('battery');
      this.batteryStatus = data;

      const callback = batteryState => this.zone.run((status) => {
        this.batteryStatus = status.data;
      }, this, [batteryState]);

      const listener = await SensorFrameworkManager.watch('battery', null , callback);
    });
  }

}
