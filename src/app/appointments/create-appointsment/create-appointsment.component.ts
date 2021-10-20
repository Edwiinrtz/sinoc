import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { authServices } from '../../auth/auth.services';
import { NgForm } from '@angular/forms';
import { TipoConsulta, Medico, Horario} from '../appointments-interfaces';

@Component({
  selector: 'app-create-appointsment',
  templateUrl: './create-appointsment.component.html',
  styleUrls: ['./create-appointsment.component.css']
})
export class CreateAppointsmentComponent implements OnInit {

  public idUser = this.authServices.getIDuser();

  public sedes = [
    {
      value: "sede1",
      viewValue: 'Sede1'
    },
    {
      value: "sede2",
      viewValue: 'Sede2'
    },
    {
      value: "sede3",
      viewValue: 'Sede3'
    }
  ];

  public selectedTipoConsulta: TipoConsulta = { value: "", viewValue: ""};
  public tiposConsultas: TipoConsulta[];
  public medicos: Medico[];
  public horarios: Horario[];
  public prueba: string;

  constructor(private AppointmentsService: AppointmentsService, private authServices: authServices) { }

  ngOnInit(): void {
    this.tiposConsultas = this.AppointmentsService.getTipoConsultas();
  }

  onSelectTipoConsulta(value: string): void {
    console.log("valor id " , value);
    this.medicos = this.AppointmentsService.getMedicos().filter(item => item.especialista === value);



  }

  onSelectMedico(value: string): void {
    console.log("valor doctor " , value);
    this.horarios = this.AppointmentsService.getHorarios().filter(item => item.doctor == value && item.status== "disponible");
  }

  createAppointment(form: NgForm) {

    console.log("valores de form " , form);
    if(form.invalid){
      return;
    }
    console.log("forms " , form.value.tipo_consulta);
    console.log("forms " , form.value.medico);
    console.log("forms " , form.value.horarios);

  }
}
