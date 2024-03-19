import axios from "axios";
import { LoginForm, LoginResponse, UserData } from "../tipos/tipos";


export const logar = async (formData: LoginForm): Promise<LoginResponse> => {
    try {
      const response = await axios.post<UserData>('http://192.168.18.29:3000/login', formData);
      return response;
    } catch (error) {
      throw new Error('Erro ao fazer login. Por favor, tente novamente.');
    }
};
