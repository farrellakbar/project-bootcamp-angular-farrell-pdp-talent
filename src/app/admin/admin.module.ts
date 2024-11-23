import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BatchsRoutingModule } from './batchs/batchs-routing.module';
import { UnitsRoutingModule } from './units/units-routing.module';
import { ProgramsRoutingModule } from './programs/programs-routing.module';
import { FinancialsRoutingModule } from './financials/financials-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BatchsRoutingModule,
    UnitsRoutingModule,
    ProgramsRoutingModule,
    FinancialsRoutingModule
  ]
})
export class AdminModule { }
