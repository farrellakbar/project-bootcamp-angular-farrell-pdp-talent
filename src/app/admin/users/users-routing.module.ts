import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersIndexComponent } from './pages/users-index/users-index.component';

const routes: Routes = [
  // OPEN PAGE USERS INDEX
    { 
      path: '', 
      component: UsersIndexComponent 
    },
  // CLOSE PAGE USERS INDEX
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
