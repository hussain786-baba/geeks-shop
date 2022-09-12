
import { ShopComponent } from './shop.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleCategoryProductComponent } from './single-category-product/single-category-product.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';

const routes: Routes = [
  { path: "", component: ShopComponent, },
  { path:"productcategory", component : ProductcategoryComponent},
  { path: 'single-category-product/:id', component: SingleCategoryProductComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
