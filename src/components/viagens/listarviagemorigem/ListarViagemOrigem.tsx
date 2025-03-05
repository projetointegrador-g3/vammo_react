import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../../ui/input";
import CardViagens from "../cardviagens/CardViagens";
import { Viagem } from "../../../model/Viagem";


const ListarViagensOrigem = () => {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [filtroOrigem, setFiltroOrigem] = useState("");

  useEffect(() => {
    if (filtroOrigem.trim() === "") {
      setViagens([]);
      return;
    }

    axios
      .get(`/viagens/origem/${encodeURIComponent(filtroOrigem)}`)
      .then((response) => {
        setViagens(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar viagens:", error);
      });
  }, [filtroOrigem]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listar Viagens por Origem</h1>
      <Input
        type="text"
        placeholder="Digite a origem da viagem"
        value={filtroOrigem}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFiltroOrigem(e.target.value)
        }
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {viagens.length > 0 ? (
          viagens.map((viagem) => <CardViagens key={viagem.id} viagem={viagem} />)
        ) : (
          <p className="text-gray-500">Nenhuma viagem encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default ListarViagensOrigem;
