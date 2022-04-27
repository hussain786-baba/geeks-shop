
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
  constructor(
    private auth: AuthService,
    public dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    // console.log(Math.round(new Date().getTime() / 1000))
    this.auth.autoSignIn();
  }
  productDetails() {
    this.dialog.open(ProductPageComponent, {
      panelClass : 'product-page'
    })
  }

}
