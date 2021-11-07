import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { authServices } from './auth.services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authServices: authServices){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authServices.getToken(); //almacena el token actual del usuario
    const authRequest = req.clone({ //Devuelve el token actual del usuario:"angular" al servidor "node" con el identificador "Authorization"
      headers: req.headers.set('Authorization', "Bearer" + authToken)
    });


    return next.handle(authRequest); //Retornar el valor del token y continua con las demás instrucciones "next"
  }
}
