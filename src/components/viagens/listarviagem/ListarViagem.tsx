import { useEffect, useState } from 'react';
import { Viagem } from '../../../model/Viagem';
import { buscar } from '../../../services/Service';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ModalViagens from '../modalviagens/ModalViagens';
import CardViagens from '../cardviagens/CardViagens';


function ListaViagens() {
    const [viagens, setViagens] = useState<Viagem[]>([]);

    async function buscarViagem() {
        try {
			await buscar('/viagens', setViagens, {});
        } catch (error) {
            console.error("Erro ao buscar viagens", error);
        }
    }

    useEffect(() => {
        buscarViagem();
    }, []);

    return (
        <>
            <h1>
                <ModalViagens />
            </h1>

            {viagens.length === 0 && (
                <DotLottieReact
                    src="https://lottie.host/a6fa5f6b-c53a-412c-a307-29d8d5230d3e/rCiEj96Aay.lottie"
                    loop
                    autoplay
                />
            )}
            <div className='flex justify-center w-full my-4'>
                <div className='container flex flex-col mx-2'>
                    <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {viagens.map((viagem) => (
                            <CardViagens key={viagem.id} viagem={viagem} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaViagens;
