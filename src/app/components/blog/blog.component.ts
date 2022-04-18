
import { Component, OnInit } from '@angular/core';
import { BlogModel } from '../../appModel/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogArray = []
  constructor(
   private _blog:BlogModel
  ) { }

  ngOnInit(): void {
    this.blogArray = this._blog.articles;
    console.log(this.blogArray)
  }

}
