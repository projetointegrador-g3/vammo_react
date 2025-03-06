import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ModalViagens.css'
import { PlusSquare } from '@phosphor-icons/react';
import FormViagens from '../formviagens/FormViagens';

function ModalViagens() {
    return (
        <>
            <Popup
                trigger={
                    <h2 className="text-2xl font-semibold mb-3 flex flex-col items-center sm:flex-row sm:justify-between gap-4 sm:gap-0 ml-30 mt-15">
                        <span>Viagens</span>

                        <button
                            className="bg-[var(--colorYellow)] text-[var(--colorGrey)] px-4 py-2 rounded flex
                                           items-center gap-3 hover:bg-[var(--colorRed)] hover:scale-105 ease-in-out cursor-pointer"
                        >
                            <PlusSquare className="size-6"/>
                            <p className="text-sm font-semibold mr-8">Adicionar nova viagem</p>
                        </button>
                    </h2>
                }
                modal
            >
                <FormViagens />
            </Popup>
        </>
    );
}

export default ModalViagens;
