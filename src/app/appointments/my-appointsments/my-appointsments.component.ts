import { Component, OnInit } from '@angular/core';
import { Appointments } from '../appointments-interfaces';
import { AppointmentsService } from '../appointments.service';
import { mergeMap } from  'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-appointsments',
  templateUrl: './my-appointsments.component.html',
  styleUrls: ['./my-appointsments.component.css']
})
export class MyAppointsmentsComponent implements OnInit {

  public loading = true;
  public errorMsg : string;
  public successMsg: string;
  public columns = ['cc','email','sede','tipo_consulta','status'];

  listAppointments: Appointments[] = [];
  private postAppointments: Subscription;

  constructor(private AppointmentsService: AppointmentsService) { }

  ngOnInit(): void {

    this.AppointmentsService.getAppointments();
    this.postAppointments = this.AppointmentsService.getPostUpdateListener()
    .subscribe( (appointments: Appointments[]) => {
      console.log("appointments" , appointments)
      this.listAppointments = appointments;
      this.loading = false;
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
      this.loading = false;
    });

    // this.AppointmentsService.getAppointments()
    // .subscribe((appointments) => {
    //   console.log("appointments" , appointments)
    //   this.appointments = appointments;
    //   this.loading= false;
    // },
    // (error: ErrorEvent) => {
    //   this.errorMsg = error.error.message;
    //   this.loading = false;
    // })
  }

  // cancelAppointment(id: string) {
  //   this.AppointmentsService.cancelAppointments(id)
  //   .pipe(
  //     mergeMap( () => this.AppointmentsService.getAppointments())
  //   )
  //   .subscribe( (appointments: Appointments[]) => {
  //     this.appointments = appointments;
  //     this.successMsg = "Se elimino la cita"
  //   },
  //   (error: ErrorEvent) => {
  //     this.errorMsg = error.error.message;
  //   })
  // }

}
