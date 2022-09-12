import { Products } from './../../_models_and_interface/products';
import { HttpserviceService } from './../../_services/httpservice.service';

import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/_services/auth.service';
import { faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import { Component, OnInit } from '@angular/core';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { ProductPageComponent } from 'src/app/shared/components/product-page/product-page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faVideo = faVideo;
  faUsers = faUser;
  faClock = faClock;
  products: Products[] = [];

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private httpService: HttpserviceService
  ) { }

  ngOnInit(): void {
    // console.log(Math.round(new Date().getTime() / 1000))
    this.auth.autoSignIn();
    this.getallProduct();
  }
  productDetails() {
    this.dialog.open(ProductPageComponent, {
      panelClass : 'product-page'
    })
  }

  getallProduct() {
    this.httpService.getAllProductApi(1,10).subscribe({
      next: (res) => {
        this.products = res
        // console.log(this.products)
      }
    })
  }
}
