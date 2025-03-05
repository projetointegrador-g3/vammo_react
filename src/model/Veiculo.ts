import { Viagem } from "./Viagem";

export interface Veiculo {
    id: number;
    modelo: string;
    placa: string;
    cor: string;
    ano_fabricacao: number;
    observacao: string;
    disponivel: string;
    viagem?: Viagem | null;
}