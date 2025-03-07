import { Veiculo } from "../../../model/Veiculo";

interface CardVeiculosProps{
    veiculo: Veiculo
}

function CardVeiculos({veiculo}: CardVeiculosProps){
    return(
        <div className="container grid grid-cols-1 rounded-4xl bg-[#D8DFE9] relative
         w-350 min-h-[250px] my-5">
            
            <main className="flex flex-col mx-20 justify-center gap-2 text-sm tex-center bg-[#D8DFE9]">
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