import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Appointments, TipoConsulta, Medico, Horario } from './appointments-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private appointments: Appointments[] = [];
  private appointmentsUpdated = new Subject<Appointments[]>();

  //Modelos de la interfaces Tipo de consulta
  private tipoConsultas: TipoConsulta[] = [
    {
      value: "Tipo consulta 1",
      viewValue: "Tipo consulta 1",
    },
    {
      value: "Tipo consulta 2",
      viewValue: "Tipo consulta 2",
    },
    {
      value: "Tipo consulta 3",
      viewValue: "Tipo consulta 3",
    }
  ]

  //Modelos de la interfaces Medico
  private medicos: Medico[] = [
    {
      especialista: "Tipo consulta 1",
      value: "Medico 1 id 1",
      viewValue: "Medico 1 id 1",
    },
    {
      especialista: "Tipo consulta 1",
      value: "Medico 2 id 1",
      viewValue: "Medico 2 id 1",
    },
    {

      especialista: "Tipo consulta 2",
      value: "Medico 1 id 2",
      viewValue: "Medico 1 id 2",
    },
    {
      especialista: "Tipo consulta 2",
      value: "Medico 1 id 2",
      viewValue: "Medico 1 id 2",
    }
  ]

  private horarios: Horario[] = [
    {
      doctor: "Medico 1 id 1",
      value: "8:am",
      viewValue: "8:am",
      status: "disponible"
    },
    {
      doctor: "Medico 1 id 1",
      value: "9:am",
      viewValue: "9:am",
      status: "cerrado"
    },
    {
      doctor: "Medico 1 id 1",
      value: "10:am",
      viewValue: "10:am",
      status: "disponible"
    }
  ]


  constructor(private http: HttpClient, private router: Router) {}

  getTipoConsultas(): TipoConsulta[] {
    return this.tipoConsultas;
  }

  getMedicos(): Medico[] {
    return this.medicos;
  }

  getHorarios(): Horario[] {
    return this.horarios;
  }


  getAppointments(){
    //Obtener los datos json por metodos GET de HTTP protocol
    this.http.get<{message:string, appointments: Appointments[]}>('http://localhost:3000/appointments')
    .subscribe( (postData) => {
      this.appointments = postData.appointments;
      this.appointmentsUpdated.next([...this.appointments]);
    });
  }

  getPostUpdateListener () {
    return this.appointmentsUpdated.asObservable();
  }

  createAppointment(name: string, email: string, appointmentDate: string) {
    const appointment  = {
      name: name,
      email: email,
      appointmentDate: appointmentDate
    };

    //Mandar data
    this.http.post<{message:string}>('http://localhost:3000/appointments', appointment)
    .subscribe ((responseData) => {
      console.log(responseData.message);
      //this.posts.push(post);
      //this.postsUpdated.next([...this.posts]);
    });
  }


}
