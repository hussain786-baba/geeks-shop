import { AuthGuard } from './guard/auth.guard';
import { SigninSignupDialogComponent } from './components/dialog/signin-signup-dialog/signin-signup-dialog.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'signin-signup-dialog',  component: SigninSignupDialogComponent },
  { path: 'user-profile',canActivate:[AuthGuard], component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
