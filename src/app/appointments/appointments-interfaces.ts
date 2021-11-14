export interface CrearCita {
  name: string;
  lastNames: string;
  id: string;
  email: string;
  landline: string;
  place: string;
  type_of_query: string;
  requested_doctor: string;
  available_date: string;
  available_time: string;
}

export interface Citas {
  _id: string;
  name: string;
  lastNames: string;
  id: string;
  email: string;
  landline: string;
  place: string;
  type_of_query: string;
  requested_doctor: string;
  available_date: string;
  available_time: string;
}

export interface CalendarioDoctor {
  place: string;
  KindOf: string;
  doctor: string;
  date: string;
  time: string;
  status: string;
}

export interface Sede {
  value: string;
  viewValue: string;
}

export interface TipoConsulta {
  idSede: string;
  value: string;
  viewValue: string;
}

export interface Medico {
  idTipoConsulta: string;
  idSede: string;
  value: string;
  viewValue: string;
}

export interface Fecha {
  value: string;
}


export interface Horario {
  idMedico: string;
  idFecha: string;
  value: string;
  viewValue: string;
  status: string;
}
