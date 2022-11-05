import { SingleCategoryProductComponent } from './single-category-product/single-category-product.component';
import { NzZorroModule } from './../../_models_and_interface/nz-zorro.module';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { MaterialuiModule } from 'src/app/_models_and_interface/materialui.module';


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
    MaterialuiModule
  ],
})
export class ShopModule {}
