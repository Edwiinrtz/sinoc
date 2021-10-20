import { NumericType } from "mongodb";

export interface Appointments {
  _id: string;
  cc: string;
  email: string;
  sede: string;
  tipo_consulta: string;
  //medico_solicitado: string,
  //fecha_disponible: string;
  //hora_disponible: string;
  status: string;
}

export interface TipoConsulta {
  value: string;
  viewValue: string;
}

export interface Medico {
  especialista: string;
  value: string;
  viewValue: string;
}

export interface Horario {
  doctor: string;
  value: string;
  viewValue: string;
  status: string;
}
