import { AuthService } from 'src/app/_services/auth.service';
import { User } from '../_models_and_interface/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsDBService {
  dbUrl = 'https://angular-assignment-2-f3ef2-default-rtdb.firebaseio.com/users.json';

  userDetails = [];
  constructor(
    private http: HttpClient,
    private _auth: AuthService
  ) { }
 
     httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'my-auth-token'
    })
  };

  saveUserInfo(userInfo: any) {
    // this.userDetails.push(userInfo)
    return this.http.post<User>(this.dbUrl, userInfo)
    // return this.http.post<User>(this.dbUrl, userInfo), {
      // return this._auth.user.pipe(
      //   map(user => {
      //       params: new HttpParams().set('auth', user.token!)
      //     }
      //   })
      // })
    // }

  }
  fetchUser() {
    return this.http.get(this.dbUrl)
  }
}
