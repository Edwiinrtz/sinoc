import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { authServices } from '../auth.services';

@Component({
  selector: 'app-sinup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})

export class SingUpComponent {

  constructor(public authServices: authServices){}

  onSignup(form: NgForm) {
    if(form.invalid){
      return;

    }
  /*
    this.authServices.createUser(
      form.value.singup_name,
      form.value.singup_lastName,
      form.value.singup_id,
      this.issueDate,
      this.birthDate,
      form.value.singup_eps,
      form.value.singup_address,
      form.value.singup_email,
      form.value.singip_landLine,//falta
      form.value.singup_phoneNumber,//falta
      rolUser,//OK
      form.value.singup_password,
    );
  */
  }
}
