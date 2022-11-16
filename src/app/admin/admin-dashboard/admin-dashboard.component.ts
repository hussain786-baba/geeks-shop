import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SubjectBehaviourService } from 'src/app/_services/subject-behaviour.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  constructor(private title: Title, public router: Router, private subjectBehaviuorSer:SubjectBehaviourService) {
    this.title.setTitle('Admin Dashboard - Geeks Shop');
    let adminDashboard = this.router.url;
    this.subjectBehaviuorSer.admin_dashboard_navColor$.next(adminDashboard)
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.title.setTitle('Geeks Shop | All is Well that ends well');
    this.subjectBehaviuorSer.admin_dashboard_navColor$.next('')

  }
}
