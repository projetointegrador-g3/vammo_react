import { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useParams, useNavigate } from "react-router-dom";
import { listar } from "../../services/Service";
import { Viagem } from "../../model/Viagem";
import { Veiculo } from "../../model/Veiculo";
import CardViagens from "../viagens/cardviagens/CardViagens";
import CardVeiculos from "../veiculos/cardveiculos/CardVeiculos";
import { ToastAlert } from "../../utils/ToastAlert";
import { AuthContext } from "../../contexts/AuthContext";

function ListarComponentesPorNome() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [veiculo, setVeiculo] = useState<Veiculo[]>([]);
  const [componentesFiltrados, setComponentesFiltrados] = useState<(Viagem | Veiculo)[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { termoBusca } = useParams<{ termoBusca: string }>();
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;  // Usando o token diretamente do contexto

  async function buscarTodosComponentes() {
    try {
        setIsLoading(true);
        console.log("Iniciando busca de todos os componentes...");

        // Verifica se o token está presente
        if (!token) {
            throw new Error('Token de autenticação não encontrado.');
        }
        console.log('Token de autenticação:', token);

        // Fazer a requisição para listar viagens
        await listar("/viagens", setViagens, {
            headers: { Authorization: token }
        });
        console.log("Viagens carregadas:", viagens);

        // Fazer a requisição para listar veículos
        await listar("/veiculo", setVeiculo, {
            headers: { Authorization: token }
        });
        console.log("Veículos carregados:", veiculo);

    } catch (error) {
        ToastAlert("Erro ao carregar componentes!", "error");
    } finally {
        setIsLoading(false);
        console.log("Busca de componentes finalizada.");
    }
}

  function filtrarComponentes() {
    let componentes: (Viagem | Veiculo)[] = [...viagens, ...veiculo];
    console.log("Componentes antes da filtragem:", componentes);

    if (componentes && termoBusca) {
      componentes = componentes.filter((componente: Viagem | Veiculo) =>
        (componente as Veiculo).modelo?.toUpperCase().includes(termoBusca.toUpperCase()) ||
        (componente as Viagem).destino?.toUpperCase().includes(termoBusca.toUpperCase()) ||
        (componente as Viagem).origem?.toUpperCase().includes(termoBusca.toUpperCase())
      );
    }

    console.log("Componentes filtrados:", componentes);
    setComponentesFiltrados(componentes);
  }

  useEffect(() => {
    if (!token) {
      ToastAlert("Você precisa estar logado", "info");
      navigate("/");
    } else {
      buscarTodosComponentes();
    }
  }, [token]); // Apenas o token como dependência aqui
  

  useEffect(() => {
    if (termoBusca && (viagens.length > 0 || veiculo.length > 0)) {
      filtrarComponentes();
    }
  }, [termoBusca, viagens.length, veiculo.length]); // Usando o tamanho das listas como dependência
  

  return (
    <div className="bg-gray-200 flex flex-col justify-center container m-auto">
      <div className="flex flex-col mx-4">
        <h1 className="text-4xl text-center my-4">
          Resultados da busca por <span>{termoBusca}</span>
        </h1>

        {isLoading && (
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="25"
            visible={true}
          />
        )}

        {!isLoading && componentesFiltrados.length === 0 && (
          <div className="text-center my-4">
            <h2 className="text-2xl text-gray-600">Nenhum componente encontrado para "{termoBusca}"</h2>
          </div>
        )}

                <div className="flex gap-5">
                {!isLoading && componentesFiltrados.length > 0 && (
                    <div className="w-full my-4 gap-4">
                    {/* Exibir viagens em grid de 4 colunas */}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-50 px-10">
                        {componentesFiltrados
                        .filter((componente) => 'destino' in componente || 'origem' in componente)
                        .map((componente) => (
                         <CardViagens key={componente.id} viagem={componente as Viagem} />
                        ))}
                     </div>

                    {/* Exibir veículos em grid de 1 coluna */}
                    <div className="grid grid-cols-1 gap-4 px-15">
                        {componentesFiltrados
                        .filter((componente) => !('destino' in componente || 'origem' in componente))
                        .map((componente) => (
                         <CardVeiculos key={componente.id} veiculo={componente as Veiculo} />
                         ))}
                    </div>
                    </div>
                )}
                </div>

      </div>
    </div>
  );
}

export default ListarComponentesPorNome;
