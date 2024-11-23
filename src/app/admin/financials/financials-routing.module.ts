import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialsIndexComponent } from './pages/financials-index/financials-index.component';

const routes: Routes = [{
  path: '',
  component: FinancialsIndexComponent  
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialsRoutingModule { }
