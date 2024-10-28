import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  // OPEN PAGE DASHBOARD INDEX
    { 
      path: '', 
      component: DashboardComponent 
    },
  // CLOSE PAGE DASHBOARD INDEX
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
