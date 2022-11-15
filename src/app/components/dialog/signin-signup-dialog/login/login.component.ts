import { AuthService } from '../../../../_services/auth.service';
import {
  faClose,
  faEnvelope,
  faKey,
} from '@fortawesome/free-solid-svg-icons';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { noWhitespaceValidator } from 'src/app/validators/whitespace';
import { ErrorhandlingService } from 'src/app/_services/errorhandling.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Fontawesome
  email = faEnvelope;
  password = faKey;
  faClose = faClose;
  login!: FormGroup;
  submitted: boolean = false;
  errorCode: any;
  errorMessage = this._errorMessage.errorMsg;
  errorMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _errorMessage: ErrorhandlingService,
    private router: Router,
    public dialog: MatDialog,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.userLoginForm();
  }
  onSubmit() {
    this.submitted = true;
    if (this.login.errors) {
      return;
    } else if (this.login.valid) {
      const email = this.login.value.email;
      const password = this.login.value.password;
      this._authService.signin(email, password).subscribe(
        (res) => {
          this.notification.create(
            'success',
            'Success',
            'You have Successfully LoggedIn'
          );
          this.router.navigate(['/home']);
          this.dialog.closeAll();
        },
        (err) => {
          if (err) {
            this.errorMsg = this.errorMessage[err.error.error.message];
            this.errorCode = err.error.error.code;
            this.notification.create(
              'error',
              'Error - ' + this.errorCode,
              this.errorMsg
            );
          }
        }
      );
      this.submitted = false;
      this.login.reset();
    }
  }

  userLoginForm() {
    this.login = this.formBuilder.group({
      email: [
        'nabullarock@gmail.com',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          noWhitespaceValidator,
        ],
      ],
      password: [
        'yash5011',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(11),
          noWhitespaceValidator,
        ],
      ],
    });
  }
  navigateLogin() {
    this.dialog.closeAll();
    this.dialog.open(SignupComponent, { panelClass: 'app-full-bleed-dialog' });
  }
  dialogClose() {
    this.dialog.closeAll();
  }
}
