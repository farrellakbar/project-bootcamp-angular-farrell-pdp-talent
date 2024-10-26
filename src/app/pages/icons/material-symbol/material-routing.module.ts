import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaterialSymbolComponent } from "./material-symbol.component";
const routes: Routes = [{ path: "", component: MaterialSymbolComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule {}
