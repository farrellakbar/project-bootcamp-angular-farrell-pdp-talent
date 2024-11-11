import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersIndexComponent } from './users/pages/users-index/users-index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: "full"
  },
  {
    path: 'admin',
    children: [
      // OPEN PAGE DASHBOARD
        {
          path: 'dashboard',
          loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
        },
      // CLOSE PAGE DASHBOARD
      // OPEN DATA MASTER
        //OPEN BATCHS
          {
            path: 'batchs',
            loadChildren: () => import('./batchs/batchs.module').then(m => m.BatchsModule)
          },
        // CLOSE BATCHS
        //OPEN BATCHS
          {
            path: 'accesses',
            loadChildren: () => import('./accesses/accesses.module').then(m => m.AccessesModule)
          },
        // CLOSE BATCHS
      // CLOSE DATA MASTER
      // OPEN PAGE USERS INDEX
        { 
          path: 'users', 
          loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
        },
      // CLOSE PAGE USERS INDEX
      // OPEN PAGE UNITS INDEX
        { 
          path: 'units', 
          loadChildren: () => import('./units/units.module').then(m => m.UnitsModule)
        },
      // CLOSE PAGE UNITS INDEX
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
