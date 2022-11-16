import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectBehaviourService {
  admin_dashboard_navColor$ = new BehaviorSubject('');

  constructor() {}
}
