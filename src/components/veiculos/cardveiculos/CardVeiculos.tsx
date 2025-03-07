import { Link } from "react-router-dom";
import { Veiculo } from "../../../model/Veiculo";
import { SquarePen, Trash } from "lucide-react";

interface CardVeiculosProps{
    veiculo: Veiculo
}

function CardVeiculos({veiculo}: CardVeiculosProps){
    return(
        <div className="container grid grid-cols-1 rounded-4xl shadow bg-[#f6f5fa] relative
         w-350 min-h-[250px] my-3 mr-3">

            {/* Botões de editar e excluir */} 
            <div className="flex justify-end space-x-2 mr-3 my-5">
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

            {/* Imagem do veículo */}
            <img className="w-32 h-32 object-cover rounded-lg" 
            src={veiculo.foto} alt={veiculo.modelo}/>
            
            {/* Conteúdo cards */}
            <main className="flex flex-col mx-100 my-15 justify-center absolute gap-2 text-sm tex-center">
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