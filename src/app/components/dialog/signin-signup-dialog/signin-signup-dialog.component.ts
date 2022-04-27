
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faUser, faSignIn, faRegistered, faSignOut, faGear } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/_services/auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-signin-signup-dialog',
  templateUrl: './signin-signup-dialog.component.html',
  styleUrls: ['./signin-signup-dialog.component.scss']
})
export class SigninSignupDialogComponent implements OnInit {

  signedIn:boolean = false
  // signedOut:boolean = true
  // fontawesome 
  profileFont = faUser;
  signinFont = faSignIn
  signupFont = faRegistered
  signoutFont = faSignOut
  faGearFont = faGear;


  constructor(
    public dialog: MatDialog,
    private _authService : AuthService,
  ) { 
  }

  ngOnInit(): void {
    this._authService.user.subscribe(res => {
      if (res) {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
    })
  }
  signinDialog() {
    this.dialog.open(LoginComponent,{ panelClass: 'login'})
  }
  signupDialog() {
    this.dialog.open(SignupComponent,{ panelClass: 'app-full-bleed-dialog', })
  }
  onSignOut() {
    this._authService.signOut();
  }
}
