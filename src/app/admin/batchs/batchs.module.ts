import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchsRoutingModule } from './batchs-routing.module';
import { SharedModule } from 'src/app/apps/email/shared/shared.module';
import { BatchsIndexComponent } from './pages/batchs-index/batchs-index.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { BatchsCreateComponent } from './pages/batchs-create/batchs-create.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    BatchsIndexComponent, 
    BatchsCreateComponent
  ],
  imports: [
    CommonModule,
    BatchsRoutingModule,
    PageTitleModule,
    AdvancedTableModule,
    SharedModule,
    FormsModule,
    SweetAlert2Module,
  ]
})
export class BatchsModule { }
