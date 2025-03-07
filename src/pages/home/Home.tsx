import {  useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import mapboxgl from 'mapbox-gl';
import ModalViagens from '../../components/viagens/modalviagens/ModalViagens';
import UsuarioLogin from '../../model/UsuarioLogin';

interface UsuarioProps {
  usuario: UsuarioLogin;
}

//Token para o Map
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3J1cG8wMy1qczA2IiwiYSI6ImNtN3htaW11YTAwb3Qya29md3pwNzJrd2MifQ.uB4DxvtKsao_3O9FPIYTFQ';

const Home = ({ usuario }: UsuarioProps) => {

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

    // Configurações do mapa
    useEffect(() => {
      if (!mapContainerRef.current) return;
  
      const mapa = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLElement, 
        style: 'mapbox://styles/grupo03-js06/cm7xnwys8025701qo64fhadmp',
        center: [-46.633308, -23.55052], // Posição inicial (SP)
        zoom: 12,
      });
  
      return () => mapa.remove() // limpar mapa
  
    }, []);

  // Dados para gráfico
  const data = [
    { name: 'Completed', value: 55, color: '#E2F26B' },
    { name: 'In Progress', value: 30, color: '#565656' },
    { name: 'Not Started', value: 15, color: '#D3D3D3' },
  ];


  // Armazenar infos no inputs
  const [origem, setOrigem] = useState<string>('');
  const [destino, setDestino] = useState<string>('');

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    
    if (name === "origem") {
      setOrigem(value);
    } else if (name === "destino") {
      setDestino(value);
    }
  }
  

  return (
    <main className='flex-1 p-10 ml-[100px] overflow-hidden mt-[-50px]'>

    {/* Pesquisa + mapa */}
    <div className='flex gap-6 my-15'>
  
      {/* Seção de pesquisa de viagens */}
      <div className='w-1/3 space-y-4' >
        <h2 className='text-xl font-bold'>Olá, {usuario ? usuario.nome : 'Usuário'}!</h2>
        <p>Busque pelo seu destino com os melhores preços!</p>

        <div className='space-y-3'>
          <input
            type='text'
            placeholder='Local de partida'
            value={origem}
            onChange={atualizarEstado}
            className='w-full p-3 bg-[#F2F2F2]  rounded-4xl placeholder-[#212121]'
          />

          <input
            type='text'
            placeholder='Destino'
            value={destino}
            onChange={atualizarEstado}      
            className='w-full p-3 bg-[#F2F2F2] rounded-4xl placeholder-[#212121]'
          />

<div>
      
      {/* Modal */}
      <ModalViagens showTitle={false} />
    </div>
        </div>

        {/* Informações da Corrida */}
        <div className='mt-6 p-4 bg-[#F2F2F2] rounded-4xl shadow'>
          <h3 className='text-lg font-bold'>Informações da corrida</h3>
          <p><strong>Valor:</strong> R$24,90</p>
          <p><strong>Distância:</strong> 5km</p>
        </div>

        {/* Dashboard */}
        <div className='mt-10'>
          <h3 className='text-lg font-bold'>Dashboard</h3>
          <div className='flex items-center justify-between'>
            <div className='mb-10'>
              <p><strong>Gastos do mês:</strong> R$424,90</p>
              <p><strong>Distância Percorrida:</strong> 89.5km</p>
            </div>

            {/* Gráfico */}
            <PieChart width={150} height={150}>
              <Pie data={data} cx='50%' cy='50%' outerRadius={50} fill='#8884d8' dataKey='value'>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart> 
            </div>
          </div>
      </div>

      {/* Mapa */}
      <div className='w-100 ml-20 my-15 '>
          <div ref={mapContainerRef} className='w-200 h-70 rounded-4xl'></div>
      </div>
    </div>
  </main>
  
  )
};

export default Home;
