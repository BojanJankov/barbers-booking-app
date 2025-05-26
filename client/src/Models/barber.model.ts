import { Rating } from "./rating.model";
import { Service } from "./service.model";

export interface Barber {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  experience: string;
  image: string;
  bussinesName: string;
  city: string;
  address: string;
  description: string;
  services: Service[];
  ratings: Rating[];
}
