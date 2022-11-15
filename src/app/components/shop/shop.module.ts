import { SingleCategoryProductComponent } from './single-category-product/single-category-product.component';
import { NzZorroModule } from './../../_models_and_interface/nz-zorro.module';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { MaterialuiModule } from 'src/app/_models_and_interface/materialui.module';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '', component:ShopComponent},
  {path: 'single-category-product', component:SingleCategoryProductComponent},
  {path: 'productcategory', component:ProductcategoryComponent},
]
@NgModule({
  declarations: [
    ShopComponent,
    SingleCategoryProductComponent,
    ProductcategoryComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    NzZorroModule,
    InfiniteScrollModule,
    MaterialuiModule,
    RouterModule.forChild(routes)
  ],
})
export class ShopModule {}
