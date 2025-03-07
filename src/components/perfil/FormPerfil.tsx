import { useState, ChangeEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { atualizar, buscar } from "../../services/Service";
import { Usuario } from "../../model/Usuario";
import { ToastAlert } from "../../utils/ToastAlert";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AuthContext } from "../../contexts/AuthContext";

function FormPerfil() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario>({} as Usuario);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarUsuarioPorId(id: string) {
    try {
      await buscar(`/usuarios/${id}`, setUsuarios, {
        headers: { authorization: token },
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
    if (usuario.id) {
      buscarUsuarioPorId(usuario.id.toString());
    }
  }, [usuario]);

  // Função de atualização de estado para inputs
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarios({
      ...usuarios,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/perfil");
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function atualizarPerfil(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (confirmarSenha === usuarios.senha && usuarios.senha.length >= 8) {
      try {
        await atualizar("/usuarios/atualizar", usuarios, setUsuarios, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlert("Usuário atualizado com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlert("Erro ao atualizar o usuário", "erro");
        }
      }
    } else {
      ToastAlert("Dados do usuário estão inconsistentes! Verifique", "info");
      setUsuarios({ ...usuarios, senha: "" });
      setConfirmarSenha("");
    }

    setIsLoading(false);
    retornar();
  }

  function formatarData(data: string): string {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
  }

  return (
    <div className="flex items-center justify-center text-[#212121] ml-30 gap-80">
      {/* Seção de Perfil */}
      <div className="flex flex-col items-center w-150">
        <h1 className="font-semibold text-3xl my-8 mt-12">Editar Perfil</h1>

        <form className="flex flex-col w-full gap-4" onSubmit={atualizarPerfil}>
          <Input
            type="text"
            placeholder="Tipo de Usuário"
            name="tipo_user"
            value={usuarios.tipo_user || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <Input
            type="text"
            placeholder="Nome"
            name="nome"
            value={usuarios.nome || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <Input
            type="date"
            placeholder="Data de Nascimento"
            name="data_aniversario"
            value={usuarios.data_aniversario ? formatarData(usuarios.data_aniversario) : ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <Input
            type="text"
            placeholder="Gênero"
            name="genero"
            value={usuarios.genero || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <Input
            type="text"
            placeholder="Usuário"
            name="usuario"
            value={usuarios.usuario || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <Input
            type="password"
            placeholder="Senha"
            name="senha"
            value={usuarios.senha || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <Input
            type="password"
            placeholder="Confirma Senha "
            name="confirmasenha"
            required
            value={confirmarSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
          />
          <Input
            type="text"
            placeholder="Foto (URL)"
            name="foto"
            value={usuarios.foto || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <Input
            type="number"
            placeholder="Avaliação (0-5)"
            name="avaliacao"
            value={usuarios.avaliacao || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />

          <div className="flex gap-4">
            <Button type="submit" className="cursor-pointer rounded-full px-5">
              {isLoading ? (
                <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="25" visible={true} />
              ) : (
                <span>Salvar</span>
              )}
            </Button>

            <button onClick={retornar} className="bg-[var(--black)] text-white cursor-pointer rounded-full px-5 hover:scale-105">
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPerfil;
