import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialsRoutingModule } from './financials-routing.module';
import { FinancialsIndexComponent } from './pages/financials-index/financials-index.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FinancialsDetailComponent } from './pages/financials-detail/financials-detail.component';


@NgModule({
  declarations: [
    FinancialsIndexComponent,
    FinancialsDetailComponent
  ],
  imports: [
    CommonModule,
    FinancialsRoutingModule,
    PageTitleModule,
    AdvancedTableModule,
    SharedModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class FinancialsModule { }
