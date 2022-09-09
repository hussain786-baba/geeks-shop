import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../_models_and_interface/api'

@Injectable({
  providedIn: 'root'
})
export class  HttpserviceService {
  

  constructor(private http: HttpClient) { }
  
  /*Get all Products with pagination API */
  getAllProductApi(offset:number, limit:number) : Observable<any> {
    return this.http.get<any>(API.allProductApi + `?offset=${offset}&limit=${limit}`)
  }

   /*Get all product Category list API */
  getProductCategoriesApi() : Observable<any> {
    return this.http.get<any>(API.getProductCategory)
  }

}
