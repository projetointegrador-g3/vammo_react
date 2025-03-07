import { useContext, useEffect, useState } from "react";
import { Viagem } from "../../../model/Viagem";
import { buscar } from "../../../services/Service";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ModalViagens from "../modalviagens/ModalViagens";
import CardViagens from "../cardviagens/CardViagens";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlert } from "../../../utils/ToastAlert";

function ListaViagens() {
  const navigate = useNavigate();
  const [viagens, setViagens] = useState<Viagem[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarViagem() {
    try {
      await buscar("/viagens", setViagens, {
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
    buscarViagem();
  }, []);

  return (
    <>
      {viagens.length === 0 && (
        <DotLottieReact
          src="https://lottie.host/70958752-1b0b-4adf-8615-e20fe98617c1/CtgELq1S7y.lottie"
          loop
          autoplay
        />
      )}
      <div className="flex justify-center my-4 ml-18 p-1 m-10">
        <div className="container flex flex-col mx-2">
          <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {viagens.map((viagem) => (
              <CardViagens key={viagem.id} viagem={viagem} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaViagens;
