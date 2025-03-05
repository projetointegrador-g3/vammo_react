import { Heart, PencilLine, Trash } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { Viagem } from '../../../model/Viagem';

interface CardViagensProps {
    viagem: Viagem;
}

function CardViagens({ viagem }: CardViagensProps) {
    return (
        <div className="bg-[var(--colorWhite)] p-4 rounded-lg shadow-2xl relative w-70">
            {/* Botões de editar e excluir */}
            <div className="flex justify-end space-x-2">
                <Link to={`/editarproduto/${viagem.id}`}>
                    <button className="text-gray-500 hover:text-[var(--colorCyan)] cursor-pointer hover:animate-bounce">
                        <PencilLine className='size-5' />
                    </button>
                </Link>
                <Link to={`/deletarproduto/${viagem.id}`}>
                    <button className="text-gray-500 hover:text-[var(--colorRed)] cursor-pointer hover:animate-bounce">
                        <Trash className='size-5' />
                    </button>
                </Link>
            </div>

            <main className="flex flex-col items-center gap-2">
                <p className="font-bold mt-3 text-center">Destino</p>
                <p className='text-[var(--colorCyan)] font-semibold text-center'>Distância:  km</p>
                <p className='text-[var(--colorGrey)] text-sm text-center'>Duração:  horas</p>
                <p className='text-sm text-center'>Status: </p>
                
                <button className="mt-5 w-full py-2 px-4 bg-[var(--colorCyan)] text-white rounded-lg cursor-pointer hover:bg-[var(--colorDarkCyan)]">
                    Reservar
                </button>
            </main>
        </div>
    );
}

export default CardViagens;

