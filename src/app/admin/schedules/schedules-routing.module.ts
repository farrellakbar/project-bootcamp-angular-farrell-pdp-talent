import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulesIndexComponent } from './pages/schedules-index/schedules-index.component';

const routes: Routes = [{
  path: '',
  component: SchedulesIndexComponent  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRoutingModule { }
