import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlingService {

  constructor() { }
  errorMsg : { [error: string]: string } =  {
    UNKNOWN: 'Unknown Error Occured, Please check your Internet',
    EMAIL_EXISTS: 'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'We have blocked all requests from this device due to unusual activity. Try again later.',
    EMAIL_NOT_FOUND: 'Wrong Email or Password :  Please check your Email and Password ',
    INVALID_PASSWORD: 'Wrong Email or Password :  Please check your Email and Password ',
    USER_DISABLED: 'The user account has been disabled by an administrator. Please Contact Customer Care',
    
  }
}
