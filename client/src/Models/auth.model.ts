export interface UserModel {
  id: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
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
