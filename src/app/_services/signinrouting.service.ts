import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninroutingService {

signedOut = new BehaviorSubject(true);
  signedIn = new BehaviorSubject(false);
  
  constructor() { }
}
