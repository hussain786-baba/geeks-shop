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
import { NzZorroModule } from '../_models_and_interface/nz-zorro.module';

const COMPONENTS = [
  ProductDetailsComponent,
  ProductPageComponent,
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    
  ],
  imports: [
    // MatIconModule,
    // MatButtonModule,
    FontAwesomeModule,
    MaterialuiModule,
    FormsModule,
    NzZorroModule
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class SharedModule { }
