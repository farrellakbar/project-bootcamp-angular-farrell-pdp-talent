import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsIndexComponent } from './pages/groups-index/groups-index.component';
import { GroupsCreateComponent } from './pages/groups-create/groups-create.component';

const routes: Routes = [
  // OPEN PAGE GROUPS INDEX
    { 
      path: '', 
      component: GroupsIndexComponent 
    },
  // CLOSE PAGE GROUPS INDEX
  // OPEN PAGE GROUPS CREATE
    { 
      path: 'create', 
      component: GroupsCreateComponent 
    },
  // CLOSE PAGE GROUPS CREATE
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
