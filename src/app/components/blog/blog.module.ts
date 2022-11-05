import { BlogComponent } from './blog.component';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BlogRoutingModule } from './blog-routing.module';


@NgModule({
  declarations: [
    BlogComponent,
    BlogArticleComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FontAwesomeModule
    
  ]
})
export class BlogModule { }
