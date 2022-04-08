import { AuthService } from './../../_services/auth.service';
// import { SigninroutingService } from './../../_services/signinrouting.service';
import { Component, OnInit } from '@angular/core';
import { faRegistered } from '@fortawesome/free-regular-svg-icons';
import { faGear, faSignIn, faSignOut, faUser, faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  signedIn:boolean = false
  // signedOut:boolean = true
  // fontawesome 
  profileFont = faUser;
  signinFont = faSignIn
  signupFont = faRegistered
  signoutFont = faSignOut
  faGearFont = faGear;


  constructor(
    // private _profileDropdown: SigninroutingService,
    private _authService : AuthService,
  ) { 

    // this._profileDropdown.signedIn.subscribe(res => {
    //   this.signedIn = res;
    // })
    // this._profileDropdown.signedOut.subscribe(res => {
    //   this.signedOut = res;
    // })
  
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
  logout() { 
    // this._profileDropdown.signedIn.next(false);
    // this._profileDropdown.signedOut.next(true);
}
}
