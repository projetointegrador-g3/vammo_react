import { Heart, PencilLine, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Viagem } from "../../../model/Viagem";

interface CardViagensProps {
  viagem: Viagem;
}

function CardViagens({ viagem }: CardViagensProps) {
  return (
    <div className="bg-grey-100 p-6 rounded-3xl shadow-2xl relative w-80">
      {/* Botões de editar e excluir */}
      <div className="flex justify-end space-x-2">
        <Link to={`/editarviagem/${viagem.id}`}>
          <button className="text-gray-500 hover:text-[var(--colorCyan)] cursor-pointer hover:animate-bounce">
            <PencilLine className="size-5" />
          </button>
        </Link>
        <Link to={`/deletarviagem/${viagem.id}`}>
          <button className="text-gray-500 hover:text-[var(--colorRed)] cursor-pointer hover:animate-bounce">
            <Trash className="size-5" />
          </button>
        </Link>
      </div>

      <main className="flex flex-col items-center gap-2.5">
      <p className="font-bold mt-3 text-center text-2xl">Informações Da Viagem  </p>
        <p className="text-[var(--colorCyan)] font-semibold text-center">Destino = {viagem.destino} </p>
        <p className="text-[var(--colorCyan)] font-semibold text-center">
          Distância: {viagem.distancia} km
        </p>
        <p className="text-[var(--colorCyan)] font-bold text-center">
          Data:{" "}
          {viagem.data_ida
            ? new Intl.DateTimeFormat(undefined, {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(viagem.data_ida))
            : "Data inválida"}
        </p>
        <p className="text-[var(--colorCyan)] font-semibold text-center">
          Velocidade: {viagem.velocidade} KM/H
        </p>
        <p className="text-[var(--colorCyan)] font-semibold text-center">
          Duração: {viagem.duracao} Horas
        </p>
        <p className="text-[var(--colorCyan)] font-semibold text-centerr">
          Preço: R$: {viagem.preco.toFixed(2)}
        </p>
        <p className="text-[var(--colorCyan)] font-semibold text-center">Status: {viagem.status} </p>
      </main>
    </div>
  );
}

export default CardViagens;
