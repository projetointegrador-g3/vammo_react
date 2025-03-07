export class Viagem {
    private viagensRealizadas: number;
    private tipoUsuario: 'motorista' | 'passageiro';

    constructor(tipoUsuario: 'motorista' | 'passageiro') {
        this.viagensRealizadas = 0;
        this.tipoUsuario = tipoUsuario;
    }

    public realizarViagem(valorViagem: number): number {
        this.viagensRealizadas += 1;

        if (this.viagensRealizadas % 10 === 1 && this.viagensRealizadas > 1) {
            const bonus = Math.floor(this.viagensRealizadas / 10) * 10;

            if (this.tipoUsuario === 'passageiro') {
                const desconto = bonus / 100;
                return valorViagem * (1 - desconto);
            } else if (this.tipoUsuario === 'motorista') {
                const bonusValor = valorViagem * (bonus / 100);
                return valorViagem + bonusValor;
            }
        }

        return valorViagem;
    }

    public getViagensRealizadas(): number {
        return this.viagensRealizadas;
    }

    public resetarContagem(): void {
        this.viagensRealizadas = 0;
    }
}