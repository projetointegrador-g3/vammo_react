import { Veiculo } from "../../../model/Veiculo";

interface CardVeiculosProps{
    veiculo: Veiculo
}

function CardVeiculos({veiculo}: CardVeiculosProps){
    return(
        <div className="p-4 rounded-lg shadow relative w-100 mx-20 my-5">
            
            <main className="flex flex-col items-center gap-2 text-sm tex-center">
                <p><strong>Modelo: </strong>{veiculo.modelo}</p>
                <p><strong>Placa:</strong> {veiculo.placa}</p>
                <p><strong>Cor: </strong>{veiculo.cor}</p>
                <p><strong>Ano: </strong>{veiculo.ano_fabricacao}</p>
                <p><strong>Observação: </strong>{veiculo.observacao}</p>
                <p >{veiculo.disponivel}</p>
            </main>
        </div>
    )
}
export default CardVeiculos