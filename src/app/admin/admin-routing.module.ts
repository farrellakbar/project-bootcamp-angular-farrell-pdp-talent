import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
          }
        // CLOSE BATCHS
      // CLOSE DATA MASTER
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
