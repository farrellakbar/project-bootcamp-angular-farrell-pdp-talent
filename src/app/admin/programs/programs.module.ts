import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsIndexComponent } from './pages/programs-index/programs-index.component';
import { ProgramsCreateComponent } from './pages/programs-create/programs-create.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    ProgramsIndexComponent,
    ProgramsCreateComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    PageTitleModule,
    AdvancedTableModule,
    SharedModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class ProgramsModule { }
