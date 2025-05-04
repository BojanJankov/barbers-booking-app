import { Barber } from "./barber.model";

export interface Service {
  id: number;
  name: string;
  price: string;
  barber: Barber;
}
