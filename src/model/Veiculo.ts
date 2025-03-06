import { Viagem } from "./Viagem";

export interface Veiculo {
    id: number;
    modelo: string;
    placa: string;
    cor: string;
    ano_fabricacao: number;
    observacao: string;
    disponivel: boolean;
    viagem?: Viagem | null;
}
