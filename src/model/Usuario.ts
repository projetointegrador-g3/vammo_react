export interface Usuario {
    id: number;
    tipo_user: string;
    nome: string ;
    data_aniversario: string;
    genero: string;
    usuario: string;
    senha: string;
    foto: string;
    avaliacao: number;
    viagem?: Usuario | null;
}