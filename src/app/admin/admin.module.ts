import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSideNavbarComponent } from './admin-side-navbar/admin-side-navbar.component';
import { NzZorroModule } from '../_models_and_interface/nz-zorro.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MaterialuiModule } from '../_models_and_interface/materialui.module';

const routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  declarations: [AdminDashboardComponent, AdminSideNavbarComponent],
  imports: [
    CommonModule,
    NzZorroModule,
    MaterialuiModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminModule {}
