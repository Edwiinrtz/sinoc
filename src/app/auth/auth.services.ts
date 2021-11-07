import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})

export class authServices {

  private isAutheticated = false; //Controla el estado de si existe una sesión abierta
  private token: string; //Almacena el valor del token
  private authStatusListener =  new Subject<boolean>(); //Observador
  private tokenTimer: any; //Tiempo actual del token al iniciar la sesión
  private rolUserStatusListener = new Subject<string>();

  public valorRolTest = "admin"; //pruebas

  //Variables de info de cada usuario
  private nameUser: string;
  private addresUser: string;
  private rolUser: string;
  private idUser: string;
  private lastNameUser: string;
  private emailUser: string;
  private landLineUser: string;
  private birthDateUser: string;
  private issueDateUser: string;

  constructor(private http: HttpClient, private router: Router) { }

  //METODOS::GET
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAutheticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getRolStatusListener() {
    return this.rolUserStatusListener.asObservable();
  }

  getNameUser() {
    return this.nameUser;
  }

  getAddresUser() {
    return this.addresUser;
  }

  getRolUser() {
    return this.rolUser;
  }

  getIDuser() {
    return this.idUser;
  }

  getLastNameUser() {
    return this.lastNameUser;
  }

  getEmailUser() {
    return this.emailUser;
  }

  getLandLineUser() {
    return this.landLineUser;
  }

  getBirthDateUser() {
    return this.birthDateUser;
  }

  getIssueDate() {
    return this.issueDateUser;
  }

  //Metodo para crear usuarios
  createUser(
    name: string,
    lastNames: string,
    id: string,
    issueDate: string,
    birthDate: string,
    eps: string,
    address: string,
    email: string,
    landline: string,
    phoneNumber: string,
    rol: string,
    password: string,
  ) {
    const AuthData: AuthData = {
      name: name,
      lastNames: lastNames,
      id: id,
      issueDate: issueDate,
      birthDate: birthDate,
      eps: eps,
      address: address,
      email: email,
      landline: landline,
      phoneNumber: phoneNumber,
      rol: rol,
      password: password,
    };

    this.http.post('http://localhost:3000/signin', AuthData)
    .subscribe( (response) => {
      console.log("Usuario nuevo:", response);
    });

    this.router.navigate(['/']); //Redireccionar login
  }

  //Metodo que crear el token:: Redirigir al /dashboard
  login(email: string, password: string) {
    const AuthData = {
      id: email,
      password: password
    }

    this.http.post<{token: string, expiresIn: number, user: any}>('http://localhost:3000/login', AuthData)
    .subscribe( (response) => {
      const token = response.token; //Guardar el token que el servidor envia
      this.token = token; //guardarlo en la variable de la clase private::token

      if(token) {
        const expireInDuration = response.expiresIn; //Almacenar el tiempo "1h" que envia el servidor del tiempo que estara el token OK
        this.setAuthTimer(expireInDuration);
        this.isAutheticated = true;
        this.authStatusListener.next(true); //Le pasa el valor a todos sus observadores.::TRUE
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expireInDuration * 1000);
        const rolUser = response.user.info.rol;
        const idUser = response.user.info.id;
        const nameUser = response.user.info.name;
        const lastNameUser = response.user.info.lastNames;
        const emailUser = response.user.info.email;
        const landLineUser = response.user.info.landline;
        const birthDateUser = response.user.info.birthDate;
        const issueDateUser = response.user.info.issueDate;
        this.rolUser = rolUser;
        this.rolUserStatusListener.next(rolUser);
        this.saveAuthData(token, expirationDate, rolUser, idUser, nameUser, lastNameUser, emailUser, landLineUser, birthDateUser, issueDateUser);

        //Funciona:: borrar luego
        this.nameUser = response.user.info.name;
        this.addresUser = response.user.info.address;
        this.router.navigate(['inicio']); //Redireccionar al /dashboard
      }
    })
  }

  //metodo para permitir volver a ingresar si el usaurio recarga la pagina en algun punto y
  //no tener que volver a meter las credenciales en login
  authAuthUser() {
    const authInformation = this.getAuthData();

    if(!authInformation) {
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime(); //Comprueba si la hora actual es mayor a la fecha de vencimiento del token

    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAutheticated = true;
      this.setAuthTimer(expiresIn / 1000); //convertir de milisegundos a segundos
      this.authStatusListener.next(true); //Pasar TRUE a todos los observadores
      this.rolUserStatusListener.next(authInformation.rol);
      this.rolUser = authInformation.rol; //agregar el valor de usuarios segun la información del localStorage en sesion vigente
      this.idUser = authInformation.id; //Cedula del usuario
      this.nameUser = authInformation.name;
      this.lastNameUser = authInformation.lastNames;
      this.emailUser = authInformation.email;
      this.landLineUser = authInformation.landLine;
      this.birthDateUser = authInformation.birthDate;
      this.issueDateUser = authInformation.issueDate;

      console.log(this.lastNameUser);
    }
  }

  private getAuthData() {
    const token= localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const rolUser = localStorage.getItem("rol");
    const idUser = localStorage.getItem("id");
    const nameUser = localStorage.getItem("name");
    const lastNameUser = localStorage.getItem("lastNames");
    const landLineUser = localStorage.getItem("landLine");
    const emailUser= localStorage.getItem("email");
    const birthDateUser = localStorage.getItem("birthDate");
    const issueDateUser = localStorage.getItem("issueDate");

    if(!token && !expirationDate ) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      rol: rolUser,
      id: idUser,
      name: nameUser,
      lastNames: lastNameUser,
      landLine: landLineUser,
      email: emailUser,
      birthDate: birthDateUser,
      issueDate: issueDateUser
    }
  }

  logout(){
    this.token = null;
    this.isAutheticated = false;
    this.rolUser = '';
    this.authStatusListener.next(false);
    this.rolUserStatusListener.next('');
    this.nameUser = '';
    this.lastNameUser = '';
    this.emailUser= '';
    this.landLineUser= '';
    this.birthDateUser = '';
    this.issueDateUser = '';
    clearTimeout(this.tokenTimer); //Resetear el tiempo del token una vez se crea al hacer login
    this.clearAuthData();//Quitar el data
    this.router.navigate(['/']);//redireccionar
  }

  //Metodo para guardar el token y el tiempo de este::LOCAL_STORAGE
  private saveAuthData(token: string, expirationDate: Date, rol: string, id: string,
    nameUser: string, lastName: string, email:string, landLine: string, birthDate: string, issueDate: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('rol', rol);
    localStorage.setItem('id', id);
    localStorage.setItem('name', nameUser);
    localStorage.setItem('lastNames', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('landLine', landLine);
    localStorage.setItem('birthDate', birthDate);
    localStorage.setItem('issueDate', issueDate);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("rol");
    localStorage.removeItem("id");
    localStorage.removeItem('name');
    localStorage.removeItem('LastName');
    localStorage.removeItem('email');
    localStorage.removeItem('landLine');
    localStorage.removeItem('birthDate');
    localStorage.removeItem('issueDate');
  }

  //Metodo que elimina el token cuando haya pasado el tiempo valido del token "1h"
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {//Temporaizador
      this.logout();
    }, duration * 1000); //Convertir los 3600seg a 360000 se trabaja con milisegundos
  }
}
