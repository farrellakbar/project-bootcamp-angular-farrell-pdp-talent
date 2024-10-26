import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageTitleModule } from "src/app/shared/page-title/page-title.module";
import { GoogleMapRoutingModule } from "./google-map-routing.module";
import { GoogleMapComponent } from "./google-map.component";
import { GoogleMapsModule } from "@angular/google-maps";

@NgModule({
    declarations: [GoogleMapComponent],
    imports: [
        CommonModule,
        PageTitleModule,
        GoogleMapsModule,
        GoogleMapRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        GoogleMapComponent
    ]
})
export class GoogleMapModule {}
