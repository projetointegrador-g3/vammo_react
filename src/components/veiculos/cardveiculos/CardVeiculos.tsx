import { Veiculo } from "../../../model/Veiculo";

interface CardVeiculosProps{
    veiculo: Veiculo
}

function CardVeiculos({veiculo}: CardVeiculosProps){
    return(
        <div className="bg-[var(--colorWhite)] p-4 rounded-lg shadow-2xl relative w-70">
            <div >
                <h3>
                    {veiculo.modelo}
                </h3>
            </div>
            <main className="flex flex-col items-center gap-2">
                <p className="font-bold mt-3 text-center">{veiculo.placa}</p>
                <p className='text-[var(--colorGrey)] text-sm text-center'>{veiculo.cor}</p>
                <p className='text-[var(--colorGrey)] text-sm text-center'>{veiculo.observacao}</p>
                <p className='text-[var(--colorGrey)] text-sm text-center'>{veiculo.disponivel}</p>
            </main>
        </div>
    )
}
export default CardVeiculos