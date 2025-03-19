import { useContext, useEffect, useState } from "react";
import { buscar } from "../../services/Service";
import { AuthContext } from "../../contexts/AuthContext";

interface Viagem {
  id: number;
  distancia: number;
  preco: number;
}

export default function Dashboard() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [totalViagens, setTotalViagens] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  const [totalGasto, setTotalGasto] = useState(0);
  const { usuario, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    async function buscarViagens() {
      try {
        await buscar(`/viagens`, setViagens, {
          headers: { authorization: usuario.token },
        });
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        }
      }
    }

    buscarViagens();
  }, []);

  useEffect(() => {
    if (viagens.length > 0) {
      setTotalViagens(viagens.length);
      setTotalKm(viagens.reduce((acc, viagem) => acc + viagem.distancia, 0));
      setTotalGasto(viagens.reduce((acc, viagem) => acc + viagem.preco, 0));
    }
  }, [viagens]);

  // Última viagem
  const ultimaViagem = viagens.length > 0 ? viagens[viagens.length - 1] : null;

  return (
    <div className="p-4 darkhome">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-100 p-4 rounded-3xl shadow-md">
          <h2 className="text-lg font-semibold">Total de Viagens</h2>
          <p className="text-2xl">{totalViagens}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-3xl shadow-md">
          <h2 className="text-lg font-semibold">Total de Km Rodados</h2>
          <p className="text-2xl">{totalKm} km</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-3xl shadow-md">
          <h2 className="text-lg font-semibold">Total Gasto</h2>
          <p className="text-2xl">R$ {totalGasto.toFixed(2)}</p>
        </div>
      </div>

      {/* Informações da Última Corrida */}
      <div className="mt-6 p-4 bg-[#F2F2F2] rounded-4xl shadow">
        <h3 className="text-lg font-bold">Última corrida solicitada</h3>
        {ultimaViagem ? (
          <>
            <p><strong>Valor:</strong> R$ {ultimaViagem.preco.toFixed(2)}</p>
            <p><strong>Distância:</strong> {ultimaViagem.distancia} km</p>
          </>
        ) : (
          <p>Nenhuma viagem encontrada.</p>
        )}
      </div>
    </div>
  );
}
