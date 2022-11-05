import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { singleProduct } from 'src/app/_models_and_interface/products';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  singleProductData!: singleProduct;
  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
  ) {}

  ngOnInit(): void {
    this.singleProductData = this.data;
    console.log(this.singleProductData);
  }
  payment() {
    this.dialogRef.close();
    this.router.navigate(['/payment-page']);
  }
}
