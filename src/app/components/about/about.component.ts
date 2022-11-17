import { Component, OnInit } from '@angular/core';
import { faChessQueen, faHand } from '@fortawesome/free-regular-svg-icons';
import { faFile, faGlobe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  faChess = faChessQueen;
  faHandShake = faHand;
  faFile = faFile;
  faGlobe = faGlobe;
  constructor() {}

  ngOnInit(): void {}
}
