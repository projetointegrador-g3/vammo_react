import { Link } from "react-router-dom";
import { Viagem } from "../../../model/Viagem";
import { SquarePen, Star, Trash } from "lucide-react";
import { useState } from "react";

interface CardViagensProps {
  viagem: Viagem;
}

function CardViagens({ viagem }: CardViagensProps) {

  const [rating, setRating] = useState<number>(0); // Estado para armazenar a nota
  
  return (
    <div className="bg-[#F2F2F2] p-3 w-80 rounded-4xl shadow ml-10 mb-5 ">
      {/* Botões de editar e excluir */} 
      <div className="flex justify-end space-x-2 mr-3">
        <Link to={`/editarviagem/${viagem.id}`}>
          <button className="text-gray-500 hover:text-[var(--colorCyan)] cursor-pointer hover:animate-bounce">
            <SquarePen className="size-5"/>
          </button>
        </Link>
        <Link to={`/deletarviagem/${viagem.id}`}>
          <button className="text-gray-500 hover:text-[var(--colorRed)] cursor-pointer hover:animate-bounce">
            <Trash className="size-5" />
          </button>
        </Link>
      </div>

      <main className="flex flex-col gap-3 ml-5">
      <p className="font-bold mt-3 mb-2 text-center text-2xl mr-5">Informações da viagem </p>

        <p>
          <strong>Destino:</strong> {viagem.destino} </p>
        <p>
          <strong>Distância: </strong>{viagem.distancia} km
        </p>
        <p>
          <strong>Data:</strong>
          {" "}
          {viagem.data_ida
            ? new Intl.DateTimeFormat(undefined, {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(viagem.data_ida))
            : "Data inválida"}
        </p>
        <p>
          <strong>Velocidade: </strong>{viagem.velocidade} KM/H
        </p>
        <p>
          <strong>Duração: </strong>{viagem.duracao} horas
        </p>
        <p>
          <strong>Preço: </strong>R$: {viagem.preco.toFixed(2)}
        </p>
        <p>
          <strong>Status: </strong>{viagem.status}
        </p>
        <p>
          <strong>Veículo: </strong>
          {viagem.veiculo.modelo}
        </p>

        {/* Estrelas de Avaliação */}
        <div className="flex gap-1 mt-3 cursor-pointer mb-8 ml-15">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                onClick={() => setRating(index + 1)}
                className="text-yellow-400 text-2xl hover:scale-110 transition"
              >
                {rating > index ? <Star size={24} fill="gold" /> : <Star size={24} />}
              </span>
            ))}
        </div>
      </main>
    </div>
  );
}

export default CardViagens;
