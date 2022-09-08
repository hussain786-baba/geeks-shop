import { ProductcategoryComponent } from './../../shared/components/productcategory/productcategory.component';
import { HttpserviceService } from './../../_services/httpservice.service';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/_models_and_interface/products';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { EventEmitter } from 'stream';
import { map } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products!: Products[];
  pageIndex: number = 0;

  constructor(
    private httpService: HttpserviceService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getallProduct(this.pageIndex);
  }

  changePage(event: number) {
    this.pageIndex = Number(event + '0');
    this.getallProduct(this.pageIndex);
  }

  getallProduct(pageno: number) {
    this.httpService.getAllProductApi(pageno, 12)
      .subscribe({
        next: (res: any) => {
          this.products = res;
        },
      });
  }

  selectCategory() {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: ProductcategoryComponent,
      nzFooter: [
        {
          label: 'Close',
          shape: 'round',
          onClick: () => modal.destroy(),
        },
        {
          label: 'Select',
          shape: 'round',
          onClick: () => modal.destroy(),
        },
      ],
    });
  }
}
