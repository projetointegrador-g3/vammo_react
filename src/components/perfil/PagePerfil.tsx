import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlert } from "../../utils/ToastAlert";
import { Button } from "../ui/button"; // Certifique-se de importar o Button corretamente


function PagePerfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlert('Você precisa estar logado', 'info');
      navigate("/");
    }
  }, [usuario.token, navigate]);

  return (
<<<<<<< HEAD
    <div className="flex text-[#212121] mx-40 mt-8 gap-80 ">
=======
    <div className="flex text-[#212121] ml-40 gap-80">
>>>>>>> 94e8477a5db93ced51528f2e420dbc2622ee74bf
      {/* Seção de Perfil */}
      <div className="flex flex-col w-100">
        <h1 className="font-semibold text-2xl my-8">Perfil de {usuario.nome}</h1>

        <img
          src={usuario.foto || "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />

        <div className="flex flex-col mb-4">
<<<<<<< HEAD
          <p><strong>Nome: </strong> {usuario.nome}</p>
          <p><strong>Email: </strong> {usuario.usuario}</p>
          <p><strong>Data de Nascimento: </strong> {usuario.data_aniversario}</p>
          <p><strong>Gênero: </strong> {usuario.genero}</p>
          <p><strong>Tipo de Usuário: </strong> {usuario.tipo_user}</p>
          <p><strong>Avaliação: </strong> {usuario.avaliacao}</p>
=======
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Email:</strong> {usuario.usuario}</p>
          <p><strong>Data de Nascimento:</strong> {usuario.data_aniversario || "Não informado"}</p>
          <p><strong>Gênero:</strong> {usuario.genero || "Não informado"}</p>
          <p><strong>Tipo de Usuário:</strong> {usuario.tipo_user || "Não informado"}</p>
          <p><strong>Avaliação:</strong> {usuario.avaliacao || "Não informado"}</p>
>>>>>>> 94e8477a5db93ced51528f2e420dbc2622ee74bf
          <Button onClick={() => navigate(`/editarperfil/${usuario.id}`)} className="mt-4 w-50 cursor-pointer">Editar</Button>
        </div>
      </div>

      {/* Seção de Dados de Pagamento */}
      <div className="w-1/3 mt-10">
        <h2 className="font-semibold text-xl mb-4">Dados de Pagamento</h2>

        {/* Cartão Cadastrado */}
        <div className="mb-6">
          <h3 className="font-medium">Cartão Atual</h3>
          <div className="flex flex-col justify-start mt-2 gap-2">
            <div className="w-80 h-40 bg-[var(--yellow)] rounded-2xl p-6 text-#212121 font-bold transition duration-0.3 hover:scale-110">
              <div>
                <p className="font-semibold">Visa - **** **** **** 1234</p>
                <p className="mt-16">Expira em 12/30</p>
              </div>
            </div>

            <h3 className="font-medium">Outros cartões</h3>
            <div className="w-80 h-40 bg-[var(--purple)] rounded-2xl p-6 text-white font-bold transition duration-0.3 hover:scale-110">
              <div>
                <p className="font-semibold">Visa - **** **** **** 4321</p>
                <p className="mt-16">Expira em 12/29</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          
            <button type="submit" className="bg-[var(--black)] text-white mt-4 cursor-pointer p-2 rounded-full px-5 hover:scale-110">Adicionar Cartão</button>
         
        </div>
      </div>
    </div>
  );
}

export default PagePerfil;
