import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-donde-comprar',
  templateUrl: './donde-comprar.page.html',
  styleUrls: ['./donde-comprar.page.scss'],
})
export class DondeComprarPage implements OnInit {
  map: L.Map | null = null;
  latitude: number = 0;
  longitude: number = 0;

  constructor() { }

  async ngOnInit() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;

      this.loadMap();
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  loadMap() {
    if (this.latitude !== 0 && this.longitude !== 0) {
      this.map = L.map('mapId').setView([this.latitude, this.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      L.marker([this.latitude, this.longitude]).addTo(this.map)
        .bindPopup('Estás aquí')
        .openPopup();
    }
  }
}