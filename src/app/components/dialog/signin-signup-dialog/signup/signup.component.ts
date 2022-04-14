import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { noWhitespaceValidator, ValidateEmail } from 'src/app/validators/whitespace';
import { AuthService } from 'src/app/_services/auth.service';
import { LoginComponent } from '../login/login.component';
import { ErrorhandlingService } from 'src/app/_services/errorhandling.service';
import { UserdetailsDBService } from 'src/app/_services/userdetails-db.service';
export const EMAIL_REGEX: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  faClose = faXmark;
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
    public dialog: MatDialog,
    private route:Router,
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
    debugger
    this.submitted = true
    if (this.signup.errors) {
      return
    } else if (this.signup.valid) {
      // this._userDetail.saveUserInfo(this.signup.value).subscribe(res=>{
      //   (console.log(res))
      //     })
      // console.log(this.signup.value)
      const email = this.signup.value.email;
      const password = this.signup.value.password;
      if (this.signup.value.password === this.signup.value.cf_password) {
        this._authService.signup(email, password).subscribe(res => {
          // (console.log(res))
  
        },
          err => {
            console.log(err)
            if (err) {
                this.error = true
                this.errorMsg = this.errorMessage[err.error.error.message]
                this.errorCode = err.error.error.code; 
            }
          }
        )
        this.submitted = false;
        this.dialog.closeAll();
        this.route.navigate([''])
        
        this.signup.reset(); 
      } else {
        this.passwordNotSame = true
      }
    }
  } 
  navigateLogin() {
    this.dialog.closeAll()
    this.dialog.open(LoginComponent,{ panelClass: 'app-full-bleed-dialog', })
  }
  dialogClose() {
    this.dialog.closeAll()
  }






}


