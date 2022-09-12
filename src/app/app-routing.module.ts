import { NotpagefoundComponent } from './components/notpagefound/notpagefound.component';
import { SingleCategoryProductComponent } from './components/shop/single-category-product/single-category-product.component';
import { ProductcategoryComponent } from './components/shop/productcategory/productcategory.component';
import { ShopComponent } from './components/shop/shop.component';
import { PaymentPageComponent } from './shared/components/payment-page/payment-page.component';
import { ProductDetailsComponent } from './shared/components/product-details/product-details.component';
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
import { ProductPageComponent } from './shared/components/product-page/product-page.component';
const routes: Routes = [
  // { path: '', component: HomeComponent },

  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'blog', loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule) },
  { path: 'contact', loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule) },
  { path: 'signin-signup-dialog', component: SigninSignupDialogComponent },
  { path: 'user-profile',canActivate: [AuthGuard],component: UserProfileComponent,},
  {path: 'changepassword',canActivate: [AuthGuard],component: ChangepasswordComponent,},
  { path: 'product-page', component: ProductPageComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'payment-page', component: PaymentPageComponent },
  { path: 'shop', loadChildren: () => import('./components/shop/shop.module').then(m => m.ShopModule) },

  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: NotpagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
