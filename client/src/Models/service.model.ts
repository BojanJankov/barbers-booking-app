import { Barber } from "./barber.model";

export interface Service {
  id: number;
  name: string;
  price: number;
  barber: Barber;
}

export interface ServiceReq {
  name: string;
  price: number;
}
