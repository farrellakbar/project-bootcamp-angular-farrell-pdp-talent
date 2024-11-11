import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitsRoutingModule } from './units-routing.module';
import { UnitsIndexComponent } from './pages/units-index/units-index.component';
import { UnitsCreateComponent } from './pages/units-create/units-create.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    UnitsIndexComponent,
    UnitsCreateComponent

  ],
  imports: [
    CommonModule,
    UnitsRoutingModule,
    PageTitleModule,
    AdvancedTableModule,
    SharedModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class UnitsModule { }
