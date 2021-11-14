import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public idUser = this.authServices.getIDuser();
  public emailUser = this.authServices.getEmailUser();
  public landLineUser = this.authServices.getLandLineUser();
  public birthDateUser = this.authServices.getBirthDateUser();
  public issueDate = this.authServices.getIssueDate();
  public lastNameUser = this.authServices.getLastNameUser();
  public rolUser = '';
  public rolUserObservable: Subscription;
  public rolLastNameObservable: Subscription;

  constructor(private authServices: authServices) {

  }

  ngOnInit() {
    this.rolUser = this.authServices.getRolUser();
    this.rolUserObservable = this.authServices.getRolStatusListener()
    .subscribe( rol => {
      this.rolUser = rol;
    })

  }

}
