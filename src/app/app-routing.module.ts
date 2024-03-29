import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";

//Modulos propios: aplicacion
import { LoginComponent } from "./auth/login/login.component";
import { SingUpComponent } from "./auth/singup/singup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

//Modulo para proteger las rutas solo para usuarios con Token
import { authGuard } from './auth/auth.guard';
import { CreateAppointsmentComponent } from "./appointments/create-appointsment/create-appointsment.component";
import { MyAppointsmentsComponent } from './appointments/my-appointsments/my-appointsments.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrarse',
    component: SingUpComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'appointment',
    component: CreateAppointsmentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'my-appointments',
    component: MyAppointsmentsComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    authGuard
  ]
})

export class AppRoutingModule {


}
