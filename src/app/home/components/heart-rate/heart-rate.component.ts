import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heart-rate',
  templateUrl: './heart-rate.component.html',
  styleUrls: ['./heart-rate.component.scss'],
})
export class HeartRateComponent {

  public heartRateMeasurement;

  setHeartRate(event) {
    const {data} = event.detail;
    this.heartRateMeasurement = data.processed;
  }

}
