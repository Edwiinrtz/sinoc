import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})

export class authServices {

  private isAutheticated = false; //Controla el estado de si existe una sesión abierta
  private token: string; //Almacena el valor del token
  private authStatusListener =  new Subject<boolean>(); //Observador
  private tokenTimer: any; //Tiempo actual del token al iniciar la sesión
  private rolUser: string; //almacenar el rol del usuario
  private idUser: string;
  private rolUserStatusListener = new Subject<string>();

  public valorRolTest = "admin"; //pruebas

  //Variables de info de cada usuario
  private nameUser;
  private addresUser;

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

  //Metodo para crear usuarios
  createUser(
    name: string,
    lastName: string,
    id: string,
    issueDate: string,
    birthDate: string,
    eps: string,
    address: string,
    email: string,
    landLine: string,
    phoneNumber: string,
    rol: string,
    password: string,
  ) {
    const AuthData: AuthData = {
      name: name,
      lastName: lastName,
      id: id,
      issueDate: issueDate,
      birthDate: birthDate,
      eps: eps,
      address: address,
      email: email,
      landLine: landLine,
      phoneNumber: phoneNumber,
      rol: rol,
      password: password,
    };


    this.http.post('http://localhost:3000/signin', AuthData)
    .subscribe( (response) => {
      console.log("Método crear usuario", response);
    });

  }

  //Metodo que crear el token:: Redirigir al /dashboard
  login(email: string, password: string) {
    const AuthData = {
      id: email,
      password: password
    }

    this.http.post<{token: string, expiresIn: number, user: any}>('http://localhost:3000/login', AuthData)
    .subscribe( (response) => {
      console.log("response" , response.user.info);
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
        this.rolUser = rolUser;
        this.rolUserStatusListener.next(rolUser);
        this.saveAuthData(token, expirationDate, rolUser, idUser);

        //Funciona:: borrar luego
        this.nameUser = response.user.info.name;
        this.addresUser = response.user.info.address;
        this.router.navigate(['dashboard']); //Redireccionar al /dashboard
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
    }
  }

  private getAuthData() {
    const token= localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const rolUser = localStorage.getItem("rol");
    const idUser = localStorage.getItem("id");

    if(!token && !expirationDate ) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      rol: rolUser,
      id: idUser
    }
  }

  logout(){
    this.token = null;
    this.isAutheticated = false;
    this.rolUser = '';
    this.authStatusListener.next(false);
    this.rolUserStatusListener.next('');
    clearTimeout(this.tokenTimer); //Resetear el tiempo del token una vez se crea al hacer login
    this.clearAuthData();//Quitar el data
    this.router.navigate(['/']);//redireccionar
  }

  //Metodo para guardar el token y el tiempo de este::LOCAL_STORAGE
  private saveAuthData(token: string, expirationDate: Date, rol: string, id: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('rol', rol);
    localStorage.setItem('id', id);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("rol");
    localStorage.removeItem("id");
  }

  //Metodo que elimina el token cuando haya pasado el tiempo valido del token "1h"
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {//Temporaizador
      this.logout();
    }, duration * 1000); //Convertir los 3600seg a 360000 se trabaja con milisegundos
  }
}
