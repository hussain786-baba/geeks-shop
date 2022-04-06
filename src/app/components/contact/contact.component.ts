import { Component, OnInit } from '@angular/core';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope, faMapLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  faPhone = faPhone;
  faEmail = faEnvelope;
  faLocation = faMapLocationDot;


  constructor() { }

  ngOnInit(): void {
  }

}
