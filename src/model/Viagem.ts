export interface Viagem {
    id: number;
    data_ida: string;
    origem: string;
    destino: string;
    distancia: string;
    velocidade: string;
    duracao: string;
    status: string;
    veiculo?: Viagem | null;

}