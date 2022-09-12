import { Router } from '@angular/router';
import { HttpserviceService } from '../../../_services/httpservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.scss'],
})
export class ProductcategoryComponent implements OnInit {
  categories: any;

  
  constructor(private httpService: HttpserviceService, private route: Router) {}

  ngOnInit(): void {
    this.getProductCategories();
  }

  getProductCategories() {
    this.httpService.getProductCategoriesApi().subscribe({
      next: (res: any) => {
        if (res && res != null) {
          this.categories = res;
          // console.log(this.categories);
          
        } else {
          console.log('Some error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  viewProductsFromCategories(categoryId: number, name:string) {
    this.route.navigate(['/shop/single-category-product', categoryId], {queryParams: { category:name}});
  }


 
}
