import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSideNavbarComponent } from './admin-side-navbar/admin-side-navbar.component';
import { NzZorroModule } from '../_models_and_interface/nz-zorro.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from '../guard/auth.guard';

const routes = [
  {
    path: '',
    component: AdminDashboardComponent, // base template component
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  declarations: [AdminDashboardComponent, AdminSideNavbarComponent],
  imports: [CommonModule, NzZorroModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
