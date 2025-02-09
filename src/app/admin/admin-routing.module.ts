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
        // OPEN PAGE UNITS INDEX
          { 
            path: 'units', 
            loadChildren: () => import('./units/units.module').then(m => m.UnitsModule)
          },
        // CLOSE PAGE UNITS INDEX
        //OPEN PROGRAMS
          {
            path: 'programs',
            loadChildren: () => import('./programs/programs.module').then(m => m.ProgramsModule)
          },
        // CLOSE PROGRAMS
              // OPEN PAGE GROUPS INDEX
              { 
                path: 'groups', 
                loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)
              },
            // CLOSE PAGE GROUPS INDEX
      // CLOSE DATA MASTER
      // OPEN PAGE USERS INDEX
        { 
          path: 'users', 
          loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
        },
      // CLOSE PAGE USERS INDEX
      // OPEN PAGE SCHEDULES INDEX
        { 
          path: 'schedules', 
          loadChildren: () => import('./schedules/schedules.module').then(m => m.SchedulesModule)
        },
      // CLOSE PAGE SCHEDULES INDEX
      // OPEN PAGE FINANCIAL INDEX
        { 
          path: 'financials', 
          loadChildren: () => import('./financials/financials.module').then(m => m.FinancialsModule)
        },
      // CLOSE PAGE FINANCIAL INDEX
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
