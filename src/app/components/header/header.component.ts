import { Component, OnInit } from '@angular/core';
import { faRegistered } from '@fortawesome/free-regular-svg-icons';
import { faGear, faSignIn, faSignOut, faUser, faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // fontawesome 
  profileFont = faUser;
  signinFont = faSignIn
  signupFont = faRegistered
  signoutFont = faSignOut
  faGearFont = faGear;

  // profile 
  dropdown_profile: boolean = false
  dropdown_setting: boolean = false
  dropdown_signout: boolean = false
  dropdown_signin: boolean = true
  dropdown_signup: boolean = true
  profile_info: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
