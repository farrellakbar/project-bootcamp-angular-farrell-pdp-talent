import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialsIndexComponent } from './pages/financials-index/financials-index.component';
import { FinancialsDetailComponent } from './pages/financials-detail/financials-detail.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialsIndexComponent  
  },
  {
    path: 'detail/:id',
    component: FinancialsDetailComponent  
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialsRoutingModule { }
