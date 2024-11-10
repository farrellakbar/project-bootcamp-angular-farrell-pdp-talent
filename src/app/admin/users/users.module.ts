import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersIndexComponent } from './pages/users-index/users-index.component';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';


@NgModule({
  declarations: [
    UsersIndexComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageTitleModule,
    AdvancedTableModule,
    SharedModule
  ]
})
export class UsersModule { }
