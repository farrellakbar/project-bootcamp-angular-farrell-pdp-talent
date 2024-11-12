import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersIndexComponent } from './pages/users-index/users-index.component';
import { UsersCreateComponent } from './pages/users-create/users-create.component';

const routes: Routes = [
  // OPEN PAGE USERS INDEX
    { 
      path: '', 
      component: UsersIndexComponent 
    },
  // CLOSE PAGE USERS INDEX
  // OPEN PAGE USERS CREATE
  { 
    path: 'create', 
    component: UsersCreateComponent 
  },
// CLOSE PAGE USERS CREATE
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
