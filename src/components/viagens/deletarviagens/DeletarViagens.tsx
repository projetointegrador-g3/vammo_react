import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlert } from "../../../utils/ToastAlert";
import { Viagem } from "../../../model/Viagem";
import { AuthContext } from "../../../contexts/AuthContext";

function DeletarViagem() {
  const navigate = useNavigate();

  const [viagem, setViagem] = useState<Viagem>({} as Viagem);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorID(id: string) {
    try {
      await buscar(`/viagens/${id}`, setViagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlert("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorID(id);
    }
  }, [id]);

  async function deletarViagem() {
    setIsLoading(true);

    try {
      await deletar(`/viagens/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlert("Viagem apagada com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlert("Erro ao deletar a viagem.", "erro");
      }
    }
    setIsLoading(false);
    retornar();
  }

  
  function retornar() {
    navigate("/viagens");
  }


  return (
    <div className="container w-1/2 mx-auto border rounded-lg p-6 mt-70 content-center">
      <h1 className="text-3xl text-center my-4">Deletar Viagem</h1>
      <p className="text-center mb-4 text-lg ">
        Você tem certeza de que deseja apagar a viagem a seguir?
      </p>

      <div className="flex flex-col overflow-hidden justify-between">
        <p className="text-2xl h-full text-center p-6 relative">
          {viagem.origem} para {viagem.destino}
        </p>

        <div className="flex gap-10">
          <button
            className="flex justify-center text-center rounded-lg text-white bg-red-600 w-full py-2 hover:bg-red-900 cursor-pointer"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="flex justify-center text-center rounded-lg text-white bg-green-600 w-full py-2 hover:bg-green-900 cursor-pointer"
            onClick={deletarViagem}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarViagem;
