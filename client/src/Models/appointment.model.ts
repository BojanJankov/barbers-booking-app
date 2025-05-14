import { Barber } from "./barber.model";
import { Service } from "./service.model";

export interface Appointment {
  id: number;
  day: string;
  term: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  barber: Barber;
  service: Service;
}

export interface AppointmentReq {
  day: string;
  term: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  barberId: number;
  serviceId: number;
}
