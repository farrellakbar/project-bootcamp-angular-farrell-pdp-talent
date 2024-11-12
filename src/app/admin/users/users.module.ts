import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersIndexComponent } from './pages/users-index/users-index.component';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { UsersCreateComponent } from './pages/users-create/users-create.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    UsersIndexComponent,
    UsersCreateComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageTitleModule,
    AdvancedTableModule,
    SharedModule,
    FormsModule,
    SweetAlert2Module

  ]
})
export class UsersModule { }
