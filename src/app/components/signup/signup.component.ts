import { UserdetailsDBService } from './../../_services/userdetails-db.service';
import { User } from './../../_models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signup!: FormGroup;
  passwordNotSame: boolean = false;
  userDetail = []

  constructor(
    private formBuilder: FormBuilder,
    private _userDetail: UserdetailsDBService,
  ) { }
  submitted: boolean = false;
  ngOnInit(): void {
    this.userSignupForm();
  }
  userSignupForm() {
    this.signup = this.formBuilder.group({
      'firstname': ['Nabullah', [Validators.required]],
      'lastname': ['Ansari', [Validators.required]],
      'email': ['nabullah@gmail.com', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      'password': ['123456', [Validators.required, Validators.minLength(6), Validators.maxLength(11)]],
      'cf_password': ['123456', [Validators.required, Validators.minLength(6), Validators.maxLength(11)]],
    })
  }
  onSubmit() {
    this.submitted = true
    if (this.signup.errors) {
      return
    }
    this._userDetail.saveUserInfo(this.signup.value).subscribe(res=>{
      console.log(res)

    })
  }
  

}
