import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

const nzZorroModules = [
  NzDividerModule,
  NzButtonModule,
  NzModalModule,
  NzPaginationModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, nzZorroModules],
  exports: [nzZorroModules],
})
export class NzZorroModule {}
