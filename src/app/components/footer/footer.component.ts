import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SubjectBehaviourService } from 'src/app/_services/subject-behaviour.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  admin_dashboard: boolean = false
  constructor(private _auth: AuthService, private subjectBehaviourService: SubjectBehaviourService
  ) {
    this.subjectBehaviourService.admin_dashboard_navColor$.subscribe((res) => {
      if (res == '/admin-dashboard/dashboard') {
        console.log(res);
        this.admin_dashboard = true;
      } else {
        this.admin_dashboard = false;
      }
    });
  }

  ngOnInit(): void {
    this._auth.autoSignIn();
    this.admin_dashboard = false;
  }

}
