import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-assignment';
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyDUMlJxk1lrEEdnQTIwroGSKtrMP_pGZGM',
      authDomain: 'angular-assignment-2-f3ef2.firebaseapp.com',
      databaseURL:
        'https://angular-assignment-2-f3ef2-default-rtdb.firebaseio.com',
      projectId: 'angular-assignment-2-f3ef2',
      storageBucket: 'angular-assignment-2-f3ef2.appspot.com',
      messagingSenderId: '602037431254',
      appId: '1:602037431254:web:b8d9e8d4f6348e15469277',
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  }

}
