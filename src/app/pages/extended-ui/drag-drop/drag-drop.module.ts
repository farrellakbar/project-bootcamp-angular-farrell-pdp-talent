import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DragDropRoutingModule } from "./drag-drop-routing.module";
import { DragDropComponent } from "./drag-drop.component";
import { PageTitleModule } from "src/app/shared/page-title/page-title.module";
import { SortablejsDirective } from "@worktile/ngx-sortablejs";

@NgModule({
  declarations: [DragDropComponent],
  imports: [
    CommonModule,
    SortablejsDirective,
    PageTitleModule,
    DragDropRoutingModule,
  ],
})
export class DragDropModule {}
