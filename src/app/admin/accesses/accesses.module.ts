import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessesRoutingModule } from './accesses-routing.module';
import { BatchsIndexComponent } from '../batchs/pages/batchs-index/batchs-index.component';
import { BatchsCreateComponent } from '../batchs/pages/batchs-create/batchs-create.component';
import { PageTitleComponent } from 'src/app/shared/page-title/page-title.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { AccessesIndexComponent } from './pages/accesses-index/accesses-index.component';
import { AccessesCreateComponent } from './pages/accesses-create/accesses-create.component';


@NgModule({
  declarations: [
    AccessesIndexComponent,
    AccessesCreateComponent
  ],
  imports: [
    CommonModule,
    AccessesRoutingModule,
    PageTitleModule,
    AdvancedTableModule,
    SharedModule,
    FormsModule,
    SweetAlert2Module,
  ]
})
export class AccessesModule { }
