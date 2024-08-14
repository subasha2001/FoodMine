import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { icon, LatLng, latLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from '../../../services/location.service';
import { Order } from '../../../shared/models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnChanges{

  constructor(private locationservice:LocationService){}

  @Input()order!:Order;
  @Input()readonly = false;

  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42,42],
    iconAnchor:[21,42]
  });

  private readonly DEFAULT_LATLNG:LatLngTuple = [13.75, 21.62];

  @ViewChild('map', { static: true })mapRef!: ElementRef;   //true- makes available in ngoninit

  map!:Map;   //from leaflet(this is map type)
  currentMarker!:Marker;

  ngOnChanges(): void {    //oninit will be triggered before the new order coming from the server
    if(!this.order) return;
    this.initializeMap()
    
    if(this.readonly && this.addressLatLng){
      this.addressLatLng;
      this.showLocationOnReadonlyMode();
    }
  }
  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);
    
    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable;
  }

  initializeMap(){
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement, {    //this is for creating the map
      attributionControl: false                    //we will not see the leaflet on the bottomright of the map
    }).setView(this.DEFAULT_LATLNG,1);             //1 - zoom level(whole world)

    //titlelayer - we use it for default tiles
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png') //fn from leaflet  //open street map
    .addTo(this.map);

    this.map.on('click', (e:LeafletMouseEvent)=>{
      this.setMarker(e.latlng);
    })
  }

  findMyLocation(){
    this.locationservice.getCurrentLocation().subscribe({
      next: (latlng)=>{
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      }
    })
  }

  setMarker(latlng:LatLngExpression){

    this.addressLatLng = latlng as LatLng;

    if(this.currentMarker){
      this.currentMarker.setLatLng(latlng);
      return
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend', ()=>{
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }
  

  set addressLatLng(latlng:LatLng){                       //set - we can set value instead of calling this fn    
    if(!latlng.lat.toFixed) return;                       //if guard
    
    latlng.lat = parseFloat(latlng.lat.toFixed(8));       //8 floating points for mongodb
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
  }
  get addressLatLng(){
    return this.order.addressLatLng!;    
  }
}
