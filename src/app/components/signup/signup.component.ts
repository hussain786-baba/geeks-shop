import { ErrorhandlingService } from './../../_services/errorhandling.service';
import { AuthService } from './../../_services/auth.service';
import { noWhitespaceValidator, ValidateEmail } from './../../validators/whitespace';

import { UserdetailsDBService } from './../../_services/userdetails-db.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export const EMAIL_REGEX: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  signup!: FormGroup;
  passwordNotSame: boolean = false;
  userDetail = []
  submitted: boolean = false;

  error: boolean = false;
  errorCode: any;
  errorMessage = this._errorMessage.errorMsg;
  errorMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private _userDetail: UserdetailsDBService,
    private _authService: AuthService,
    private _errorMessage: ErrorhandlingService,
  ) { }
  ngOnInit(): void {

    this.userSignupForm();
  }
  userSignupForm() {
    this.signup = this.formBuilder.group({
      'firstname': ['', [Validators.required, noWhitespaceValidator]],
      'lastname': ['', [Validators.required, noWhitespaceValidator]],
      'email': ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), ValidateEmail]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(11), noWhitespaceValidator]],
      'cf_password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(11), noWhitespaceValidator]],
    })
  }
  onSubmit() {
    // debugger
    this.submitted = true
    if (this.signup.errors) {
      return
    } else if (this.signup.valid) {
      // this._userDetail.saveUserInfo(this.signup.value).subscribe(res=>{
      //       console.log(res)
      //     })
      // console.log(this.signup.value)
      const email = this.signup.value.email;
      const password = this.signup.value.password;
      this._authService.signup(email, password).subscribe(res => {
        // (console.log(res))
      },
        err => {
          // console.log(err)
          if (err) {
            if (!err.err || !err.error.error) {
              this.error = true
              this.errorMsg = this.errorMessage['UNKNOWN']
              this.errorCode = err.error.error.code;
            } else {
              this.error = true
              this.errorMsg = this.errorMessage[err.error.error.message]
              this.errorCode = err.error.error.code;
            }
          }
        }
      )
      this.submitted = false;
      this.signup.reset();
    }
  }


}
