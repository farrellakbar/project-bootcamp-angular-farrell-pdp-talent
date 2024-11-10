import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessesIndexComponent } from './pages/accesses-index/accesses-index.component';
import { AccessesCreateComponent } from './pages/accesses-create/accesses-create.component';

const routes: Routes = [
  // OPEN PAGE ACCESS INDEX
    { 
      path: '', 
      component: AccessesIndexComponent 
    },
  // CLOSE PAGE ACCESS INDEX
  // OPEN PAGE BATCHS CREATE
    { 
      path: 'create', 
      component: AccessesCreateComponent 
    },
  // CLOSE PAGE BATCHS CREATE
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessesRoutingModule { }
