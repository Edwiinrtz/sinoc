import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { authServices } from '../auth/auth.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public nameUser = this.authServices.getNameUser();
  public addressUser = this.authServices.getAddresUser();
  public rolUser = '';
  public idUser = this.authServices.getIDuser();
  private rolUserObservable: Subscription;


  constructor(public authServices: authServices) { }

  ngOnInit(): void {
    this.rolUser = this.authServices.getRolUser();
    this.rolUserObservable = this.authServices.getRolStatusListener()
    .subscribe( rol => {
      this.rolUser = rol;
    })
  }

}
