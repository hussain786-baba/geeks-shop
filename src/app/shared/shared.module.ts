import { MatIconModule } from '@angular/material/icon';
import { MaterialuiModule } from './../_models_and_interface/materialui.module';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductcategoryComponent } from './components/productcategory/productcategory.component';

const COMPONENTS = [
  ProductDetailsComponent,
  ProductPageComponent,
  PaymentPageComponent,

]

const MODULES = [
  MatDialog,
  MatButtonModule,
  FontAwesomeModule,
  MaterialuiModule,

  FormsModule

]

@NgModule({
  declarations: [
    ...COMPONENTS,
    ProductcategoryComponent,
  ],
  imports: [
    ...MODULES,
    MatIconModule,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
  ]
})
export class SharedModule { }
