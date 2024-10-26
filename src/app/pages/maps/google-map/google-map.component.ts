import { Component, OnInit } from "@angular/core";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";
import { DARKSTYLES, LIGHTSTYLES } from "./data";
import { MapConfig } from "./google-map.model";

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  };
}
@Component({
  selector: "app-google-map",
  templateUrl: "./google-map.component.html",
  styleUrls: ["./google-map.component.scss"],
})
export class GoogleMapComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];

  longitude = 20.728218;
  latitude = 52.128973;
  zoom: number = 15;

  ngOnInit(): void {
    this.pageTitle = [
      { label: "Maps", path: "/" },
      { label: "Google Maps", path: "/", active: true },
    ];
  }
  mapOptions: google.maps.MapOptions = {
    center: { lat: 48.8588548, lng: 2.347035 },
    zoom: 13,
  };

  markers: MarkerProperties[] = [
    { position: { lat: 48.8584, lng: 2.2945 } },
    { position: { lat: 48.8606, lng: 2.3376 } },
    { position: { lat: 48.853, lng: 2.3499 } },
  ];
}
