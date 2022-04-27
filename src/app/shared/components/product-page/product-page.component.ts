import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog,  } from '@angular/material/dialog';

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
  navigateProductDetails() {
    this.route.navigate(['/product-details']);
    this.dialog.closeAll();
  }
  payment() {
    this.route.navigate(['/payment-page'])
    this.dialog.closeAll()
  }
}
