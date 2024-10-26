import { Component } from "@angular/core";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";

@Component({
  selector: "app-email-templates",
  templateUrl: "./email-templates.component.html",
  styleUrl: "./email-templates.component.scss",
})
export class EmailTemplatesComponent {
  pageTitle: BreadcrumbItem[] = [];
}
