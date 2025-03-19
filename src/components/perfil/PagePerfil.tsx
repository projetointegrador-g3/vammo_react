import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../services/Service";
import { ToastAlert } from "../../utils/ToastAlert";
import { Button } from "../ui/button";

function PagePerfil() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [usuarioCompleto, setUsuarioCompleto] = useState(usuario);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlert('Você precisa estar logado', 'info');
      navigate("/");
    } else {
      buscarUsuarioPorId(usuario.id);
    }
  }, [usuario]);

  async function buscarUsuarioPorId(id: number) {
    try {
      await buscar(`/usuarios/${id}`, setUsuarioCompleto, {
        headers: { authorization: usuario.token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  return (
    <div className="flex text-[#212121] mx-40 gap-80 resp-perfil perfildark">
      <div className="flex flex-col w-100">
        <h1 className="font-semibold text-2xl my-8">Perfil de {usuarioCompleto.nome}</h1>

        <img
          src={usuarioCompleto.foto || "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"}
          alt="Foto de perfil"
          className="w-30 rounded-full object-cover mb-4"
        />

        <div className="flex flex-col mb-4 separador">
          <p><strong>Nome:</strong> {usuarioCompleto.nome}</p>
          <p><strong>Email:</strong> {usuarioCompleto.usuario}</p>
          <p><strong>Data de Nascimento:</strong> {usuarioCompleto.data_aniversario || "Não informado"}</p>
          <p><strong>Gênero:</strong> {usuarioCompleto.genero || "Não informado"}</p>
          <p><strong>Tipo de Usuário:</strong> {usuarioCompleto.tipo_user || "Não informado"}</p>
          <p><strong>Avaliação:</strong> {usuarioCompleto.avaliacao || "Não informado"}</p>
          <Button onClick={() => navigate(`/editarperfil/${usuario.id}`)} className="mt-4 w-50 cursor-pointer mb-8">Editar</Button>
        </div>
      </div>


      {/* Seção de Dados de Pagamento */}
      <div className="w-1/3">
        <h2 className="font-semibold text-2xl mt-6 mb-4">Dados de Pagamento</h2>

        {/* Cartão Cadastrado */}
        <div className="mb-6">
          <h3 className="font-medium">Cartão Atual</h3>
          <div className="flex flex-col justify-start mt-2 gap-2">
            <div className="w-80 h-40 bg-[var(--yellow)] rounded-2xl p-6 text-#212121 font-bold transition duration-0.3 hover:scale-110 paysize">
              <div className="darkhome">
                <p className="font-semibold">Visa - **** **** **** 1234</p>
                <p className="mt-16">Expira em 12/30</p>
              </div>
            </div>

            <h3 className="font-medium">Outros cartões</h3>
            <div className="w-80 h-40 bg-[var(--purple)] rounded-2xl p-6 text-white font-bold transition duration-0.3 hover:scale-110 paysize">
              <div className="darkhome">
                <p className="font-semibold">Visa - **** **** **** 4321</p>
                <p className="mt-16">Expira em 12/29</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          
            <button type="submit" className="bg-[var(--black)] text-white mt-4 cursor-pointer p-2 rounded-full px-5 hover:scale-110 resp-button-perfil homeinput darkhome">Adicionar Cartão</button>
         
        </div>
      </div>
    </div>
  );
}

export default PagePerfil;
