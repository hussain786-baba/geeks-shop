import { UserdetailsDBService } from 'src/app/_services/userdetails-db.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
localItem = JSON.parse(localStorage.getItem('UserData')!)
  constructor(
    private authService: AuthService,
    private _userDetails:UserdetailsDBService,
  ) { }

  ngOnInit(): void {
    this._userDetails.fetchUser().subscribe(res => {
      console.log(res)  
    })
  }

}
