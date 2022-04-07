
import { AuthResponse } from '../_models_and_interface/auth-response.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { User } from '../_models_and_interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_KEY = 'AIzaSyDUMlJxk1lrEEdnQTIwroGSKtrMP_pGZGM'
  user = new Subject<User>();

  constructor(
    private http:HttpClient,
  ) { }

  signup(email: any,password: any) {
   return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
   }).pipe(
    tap(res => {
      this.authenticatedUser(res.email,res.localId,res.idToken, + res.expiresIn);
     })
   )
  }

  signin(email:any , password:any) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(res => {
        this.authenticatedUser(res.email,res.localId,res.idToken, + res.expiresIn);
       })
     )    
  }

  private authenticatedUser(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getDate() + expiresIn*1000)
    const user = new User(email, userId, token, expirationDate);
    console.log('user => ', user)
    this.user.next(user);
  }


}
