import { Veiculos } from "../tipos/tipos";

export interface IMensagens{
    id: string;
    mensagem: string;
}

export const veiculosMock: Array<Veiculos> = [
    {
        name: 'T-11',
        id: 'T-11'
    },
    {
        name: 'T-51',
        id: 'T-51'
    }
]

export const mensagensMock : Array<IMensagens> = [
    {
        id:'ms01',
        mensagem:'Onibus Lotado'
    },
    {
        id:'ms02',
        mensagem:'Acidente envolvendo o Onibus'
    },
    {
        id:'ms03',
        mensagem:'Assalto'
    },
]