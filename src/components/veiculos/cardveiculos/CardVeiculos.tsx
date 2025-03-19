import { Link } from "react-router-dom";
import { Veiculo } from "../../../model/Veiculo";
import { SquarePen, Trash } from "lucide-react";

interface CardVeiculosProps{
    veiculo: Veiculo
}

function CardVeiculos({veiculo}: CardVeiculosProps){
    return(
        <div className="container grid grid-cols-1 rounded-4xl shadow bg-[#f6f5fa] relative
         w-[90%] my-3 mr-3 card-resp">

            {/* Botões de editar e excluir */} 
            <div className="flex justify-end space-x-2 mr-3 mt-5">
                <Link to={`/editarveiculo/${veiculo.id}`}>
                <button className="text-gray-500 cursor-pointer hover:animate-bounce">
                    <SquarePen className="size-5"/>
                </button>
                </Link>
                <Link to={`/deletarveiculo/${veiculo.id}`}>
                <button className="text-gray-500 cursor-pointer hover:animate-bounce">
                    <Trash className="size-5" />
                </button>
                </Link>
            </div>

            <div className="flex resp-veiculos">

            {/* Imagem do veículo */}
            <img className="w-80 h-45 object-cover rounded-lg img-veiculos" 
            src={veiculo.foto} alt={veiculo.modelo}/>
            
            {/* Conteúdo cards */}
            <main className="flex flex-col justify-center gap-2 text-sm">
                <p><strong>Modelo: </strong>{veiculo.modelo}</p>
                <p><strong>Placa:</strong> {veiculo.placa}</p>
                <p><strong>Cor: </strong>{veiculo.cor}</p>
                <p><strong>Ano: </strong>{veiculo.ano_fabricacao}</p>
                <p><strong>Observação: </strong>{veiculo.observacao}</p>
                <p >{veiculo.disponivel}</p>
            </main>
            </div>
        </div>
    )
}
export default CardVeiculos