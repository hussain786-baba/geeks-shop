import { NotpagefoundComponent } from './components/notpagefound/notpagefound.component';
import { PaymentPageComponent } from './shared/components/payment-page/payment-page.component';
import { ChangepasswordComponent } from './components/user-profile/changepassword/changepassword.component';
import { AuthGuard } from './guard/auth.guard';
import { SigninSignupDialogComponent } from './components/dialog/signin-signup-dialog/signin-signup-dialog.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //Default route on load of website
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  //Lazy loaded all the main components
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./components/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./components/contact/contact.module').then(
        (m) => m.ContactModule
      ),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./components/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./components/about/about.module').then((m) => m.AboutModule),
  },

  {
    canActivate: [AuthGuard],
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },

  { path: 'signin-signup-dialog', component: SigninSignupDialogComponent },
  {
    path: 'user-profile',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
  {
    path: 'changepassword',
    canActivate: [AuthGuard],
    component: ChangepasswordComponent,
  },
  { path: 'payment-page', component: PaymentPageComponent },

  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: NotpagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
