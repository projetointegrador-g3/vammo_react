import { Veiculo } from "../../../model/Veiculo";

interface CardVeiculosProps{
    veiculo: Veiculo
}

function CardVeiculos({veiculo}: CardVeiculosProps){
    return(
        <div>principal
            <div>Header
                <img/>
                <h3>
                    {veiculo.modelo}
                </h3>
            </div>
            <div>Body
                <p>{veiculo.placa}</p>
                <p>{veiculo.cor}</p>
                <p>{veiculo.observacao}</p>
                <p>{veiculo.disponivel}</p>
            </div>
            <div>
                Botões
            </div>
        </div>
    )
}
export default CardVeiculos