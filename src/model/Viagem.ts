import { Usuario } from "./Usuario";
import { Veiculo } from "./Veiculo";

export interface Viagem {
    id: number;
    data_ida: string;
    origem: string;
    destino: string;
    distancia: string;
    velocidade: string;
    duracao: string;
    status: string;
    veiculo?: Veiculo | null;
    usuario?: Usuario | null;
}