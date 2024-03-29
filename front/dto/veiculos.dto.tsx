import { Veiculos } from "../tipos/tipos";

export const toVeiculos = (data:any): Veiculos => {
    
    let veiculo: Veiculos = {
        id: data.id,
        name:data.name
    }

    return veiculo;

} 