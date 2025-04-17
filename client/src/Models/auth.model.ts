import { Barber } from "./barber.model";

export interface UserModel {
  id: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
  barber: Barber;
  lastName: string;
  role: "admin" | "user" | "barber";
}

export interface UserModelReq {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}
