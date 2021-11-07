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
  public lastNameUser = this.authServices.getLastNameUser();
  public idUser = this.authServices.getIDuser();
  public emailUser = this.authServices.getEmailUser();
  public landLineUser = this.authServices.getLandLineUser();
  public birthDateUser = this.authServices.getBirthDateUser();
  public issueDate = this.authServices.getIssueDate();

  public rolUser = '';
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
