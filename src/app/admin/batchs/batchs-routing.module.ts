import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchsIndexComponent } from './pages/batchs-index/batchs-index.component';
import { BatchsCreateComponent } from './pages/batchs-create/batchs-create.component';

const routes: Routes = [
  // OPEN PAGE BATCHS INDEX
    { 
      path: '', 
      component: BatchsIndexComponent 
    },
  // CLOSE PAGE BATCHS INDEX
  // OPEN PAGE BATCHS CREATE
    { 
      path: 'create', 
      component: BatchsCreateComponent 
    },
  // CLOSE PAGE BATCHS CREATE
  // OPEN PAGE BATCHS UPDATE
    { 
      path: 'update/:id',   
      component: BatchsCreateComponent 
    },
  // CLOSE PAGE BATCHS UPDATE
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchsRoutingModule { }
