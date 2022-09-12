
import { AuthService } from '../../../../_services/auth.service';
import { faClose, faEnvelope, faKey, faLock } from '@fortawesome/free-solid-svg-icons';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { noWhitespaceValidator } from 'src/app/validators/whitespace';
import { ErrorhandlingService } from 'src/app/_services/errorhandling.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Fontawesome 
  email = faEnvelope;
  password = faKey;
  faClose = faClose;

  login!: FormGroup
  submitted: boolean = false

  error: boolean = false;
  errorCode: any;
  errorMessage = this._errorMessage.errorMsg;
  errorMsg: any;

  

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _errorMessage: ErrorhandlingService,
    private router: Router,
    public dialog: MatDialog,
    

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
      // console.log(this.login.value)
      const email = this.login.value.email;
      const password = this.login.value.password;
      this._authService.signin(email, password).subscribe(
        res => {
          this.router.navigate(['/home'])
         this.dialog.closeAll()
        },
        err => {
          // console.log(err)
          if (err) {
            this.error = true
            this.errorMsg = this.errorMessage[err.error.error.message]
            console.log(this.errorMsg)
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
      'password': ['121212', [Validators.required, Validators.minLength(6), Validators.maxLength(11), noWhitespaceValidator]],
    })
  }
  navigateLogin() {
    this.dialog.closeAll()
    this.dialog.open(SignupComponent,{ panelClass: 'app-full-bleed-dialog', })
  }
  dialogClose() {
    this.dialog.closeAll()
  }


 











}
