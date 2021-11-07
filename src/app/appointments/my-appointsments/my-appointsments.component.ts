import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { mergeMap } from  'rxjs/operators';
import { Subscription } from 'rxjs';
import { CrearCita } from '../appointments-interfaces';
import { Quote } from '@angular/compiler';

@Component({
  selector: 'app-my-appointsments',
  templateUrl: './my-appointsments.component.html',
  styleUrls: ['./my-appointsments.component.css']
})
export class MyAppointsmentsComponent implements OnInit {

  public myQuotes: CrearCita[] = [];
  private myQuotesListener: Subscription;

  constructor(private AppointmentsService: AppointmentsService) { }

  ngOnInit(): void {
    this.AppointmentsService.getAppointments();
    console.log("Data componente" , this.AppointmentsService.getAppointments());
    this.myQuotesListener = this.AppointmentsService.getAppointmentsUpdateListener()
    .subscribe ( (Quotes: CrearCita[]) => {
      this.myQuotes = Quotes;
      console.log("data Quotes::: " , Quotes);
    })
   }


}
