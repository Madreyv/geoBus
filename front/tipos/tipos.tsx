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
  token?:string;
  idVeiculo?:number;
}
export type LoginResponse = AxiosResponse<UserData>;

export type Mensagens = {
  id: string;
  mensagem: string;
}
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

