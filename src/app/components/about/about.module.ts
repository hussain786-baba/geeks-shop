import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { NzZorroModule } from 'src/app/_models_and_interface/nz-zorro.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    CommonModule, RouterModule.forChild(routes), NzZorroModule,FontAwesomeModule
  ]
})
export class AboutModule { }
