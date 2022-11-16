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
    EMAIL_NOT_FOUND: 'Wrong Email or Password :  Please check your Email and Password ',
    INVALID_PASSWORD: 'Wrong Email or Password :  Please check your Email and Password ',
    USER_DISABLED: 'The user account has been disabled by an administrator. Please Contact Customer Care',
    TOO_MANY_ATTEMPTS_TRY_LATER :"Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later"
  }
}
