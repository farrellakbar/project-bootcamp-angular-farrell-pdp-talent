import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitsIndexComponent } from './pages/units-index/units-index.component';
import { UnitsCreateComponent } from './pages/units-create/units-create.component';

const routes: Routes = [
   // OPEN PAGE UNITS INDEX
    { 
      path: '', 
      component: UnitsIndexComponent 
    },
  // CLOSE PAGE UNITS INDEX
  // OPEN PAGE UNITS CREATE
    { 
      path: 'create', 
      component: UnitsCreateComponent 
    },
  // CLOSE PAGE UNITS CREATE
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
