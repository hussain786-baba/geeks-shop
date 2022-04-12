import { User } from '../_models_and_interface/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsDBService {
  dbUrl = 'https://angular-assignment-2-f3ef2-default-rtdb.firebaseio.com/users.json';
 
  userDetails = [];
  constructor(private http: HttpClient) {
    
   }
 
  saveUserInfo(userInfo: User) {
    // this.userDetails.push(userInfo)
    return this.http.post<User>(this.dbUrl, userInfo)
  }
  fetchUser(userInfo: User) {  
  }

  getName() {
    this.http.get(this.dbUrl)
  }
  
}
