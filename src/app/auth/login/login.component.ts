import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { authServices } from '../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {



  //Inyectar la dependencia para identificar el inicio de sesion del usuario
  constructor(public authServices: authServices) { }

  onLogin(form: NgForm) {

    if(form.invalid) {
      return;
    }
    this.authServices.login(form.value.login_email, form.value.login_password);
  }
}

