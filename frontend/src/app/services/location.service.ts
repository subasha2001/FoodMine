import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
  getCurrentLocation(): Observable<LatLngLiteral> {
    return new Observable((observer) => {
      //if any changes here observer informs the Observable
      if (!navigator.geolocation) return    //navigator - part of js

      return navigator.geolocation.getCurrentPosition(
        (pos) => {
          observer.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude          //this part is coming from js
          })
        },
        error => {
          observer.error(error);
        }
      )
    })
  }
}
