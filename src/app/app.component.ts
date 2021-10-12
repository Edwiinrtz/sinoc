import { Component, OnInit } from '@angular/core';
import { authServices } from './auth/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  constructor(private authServices: authServices) {

  }

  ngOnInit() {
    this.authServices.authAuthUser();
  }
}
