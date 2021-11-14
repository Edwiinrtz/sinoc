import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { Subscription } from 'rxjs';
import { CrearCita } from '../appointments-interfaces';
import { authServices } from '../../auth/auth.services';

@Component({
  selector: 'app-my-appointsments',
  templateUrl: './my-appointsments.component.html',
  styleUrls: ['./my-appointsments.component.css']
})
export class MyAppointsmentsComponent implements OnInit {

  public myQuotes: CrearCita[] = [];
  private myQuotesListener: Subscription;

  public nameUser: string = this.authServices.getNameUser();
  public lastNamesUser: string = this.authServices.getLastNameUser();
  public idUser = this.authServices.getIDuser();

  constructor(private AppointmentsService: AppointmentsService, private authServices: authServices) { }

  ngOnInit(): void {

    this.AppointmentsService.getAppointments(this.idUser);
    this.myQuotesListener = this.AppointmentsService.getAppointmentsUpdateListener()
    .subscribe ( (Quotes: CrearCita[]) => {
      this.myQuotes = Quotes;
    })
   }

   onDelete(citaId: string) {
    this.AppointmentsService.deleteAppointment(citaId);
  }


}
