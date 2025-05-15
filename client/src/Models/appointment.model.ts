import { Barber } from "./barber.model";
import { Schedule } from "./schedule.model";
import { Service } from "./service.model";

export interface Appointment {
  id: number;

  clientName: string;
  clientPhone: string;
  clientEmail: string;
  barber: Barber;
  service: Service;
  schedule: Schedule;
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
