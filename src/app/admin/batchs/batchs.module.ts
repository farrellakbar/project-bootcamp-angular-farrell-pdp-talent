import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchsRoutingModule } from './batchs-routing.module';
import { SharedModule } from 'src/app/apps/email/shared/shared.module';
import { BatchsIndexComponent } from './pages/batchs-index/batchs-index.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';


@NgModule({
  declarations: [
    BatchsIndexComponent,
  ],
  imports: [
    CommonModule,
    BatchsRoutingModule,
    PageTitleModule,
    AdvancedTableModule,
    SharedModule
  ]
})
export class BatchsModule { }
