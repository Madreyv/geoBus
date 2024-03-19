import { AxiosResponse } from "axios";

export interface Veiculos {
  name: string;
  id: string;
}

export interface LoginForm {
  Senha: string;
  Email:string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
}
export type LoginResponse = AxiosResponse<UserData>;

