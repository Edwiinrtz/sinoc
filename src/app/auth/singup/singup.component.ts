import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { authServices } from '../auth.services';

@Component({
  selector: 'app-sinup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})

export class SingUpComponent {

  private birthDate;
  private issueDate;

  public eps = [
    {
      value: "Colmena",
      viewValue: 'Colmena'
    },
    {
      value: "Sura",
      viewValue: 'Sura'
    },
    {
      value: "Nueva EPS",
      viewValue: 'Nueva EPS'
    }
  ];

  constructor(public authServices: authServices){}

  onSignup(form: NgForm) {
    if(form.invalid){
      return;
    }
    const rolUser = "usuario"; //Todo usuario que se registra queda con rol usuario

    console.log("formattedDate" ,  this.birthDate);
    console.log("formattedIssue" ,  this.issueDate);

    this.authServices.createUser(
    form.value.singup_name,
    form.value.singup_lastName,
    form.value.singup_id,
    this.issueDate,
    this.birthDate,
    form.value.singup_eps,
    form.value.singup_address,
    form.value.singup_email,
    form.value.singip_landLine,
    form.value.singup_phoneNumber,
    rolUser,
    form.value.singup_password,
    );
  }

  //Cambiar formato a las fechas
  formatDateBirth( event: any) {
      const data = event;
      this.birthDate = data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();
  }

  formatIssue( event: any) {
    const data = event;
    this.issueDate = data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();
  }
}
