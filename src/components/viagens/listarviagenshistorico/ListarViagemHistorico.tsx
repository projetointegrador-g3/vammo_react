import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../../ui/input";
import CardViagens from "../cardviagens/CardViagens";
import { Viagem } from "../../../model/Viagem";
import { Usuario } from "../../../model/Usuario"; // Importando o tipo de Usuario

interface ListarViagensHistoricoProps {
  usuario: Usuario; 
}

const ListarViagensHistorico = ({ usuario }: ListarViagensHistoricoProps) => {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [filtroData, setFiltroData] = useState("");

  useEffect(() => {
    if (!usuario || !usuario.id) {
      console.error("Usuário não encontrado.");
      return;
    }

    axios
	.get(`/consultarviagem/historico/${encodeURIComponent(usuario.usuario)}`)  // Usando usuario.id
      .then((response) => {
        setViagens(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar viagens do histórico:", error);
      });
  }, [usuario]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Histórico de Viagens</h1>
      
      {/* Filtro opcional por data, caso queira incluir */}
      <Input
        type="text"
        placeholder="Filtrar por data"
        value={filtroData}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltroData(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {viagens.length > 0 ? (
          viagens.map((viagem) => <CardViagens key={viagem.id} viagem={viagem} />)
        ) : (
          <p className="text-gray-500">Nenhuma viagem encontrada no histórico.</p>
        )}
      </div>
    </div>
  );
};

export default ListarViagensHistorico;
