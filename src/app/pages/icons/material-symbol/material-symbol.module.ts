import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageTitleModule } from "src/app/shared/page-title/page-title.module";
import { MaterialSymbolComponent } from "./material-symbol.component";
import { MaterialRoutingModule } from "./material-routing.module";

@NgModule({
  declarations: [MaterialSymbolComponent],
  imports: [CommonModule, PageTitleModule, MaterialRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MaterialModule {}
