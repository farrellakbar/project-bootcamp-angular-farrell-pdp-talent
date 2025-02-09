import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";

import { PageTitleModule } from "src/app/shared/page-title/page-title.module";
import { KanbanRoutingModule } from "./kanban-routing.module";
import { KanbanComponent } from "./kanban.component";
import { SortablejsDirective } from "@worktile/ngx-sortablejs";

@NgModule({
  declarations: [KanbanComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    SortablejsDirective,
    PageTitleModule,
    KanbanRoutingModule,
  ],
})
export class KanbanModule {}
