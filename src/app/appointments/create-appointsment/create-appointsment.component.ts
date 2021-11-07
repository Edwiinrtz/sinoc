import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { authServices } from '../../auth/auth.services';
import { NgForm } from '@angular/forms';
import { TipoConsulta, Medico, Horario, Sede } from '../appointments-interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-appointsment',
  templateUrl: './create-appointsment.component.html',
  styleUrls: ['./create-appointsment.component.css']
})
export class CreateAppointsmentComponent implements OnInit {

  private cambioFecha;
  private sedeActual;
  private cambioDoctor;
  public submitted: boolean;
  public tiposConsultas: TipoConsulta[];
  public medicos: Medico[];
  public horarios: Horario[];
  public sedes: Sede[];
  public filtroSedes: Sede[];

  //Values de pipe
  public pipeSede = "value";
  public pipeTipoConsulta = "value";
  public pipeMedico: "value;"

  //Valores del storage
  public nameUser = this.authServices.getNameUser();
  public lastNameUser = this.authServices.getLastNameUser();
  public idUser = this.authServices.getIDuser();
  public emailUser = this.authServices.getEmailUser();
  public landLineUser = this.authServices.getLandLineUser();

  constructor(private AppointmentsService: AppointmentsService, private authServices: authServices) { }

  ngOnInit(): void {
    this.sedes = this.AppointmentsService.getSedes();
    this.AppointmentsService.getDataCreateAppointment();
    //this.AppointmentsService.createAppointmentDoctor("Bello", "General", "Carlos","14-10-2021","5:00");//funciona
  }

  onSelectSedes(value: string): void {
    this.tiposConsultas = this.AppointmentsService.getTipoConsultas().filter( item => item.idSede == value);
    this.sedeActual = value;
    console.log("dato sede onSelectSedes", this.sedeActual);


  }

  onSelectTipoConsulta(value: string): void {
    console.log("dato sede onSelectTipoConsulta", this.sedeActual);
    console.log("medicos" , this.AppointmentsService.getMedicos());
    this.medicos = this.AppointmentsService.getMedicos().filter(item => item.idTipoConsulta === value);
  }

  onSelectMedico(value: string): void {
    this.cambioDoctor = value;
    //this.horarios = this.AppointmentsService.getHorarios().filter(item => item.idFecha == value && item.status== "available");
  }

  onSelectDate(value: any): void {

    if(!value) {
      return
    } else {
      this.cambioFecha = value.getDate() + '-' + (value.getMonth() + 1) + '-' + value.getFullYear();
      this.horarios = this.AppointmentsService.getHorarios().filter(item => item.idFecha == this.cambioFecha && item.status== "available" && item.idMedico == this.cambioDoctor);
      const data= this.AppointmentsService.getHorarios();
      console.log("horarios::" , this.AppointmentsService.getHorarios());

      console.log("horarios" , this.AppointmentsService.getHorarios());

      for(let i =0; i < data.length; i++){
        if(data[i].idFecha == this.cambioFecha) {
          console.log("Fechas coinciden");
        } else {
          console.log("Fechas diferentes");
        }
      }
    }
  }

  createAppointment(form: NgForm) {

    console.log("data Date::: " , form.value.singup_issueDate);
    if(form.invalid){
      return;
    }

    this.AppointmentsService.createAppointment(
      this.nameUser,
      this.lastNameUser,
      this.idUser,
      this.emailUser,
      this.landLineUser,
      form.value.singup_eps,
      form.value.tipo_consulta,
      form.value.medico,
      this.cambioFecha,
      form.value.horarios
    );
    form.resetForm();
  }

  prueba(form: NgForm) {
    this.tiposConsultas = [];
    this.medicos = [];
    this.horarios = [];
    form.resetForm();
  }

}
