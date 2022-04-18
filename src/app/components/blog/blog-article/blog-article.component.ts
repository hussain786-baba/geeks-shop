
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { BlogModel } from 'src/app/appModel/blog';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss']
})
export class BlogArticleComponent implements OnInit {
  fafacebook = faFacebook;
  fatwitter = faTwitter;

  blogArray:any = [];
  selectedArticle:any = [];
  id:any
  constructor( 
    private _blogModel: BlogModel,
    private _activatedRoute: ActivatedRoute
  ) { 
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = + params['id']
    })
  }

  ngOnInit(): void {
    this.blogArray = this._blogModel.articles;
    this.selectedArticle = this.blogArray[this.id - 1]
    // console.log(this.selectedArticle)
  }

}
