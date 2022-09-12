import {
  singleProduct,
  Category,
} from './../../../_models_and_interface/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpserviceService } from 'src/app/_services/httpservice.service';
import { NO_IMAGE_ALT } from 'src/app/_models_and_interface/constants';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-single-category-product',
  templateUrl: './single-category-product.component.html',
  styleUrls: ['./single-category-product.component.scss'],
})
export class SingleCategoryProductComponent implements OnInit {
  singleCategory!: singleProduct[];
  singleCategoryId!: any;
  category!: Category[];
  categoryName: any = '';
  loading: boolean = true;
  fallbackImage = NO_IMAGE_ALT;
  
  noOfItemsToShowInitially: number = 5;
  itemsToLoad: number = 5;
  itemsToShow: any;
  isFullListDisplayed: boolean = false;

  constructor(
    private httpService: HttpserviceService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.singleCategoryId = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.viewProductsFromCategories(this.singleCategoryId);
  }

  // getProductList from productCategory API for specific product Id 
  viewProductsFromCategories(categoryId: number) {
    this.httpService.getSingleProductCategory(categoryId).pipe(
      finalize(()=> {this.loading = false})
    ).subscribe({
      next: (res) => {
       
        this.singleCategory = res;
        this.category = res[0].category;
        this.itemsToShow = this.singleCategory.slice(0, this.noOfItemsToShowInitially);
        for (const [key, value] of Object.entries(this.category)) {
          if (key === 'name') {
            this.categoryName = value;
          }
        }
      },
     
    });
  }

  goBack() {
    this.route.navigate(['./shop/productcategory'])
  }

  onScroll(event: any) {
    if (this.noOfItemsToShowInitially <= this.singleCategory.length) {
      this.loading = true
      // Update ending position to select more items from the array
      this.noOfItemsToShowInitially += this.itemsToLoad;
      this.itemsToShow = this.singleCategory.slice(0, this.noOfItemsToShowInitially);
      this.loading = false;
    } else {
      this.isFullListDisplayed = true;
    }
  }
}
