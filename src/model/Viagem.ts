import { Usuario } from "./Usuario";
import { Veiculo } from "./Veiculo";

export interface Viagem {
    id: number;
    data_ida?: string;
    origem: string;
    destino: string;
    distancia: number;
    velocidade: number;
    preco: number;
    duracao?: number;
    status: string;
    veiculo: Veiculo;  
    usuario: Usuario;
}
