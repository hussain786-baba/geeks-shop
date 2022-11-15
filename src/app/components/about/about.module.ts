import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '', component: AboutComponent,
  }
];


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ]
})
export class AboutModule { }
