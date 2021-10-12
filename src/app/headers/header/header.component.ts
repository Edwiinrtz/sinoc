import { Component, OnInit, OnDestroy } from '@angular/core';
import { authServices } from '../../auth/auth.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription; //Observable del atributo private::authStatusListener | componente:authServices

  constructor(private authServices: authServices) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authServices.getIsAuth();
    this.authListenerSubs = this.authServices.getAuthStatusListener()
    .subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    }); //Doble check de que se haya iniciado correctamente la sección
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout(){
    this.authServices.logout();
  }
}
