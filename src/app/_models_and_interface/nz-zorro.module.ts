import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzIconModule } from 'ng-zorro-antd/icon';

const nzZorroModules = [
  NzDividerModule,
  NzButtonModule,
  NzModalModule,
  NzPaginationModule,
  NzCardModule,
  NzSkeletonModule,
  NzImageModule,
  NzIconModule
  
];

@NgModule({
  declarations: [],
  imports: [CommonModule, nzZorroModules],
  exports: [nzZorroModules],
})
export class NzZorroModule {}
