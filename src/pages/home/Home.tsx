import { Search } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const Home = () => {
  const data = [
    { name: 'Completed', value: 55, color: '#FFC300' },
    { name: 'In Progress', value: 30, color: '#565656' },
    { name: 'Not Started', value: 15, color: '#D3D3D3' },
  ];

  return (
    
      <main className="flex-1 p-6">

        {/* Seção de pesquisa de viagens */}
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-bold">Olá, Bob!</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Local de partida"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Destino"
              className="w-full p-3 border rounded-md"
            />
            <button className="w-full py-3 bg-yellow-300 rounded-md flex justify-between px-4">
              <span>Pesquisar</span>
              <Search />
            </button>
          </div>
        </div>

        {/* Informações da Corrida */}
        <div className="mt-6 p-4 bg-white rounded-md shadow">
          <h3 className="text-lg font-bold">Informações da corrida</h3>
          <p>Valor: R$24,90</p>
          <p>Distância: 5km</p>
        </div>

        {/* Dashboard */}
        <div className="mt-6">
          <h3 className="text-lg font-bold">Dashboard</h3>
          <div className="flex items-center justify-between">
            <div>
              <p>Gastos do mês: R$424,90</p>
              <p>Distância Percorrida: 89.5km</p>
            </div>
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
      </main>
  );
};

export default Home;
