import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'blog-article', component: BlogArticleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
