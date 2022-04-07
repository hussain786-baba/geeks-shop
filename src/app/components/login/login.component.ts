import { SigninroutingService } from './../../_services/signinrouting.service';
import { AuthService } from './../../_services/auth.service';
import { faEnvelope, faKey, faLock } from '@fortawesome/free-solid-svg-icons';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { noWhitespaceValidator } from 'src/app/validators/whitespace';
import { ErrorhandlingService } from 'src/app/_services/errorhandling.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Fontawesome 
  email = faEnvelope;
  password = faKey;
  login!: FormGroup
  submitted: boolean = false

  error: boolean = false;
  errorCode: any;
  errorMessage = this._errorMessage.errorMsg;
  errorMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private _profileDropdown: SigninroutingService,
    private _authService: AuthService,
    private _errorMessage: ErrorhandlingService,

  ) { }

  ngOnInit(): void {
    this.userLoginForm();
  }
  onSubmit() {
    this.submitted = true
    if (this.login.errors) {
      return
    } else if (this.login.valid) {
      // this._userDetail.saveUserInfo(this.login.value).subscribe(res=>{
      //       console.log(res)
      //     })
      // console.log(this.login.value)
      console.log(this.login.value)
      const email = this.login.value.email;
      const password = this.login.value.password;
      this._authService.signin(email, password).subscribe(
        res => {
          this._profileDropdown.signedIn.next(true)
          this._profileDropdown.signedOut.next(false)
        },
        err => {
          // console.log(err)
          if (err) {
            this.error = true
            this.errorMsg = this.errorMessage[err.error.error.message]
            this.errorCode = err.error.error.code;
          }
        }
      )
      this.submitted = false
      this.login.reset();
    }
  }

  userLoginForm() {
    this.login = this.formBuilder.group({
      'email': ['nabullah@gmail.com', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), noWhitespaceValidator]],
      'password': ['123456', [Validators.required, Validators.minLength(6), Validators.maxLength(11), noWhitespaceValidator]],
    })
  }














}
