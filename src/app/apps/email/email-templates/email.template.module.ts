import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { QuillModule } from "ngx-quill";
import { PageTitleModule } from "src/app/shared/page-title/page-title.module";
import { FormsModule } from "@angular/forms";
import { EmailTemplatesComponent } from "./email-templates.component";
import { EmailTemplateRoutingModule } from "./email-template-routing.module";

@NgModule({
  declarations: [EmailTemplatesComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuillModule,
    PageTitleModule,
    SharedModule,
    EmailTemplateRoutingModule,
  ],
})
export class EmailTemplateModule {}
