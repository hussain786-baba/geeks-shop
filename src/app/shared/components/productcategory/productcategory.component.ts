import { HttpserviceService } from './../../../_services/httpservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.scss'],
})
export class ProductcategoryComponent implements OnInit {
  categories: any;
  constructor(private httpService: HttpserviceService) {}

  ngOnInit(): void {
    this.getProductCategories();
  }

  getProductCategories() {
    this.httpService.getProductCategoriesApi().subscribe({
      next: (res:any) => {
        this.categories = res;
        console.log(this.categories);
      },
    });
  }
}
