import { ProductPageComponent } from './shared/product-page/product-page.component';
import { ChangepasswordComponent } from './components/user-profile/changepassword/changepassword.component';

import { AuthGuard } from './guard/auth.guard';
import { SigninSignupDialogComponent } from './components/dialog/signin-signup-dialog/signin-signup-dialog.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogArticleComponent } from './components/blog/blog-article/blog-article.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  {path : 'blog-article/:id', component:BlogArticleComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'signin-signup-dialog',  component: SigninSignupDialogComponent },
  { path: 'user-profile',canActivate:[AuthGuard], component: UserProfileComponent },
  { path: 'changepassword',canActivate:[AuthGuard], component: ChangepasswordComponent },
  { path: 'product-page',component: ProductPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
