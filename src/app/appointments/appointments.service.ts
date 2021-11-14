import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Citas, CrearCita, CalendarioDoctor, TipoConsulta, Medico, Horario, Sede, Fecha } from './appointments-interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  //private appointments: Appointments[] = [];
  //private appointmentsUpdated = new Subject<Appointments[]>();
  private tipoConsultas: TipoConsulta[] = [];
  private sedes: Sede[] = [];
  private medicos: Medico[] = [];
  private horarios: Horario[] = [];
  private fecha: Fecha[] = [];
  private allQuotes: Citas[] = [];
  private allQuotesUpdated = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {}

  getSedes(): Sede[] {
    return this.sedes;
  }

  getTipoConsultas(): TipoConsulta[] {
    return this.tipoConsultas;
  }

  getMedicos(): Medico[] {
    return this.medicos;
  }

  getHorarios(): Horario[] {
    return this.horarios;
  }

  getFecha() {
    return this.fecha;
  }

  getAppointmentsUpdateListener () {
    return this.allQuotesUpdated.asObservable();
  }

  getDataCreateAppointment() {
    this.http.get<any>('http://localhost:3000/appointments')
    .subscribe( (postData) => {

      //Asignar los valores a los arrays de cada componente
      for(let i= 0; i < postData.length; i++) {
        this.tipoConsultas[i] = {
          idSede: postData[i].place,
          value: postData[i].KindOf,
          viewValue: postData[i].KindOf,
        };

        this.sedes[i] = {
          value: postData[i].place,
          viewValue: postData[i].place
        }

        this.medicos[i] = {
          idTipoConsulta: postData[i].KindOf,
          idSede: postData[i].place,
          value: postData[i].doctor,
          viewValue: postData[i].doctor
        }

        this.horarios[i]= {
          idMedico: postData[i].doctor,
          idFecha: postData[i].date,
          value: postData[i].time,
          viewValue: postData[i].time,
          status: postData[i].status
        }
      }

      console.log("horarios, ", this.horarios);
    });
  }

  getAppointments(idUser: string){
    this.http.post<any>('http://localhost:3000/myQuotes', { id: idUser } )
    .pipe(map( (postData) => {
      return postData.map( post => {
        return {
          available_date: post.available_date,
          available_time: post.available_time,
          email: post.email,
          id: post.id,
          landline: post.landline,
          lastNames: post.lastNames,
          name: post.name,
          place: post.place,
          requested_doctor: post.requested_doctor,
          type_of_query: post.type_of_query,
          _id: post._id
        }
      })
    }))
    .subscribe( (DataConvertidapost) => {
      this.allQuotes = DataConvertidapost;
      this.allQuotesUpdated.next([...this.allQuotes]);
    });
  }

  createAppointment(name: string, lastName: string, id: string, email:string, landline: string, place: string, kindOf: string, doctor: string, date: string, time: string) {
    const appointment: CrearCita = {
      name: name,
      lastNames: lastName,
      id: id,
      email: email,
      landline: landline,
      place: place,
      type_of_query: kindOf,
      requested_doctor: doctor,
      available_date: date,
      available_time: time
    };

    this.http.post('http://localhost:3000/newquote', appointment)
    .subscribe ((responseData) => {
      console.log("datos enviados al server, ruta:::> /newquote");
    });

    this.router.navigate(['/mis-citas']); //Redireccionar al /mis/citas
  }

  createAppointmentDoctor(place: string, KindOf: string, doctor: string, date: string, time: string) {
    const appointment: CalendarioDoctor = {
      place: place,
      KindOf: KindOf,
      doctor: doctor,
      date: date,
      time: time,
      status: 'available',
    }

    this.http.post('http://localhost:3000/newAppointment', appointment)
    .subscribe ((responseData) => {
      console.log("datos enviados al server, ruta:::> /newAppointment");
    });
  }

  deleteAppointment(AppointmentId: string) {
    this.http.delete('http://localhost:3000/newquote/ ' + AppointmentId)
    .subscribe(() => {
      const updatedAppointments = this.allQuotes.filter(data => data._id != AppointmentId);
      this.allQuotes = updatedAppointments;
      this.allQuotesUpdated.next([...this.allQuotes]);
    })
  }

}
