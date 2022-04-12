import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-assignment';
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.autoSignIn();
    this.auth.print();
  }

}
