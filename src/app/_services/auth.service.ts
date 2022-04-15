import { UserProfile } from './../_models_and_interface/userprofile.model';

import { AuthResponse } from '../_models_and_interface/auth-response.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from '../_models_and_interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_KEY = 'AIzaSyDUMlJxk1lrEEdnQTIwroGSKtrMP_pGZGM'
  USER_DB = 'https://angular-assignment-2-f3ef2-default-rtdb.firebaseio.com/users.json';
  user = new BehaviorSubject<User>(null!);

  constructor(
    private http: HttpClient,
  ) {
 
  }

  signup(email: any, password: any) {
    
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(res => {
        this.authenticatedUser(res.email, res.localId, res.idToken, + res.expiresIn);
      })
    )
    
  }

  signin(email: any, password: any) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(res => {
        this.authenticatedUser(res.email, res.localId, res.idToken, + res.expiresIn);
      })
    )
  }
  signOut() {
    this.user.next(null!);
    localStorage.removeItem('UserData')
  }
  autoSignIn() {
    const userData: any = JSON.parse(localStorage.getItem('UserData')!);
    // console.log(userData)
    if (!userData) {
      return;
    } else {
      const userloggedIn = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
      if (userloggedIn.token) {
        this.user.next(userloggedIn)
      }
    }
  }
  private authenticatedUser(email: string, userId: string, token: string, expiresIn: number) {
    const dateUnixTime = Math.round(new Date().getTime() / 1000);
    const expirationDate = new Date((dateUnixTime + expiresIn) * 1000)
    const user = new User(email, userId, token, expirationDate);
    // console.log('user => ', expirationDate)
    this.user.next(user);
    localStorage.setItem('UserData', JSON.stringify(user))

  }
  print() {
    console.log('Hello')
  }

  token() {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY, {

      returnSecureToken: true
    }).pipe(
      tap(res => {
        this.authenticatedUser(res.email, res.localId, res.idToken, + res.expiresIn);
      })
    )
 }
}
