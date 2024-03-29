import { Component, OnInit, OnDestroy } from '@angular/core';
import { authServices } from '../../auth/auth.services';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription; //Observable del atributo private::authStatusListener | componente:authServices
  public roluser;
  public validar = false;
  rolUser = '';
  private rolUserObservable: Subscription;

  opcionesNavBar = {
    fixed: true,
    bottom: 0,
    top: 0
  }

  constructor(private authServices: authServices) {  };


  ngOnInit(): void {
    this.userIsAuthenticated = this.authServices.getIsAuth();
    this.authListenerSubs = this.authServices.getAuthStatusListener()
    .subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.rolUser = this.authServices.getRolUser();
    this.rolUserObservable = this.authServices.getRolStatusListener()
    .subscribe( rol => {
      this.rolUser = rol;
    })
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout(){
    this.authServices.logout();
  }
}
