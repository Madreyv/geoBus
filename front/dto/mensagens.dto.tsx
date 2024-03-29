import { Mensagens } from "../tipos/tipos";


export const toMensagens = (data:any): Mensagens => {
    let mensagem: Mensagens = {
        id: data.id,
        mensagem:data.texto
    }
    
    return mensagem;

} 