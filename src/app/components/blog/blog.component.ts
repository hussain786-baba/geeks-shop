import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { BlogModel } from '../../appModel/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogArray:any = []
  constructor(
    private _blog: BlogModel,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.blogArray = this._blog.articles;
    // console.log(this.blogArray)
  }
  goToArticle(id:number, name:string) {
    this.route.navigate(['./blog/blog-article'], {queryParams: {id, name}})
  }
}
