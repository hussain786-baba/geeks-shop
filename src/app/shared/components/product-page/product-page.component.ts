import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  constructor(
    private route: Router,
    public dialog:MatDialog,
  ) { }

  ngOnInit(): void {
  }
  navigatePayment() {
    this.route.navigate(['/payment-page']);
    this.dialog.closeAll();
  }
  navigateProDetails() {
    this.route.navigate(['/product-details'])
    this.dialog.closeAll();
  }
}
