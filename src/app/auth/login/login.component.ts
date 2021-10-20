import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { authServices } from '../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

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
      viewValue: 'nueva EPS'
    }
  ];

  getBirthDate(){
    return this.birthDate;
  }

  setBirthDate(date: string){
    this.birthDate = date;
  }

  getIssueDate(){
    return this.issueDate;
  }

  setIssueDate(date: string){
    this.issueDate = date;
  }

  //Inyectar la dependencia para identificar el inicio de sesion del usuario
  constructor(public authServices: authServices) { }

  onLogin(form: NgForm) {

    if(form.invalid) {
      return;
    }
    this.authServices.login(form.value.login_email, form.value.login_password);
  }

  onSignup(form: NgForm) {
    if(form.invalid){
      return;
    }
    const rolUser = "admin"; //Todo usuario que se registra queda con rol usuario

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

  formatDateBirth( event: any) {
      const data = event;
      this.birthDate = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
  }

  formatIssue( event: any) {
    const data = event;
    this.issueDate = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
}
}

