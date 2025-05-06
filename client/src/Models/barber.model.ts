import { Service } from "./service.model";

export interface Barber {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  experience: string;
  image: string;
  services: Service[];
}
