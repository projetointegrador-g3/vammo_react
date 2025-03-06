import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const Home = () => {
  const data = [
    { name: 'Completed', value: 55, color: '#E2F26B' },
    { name: 'In Progress', value: 30, color: '#565656' },
    { name: 'Not Started', value: 15, color: '#D3D3D3' },
  ];

  return (
    <main className='flex-1 p-10 ml-[100px]'>

    {/* Pesquisa + mapa */}
    <div className='flex gap-6'>
  
      {/* Seção de pesquisa de viagens */}
      <div className='w-1/3 space-y-4' >
        <h2 className='text-xl font-bold'>Olá, Bob!</h2>

        <div className='space-y-3'>
          <input
            type='text'
            placeholder='Local de partida'
            className='w-full p-3 bg-[#F2F2F2]  rounded-4xl placeholder-[#212121]'
          />

          <input
            type='text'
            placeholder='Destino'
            className='w-full p-3 bg-[#F2F2F2] rounded-4xl placeholder-[#212121]'
          />

          <Link to='#' className='w-full py-3 bg-[#d8f505] hover:bg-black hover:text-[#f6f5fa] transition-all delay-70 rounded-4xl flex justify-between px-4 font-semibold'>
            <span>Pesquisar</span>
            <ArrowRight color='#ffffff' className='bg-black rounded-4xl w-15' />
          </Link>
        </div>

        {/* Informações da Corrida */}
        <div className="mt-6 p-4 bg-[#F2F2F2] rounded-4xl shadow">
          <h3 className="text-lg font-bold">Informações da corrida</h3>
          <p><strong>Valor:</strong> R$24,90</p>
          <p><strong>Distância:</strong> 5km</p>
        </div>

        {/* Dashboard */}
        <div className="mt-10">
          <h3 className="text-lg font-bold">Dashboard</h3>
          <div className="flex items-center justify-between">
            <div className='mbb-10'>
              <p><strong>Gastos do mês:</strong> R$424,90</p>
              <p><strong>Distância Percorrida:</strong> 89.5km</p>
            </div>

            {/* Gráfico */}
            <PieChart width={150} height={150}>
              <Pie data={data} cx="50%" cy="50%" outerRadius={50} fill="#8884d8" dataKey="value">
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
      <div className='w-100 ml-20 my-10'>
          <img src='https://ik.imagekit.io/grupo03/Vammo/mapa?updatedAt=1741277859188'/>
      </div>
    </div>
  </main>
  
  )
};

export default Home;
