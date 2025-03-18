import {  useContext, useEffect, useRef, useState } from 'react';
import ModalViagens from '../../components/viagens/modalviagens/ModalViagens';
import { useNavigate } from 'react-router-dom';
import { ToastAlert } from '../../utils/ToastAlert';
import { AuthContext } from '../../contexts/AuthContext';
import './Home.css'
import Dashboard from '../../components/dashboard/Dashboard';
import GoogleMaps from '../../utils/GoogleMaps';

const Home = () => {

  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlert('Você precisa estar logado', 'info');
      navigate("/");
    }
  }, [usuario.token, navigate]);

  // Armazenar infos no inputs
  const [origem, setOrigem] = useState<string>('');
  const [destino, setDestino] = useState<string>('');


  return (
    <main className='flex-1 p-10 ml-[100px] overflow-hidden mt-[-50px] resp-home'>

    {/* Pesquisa + mapa */}
    <div className='flex gap-6 my-15'>
  
      {/* Seção de pesquisa de viagens */}
      <div className='w-1/3 space-y-4 input-home' >
        <h2 className='text-2xl font-bold mb-4'>Olá, {usuario ? usuario.nome : 'Usuário'}!</h2>
        <p>Busque pelo seu destino com os melhores preços!</p>

        <div className='space-y-3'>
          <input
            type='text'
            placeholder='Local de partida'
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
            className='w-full p-3 bg-[#F2F2F2]  rounded-4xl placeholder-[#212121]'
          />

          <input
            type='text'
            placeholder='Destino'
            value={destino}
            onChange={(e) => setDestino(e.target.value)}     
            className='w-full p-3 bg-[#F2F2F2] rounded-4xl placeholder-[#212121]'
          />

<div>
      
      {/* Modal */}
      <ModalViagens showTitle={false} origem={origem} destino={destino} />
    </div>
        </div>

        {/* Dashboard */}
        <Dashboard />
      </div>

      {/* Mapa */}
      <div className='w-150 ml-20 my-10 '>
          <div className='w-200 h-120 rounded-4xl'>
            <GoogleMaps />
          </div>
      </div>
    </div>
  </main>
  
  )
};

export default Home;
