import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramsIndexComponent } from './pages/programs-index/programs-index.component';
import { ProgramsCreateComponent } from './pages/programs-create/programs-create.component';

const routes: Routes = [
  // OPEN PAGE PROGRAMS INDEX
  { 
    path: '', 
    component: ProgramsIndexComponent 
  },
// CLOSE PAGE PROGRAMS INDEX
// OPEN PAGE PROGRAMS CREATE
  { 
    path: 'create', 
    component: ProgramsCreateComponent 
  },
// CLOSE PAGE PROGRAMS CREATE
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
