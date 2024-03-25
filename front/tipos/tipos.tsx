import { AxiosResponse } from "axios";

export interface Veiculos {
  name: string;
  id: string;
}

export interface LoginForm {
  senha: string;
  email:string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  token?:string
}
export type LoginResponse = AxiosResponse<UserData>;

export type CadastrarForm = {
  nome: string;
  senha: string;
  email:string;
  confirmarSenha:string;
};

export type AuthContextType = {
  user: any,
  token: string|null,
  login: Function,
  logout: Function
}