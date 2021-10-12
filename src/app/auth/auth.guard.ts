import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from "rxjs";
import { authServices } from './auth.services';

@Injectable()
export class authGuard implements CanActivate {

  constructor(private authServices: authServices, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.authServices.getIsAuth();
    if(!isAuth) {
      this.router.navigate(['/']);
    }
      return isAuth;
  }
}
