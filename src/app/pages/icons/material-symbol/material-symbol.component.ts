import { Component, OnInit } from "@angular/core";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";
import { MATERIALSYMBOL } from "./data";

@Component({
  selector: "app-material-symbol",
  templateUrl: "./material-symbol.component.html",
  styles: ``,
})
export class MaterialSymbolComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  materialSymbol = MATERIALSYMBOL;

  ngOnInit(): void {
    this.pageTitle = [
      { label: "Icons", path: "/" },
      {
        label: "Material Symbols Icons (Google Icon)",
        path: "/",
        active: true,
      },
    ];
  }
}
