import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ModalViagens.css'
import FormViagens from '../formviagens/FormViagens';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

// Prop para controlar a exibição do título
interface ModalViagensProps {
    showTitle?: boolean; 
    origem?: string;
    destino?: string;
  }

const ModalViagens: React.FC<ModalViagensProps> = ({ showTitle, origem, destino }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    return (
    <>
    {/* Condicional para mostrar o título "Viagens / Corridas" */}
      {showTitle && (
        <h2 className="text-3xl font-semibold flex flex-col items-center sm:flex-row sm:justify-between sm:gap-0 ml-32 mt-15">
          <span>Viagens / Corridas</span>
        </h2>
      )}

      {/* Botão para abrir a modal */}
        <button
            onClick={openModal}
            className="w-full py-3 bg-[#d8f505] hover:bg-black hover:text-[#f6f5fa] transition-all delay-70 rounded-4xl flex justify-between px-4 font-semibold darkhome">
            <span>Buscar viagem</span>
                <ArrowRight color="#ffffff" className="bg-black rounded-4xl w-15" />
        </button>

      {/* Popup Modal */}
      <Popup open={isModalOpen} onClose={closeModal} modal>
        <div className="modal-content">
          <FormViagens origem={origem} destino={destino} />
        </div>
      </Popup>
    </>
    );
}

export default ModalViagens;
