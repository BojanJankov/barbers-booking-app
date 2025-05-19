import { Barber } from "./barber.model";

export interface Rating {
  id: number;
  rating: number;
  barber: Barber;
}
