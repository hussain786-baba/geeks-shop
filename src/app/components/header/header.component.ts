import { AuthService } from './../../_services/auth.service';
// import { SigninroutingService } from './../../_services/signinrouting.service';
import { Component, OnInit } from '@angular/core';
import { SubjectBehaviourService } from 'src/app/_services/subject-behaviour.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  signedIn: boolean = false;
  admin_Dashboard: boolean = false;

  constructor(
    private _authService: AuthService,
    private subjectBehaviourService: SubjectBehaviourService
  ) {
    this.subjectBehaviourService.admin_dashboard_navColor$.subscribe((res) => {
      if (res == '/admin-dashboard/dashboard') {
        console.log(res);
        this.admin_Dashboard = true;
      } else {
        this.admin_Dashboard = false;
      }
    });
  }

  ngOnInit(): void {
    this._authService.user.subscribe((res) => {
      if (res != null) {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
    });
  }
}
