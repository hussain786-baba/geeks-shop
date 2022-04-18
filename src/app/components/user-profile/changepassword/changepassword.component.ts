import { noWhitespaceValidator } from 'src/app/validators/whitespace';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertComponent } from './../../dialog/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  changePassword!: FormGroup;
  submitted: boolean = false
  constructor(
    public _dialog: MatDialog,
    private fb: FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.changePassword = this.fb.group({
      'changepassword' : ['', [Validators.required,Validators.minLength(6),Validators.maxLength(8), noWhitespaceValidator]],
    })
    
  }

  onSubmit() {
    // debugger
    const token = (localStorage.getItem('UserData'))
    // const t = JSON.parse(token)
    this.submitted = true;
    if (this.changePassword.errors) {
      return
    }
    else if (this.changePassword.valid) {
      console.log(this.changePassword.value)


      this.openDialog();
    }

  }
  openDialog(): void {
    this._dialog.open(AlertComponent, { hasBackdrop : true});
  }

}
