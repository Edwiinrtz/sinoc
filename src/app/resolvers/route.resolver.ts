import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';
import { authServices } from '../auth/auth.services';

@Injectable()

export class RouteResolver implements Resolve<any> {

  constructor(private authServices: authServices){}

  resolve(){
    return "ok";
  }
}
