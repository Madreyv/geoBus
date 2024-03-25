import axios from "axios";
import { CadastrarForm, LoginForm, LoginResponse, UserData } from "../tipos/tipos";

const ENDERECO = 'http://192.168.18.29:3000/';
export const logar = async (formData: LoginForm): Promise<any> => {
    try {
      const response = await axios.post<UserData>(ENDERECO+'user/logar', formData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao fazer login. Por favor, tente novamente.');
    }
};

export const cadastrar = async (formData:CadastrarForm): Promise<any> => {
  try{
    const response = await axios.post<CadastrarForm>(ENDERECO+'user/cadastrar', formData);
    return response
  }catch(error){
    console.log('error', error)
    throw new Error('Não foi possível realizar o cadastro. Por favor, tente mais tarde.')
  }
}
