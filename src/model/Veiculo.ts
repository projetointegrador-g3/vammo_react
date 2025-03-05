export interface Veiculo {
    id: number;
    modelo: string;
    placa: string;
    ano_fabricacao: number;
    observacao: string;
    disponivel: string;
    viagem?: Veiculo | null;
}