import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login!: FormGroup
  submitted:boolean = false
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.userLoginForm();
  }
  onSubmit() {
    this.submitted = true
    if (this.login.errors) {
      return
    }
    this.signin() 
  }
  userLoginForm() {
    this.login = this.formBuilder.group({
      'email': ['nabullah@gmail.com', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      'password': ['123456', [Validators.required, Validators.minLength(6), Validators.maxLength(11)]],
      
    })
  }
  signin() {
   console.log( this.login.value)
  }
}
