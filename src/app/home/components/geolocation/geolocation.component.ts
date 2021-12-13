import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import {GeolocationData} from 'sensors/dist/types/core/sensors/other/geolocation/geolocation.data';
import {SensorFrameworkManager as SFM} from 'sensors';
import {SensorListenerHandle} from 'sensors/dist/types/core/sensors/sensor';

declare var google;

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss'],
})
export class GeolocationComponent implements AfterViewInit, OnDestroy {

  private static SENSOR_NAME = 'geolocation';
  private position: GeolocationData;
  private listener: SensorListenerHandle;
  private options = {
    enableHighAccuracy: true,
    requireAltitude: true,
  };

  private map: any;

  private marker: any;

  @ViewChild('map', {static: true}) mapRef: ElementRef;

  async getGeolocation(): Promise<GeolocationData> {
    const {data} = await SFM.get(GeolocationComponent.SENSOR_NAME, this.options);
    return data;
  }

  async watchGeolocation(): Promise<SensorListenerHandle> {
    const callback = (measurement) => {
      const {data} = measurement;
      this.position = data;
      this.setMarker();
      this.centerMap();
    };

    return await SFM.watch(
        GeolocationComponent.SENSOR_NAME,
        this.options,
        callback
    );
  }

  private setMarker() {
    this.marker.setMap(null);

    const position = {
      lat: this.position.latitude,
      lng: this.position.longitude
    };

    this.marker = new google.maps.Marker({position, map: this.map});
  }

  private centerMap() {
    this.map.setCenter(this.marker.getPosition());
  }

  async ngAfterViewInit() {

    await SFM.start(GeolocationComponent.SENSOR_NAME);
    this.position = await this.getGeolocation();
    this.listener = await this.watchGeolocation();

    const position = {
      lat: this.position.latitude,
      lng: this.position.longitude
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      center: position,
      zoom: 12,
      disableDefaultUI: true,
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position,
    });

  }

  async ngOnDestroy(): Promise<void> {
    this.listener.remove();
    await SFM.stop(GeolocationComponent.SENSOR_NAME);
  }
}
