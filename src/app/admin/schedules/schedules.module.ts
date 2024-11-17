import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesIndexComponent } from './pages/schedules-index/schedules-index.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleEventComponent } from './event/event.component';


@NgModule({
  declarations: [
    SchedulesIndexComponent,
    ScheduleEventComponent,
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    NgbModalModule,
    PageTitleModule,
    SharedModule,
    FormsModule,
    FullCalendarModule,
    SweetAlert2Module
  ]
})
export class SchedulesModule { }
