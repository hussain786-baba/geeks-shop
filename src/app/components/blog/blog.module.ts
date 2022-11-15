import { BlogComponent } from './blog.component';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlogRoutingModule } from './blog-routing.module';
import { RouterModule } from '@angular/router';
import { ShopComponent } from '../shop/shop.component';

const routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      { path: '', redirectTo: 'blog' },
      { path: 'blog-article', component: BlogArticleComponent },
      { path: '**', redirectTo: 'blog' },
    ],
  },
];

@NgModule({
  declarations: [
    BlogComponent,
    BlogArticleComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),

  ]
})
export class BlogModule { }
