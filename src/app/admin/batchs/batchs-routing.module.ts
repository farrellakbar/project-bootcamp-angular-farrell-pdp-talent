import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchsIndexComponent } from './pages/batchs-index/batchs-index.component';
import { BatchsCreateComponent } from './pages/batchs-create/batchs-create.component';

const routes: Routes = [
  // OPEN PAGE DASHBOARD INDEX
    { 
      path: '', 
      component: BatchsIndexComponent 
    },
  // CLOSE PAGE DASHBOARD INDEX
  // OPEN PAGE DASHBOARD CREATE
    { 
      path: 'create', 
      component: BatchsCreateComponent 
    },
  // CLOSE PAGE DASHBOARD CREATE
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchsRoutingModule { }
