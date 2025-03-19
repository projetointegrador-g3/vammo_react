import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Veiculo } from "../../../model/Veiculo";
import { Usuario } from "../../../model/Usuario";
import { Viagem } from "../../../model/Viagem";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlert } from "../../../utils/ToastAlert";
import { RotatingLines } from "react-loader-spinner";
import { AuthContext } from "../../../contexts/AuthContext";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

interface FormViagensProps {
    origem?: string;
    destino?: string;
}

function FormViagens({ origem, destino }: FormViagensProps) {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [veiculo, setVeiculo] = useState<Veiculo>({
    id: 0,
    modelo: "",
    placa: "",
    cor: "",
    ano_fabricacao: "",
    foto: "",
    observacao: "",
    disponivel: "",
  });

  const [viagem, setViagem] = useState<Viagem>({
    id: 0,
    origem: "",
    destino: "",
    distancia: null,
    velocidade: null,
    preco: null,
    status: "", // Defina um valor inicial como string vazia
    veiculo: {} as Veiculo,
    usuario: {} as Usuario,
  });

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarViagemPorID(id: string) {
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

  async function buscarVeiculoPorID(id: string) {
    try {
      await buscar(`/veiculo/${id}`, setVeiculo, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarVeiculos() {
    try {
      await buscar("/veiculo", setVeiculos, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarUsuarios() {
    try {
      await buscar(`/usuarios/${id}`, setUsuarios, {
        headers: { Authorization: token },
      });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlert("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarVeiculos();
    if (id !== undefined) {
      buscarViagemPorID(id);
    }
  }, [id]);

  useEffect(() => {
    console.log("Usuário logado: ", usuario);
    setViagem({
      ...viagem,
      veiculo: veiculo,
      usuario: usuario,

    });
  }, [veiculo, usuario]);


  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
  
    // Converte os valores para número
    const valorConvertido = 
      (name === "distancia" || name === "velocidade" || name === "preco") 
      ? value === "" ? 0 : Number(value) // Converte para número, e 0 caso o campo esteja vazio
      : value;
  
    setViagem({
      ...viagem,
      [name]: valorConvertido,
      veiculo: veiculo,
      usuario: usuario,
    });
  }
  

  function retornar() {
    navigate("/viagens");
  }

  async function gerarNovaViagem(e: ChangeEvent<HTMLFormElement>) {
    
    e.preventDefault();
    setIsLoading(true);
    if (id !== undefined) {
      try {
        await atualizar("/viagens", viagem, setViagem, {
          headers: { Authorization: token },
        });
        ToastAlert("Atualizado com sucesso", "info");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlert("Erro ao atualizar a Viagem", "erro");
        }
      }
    } else {

     console.log('Dados finais da viagem:', viagem);


      try {
        await cadastrar("/viagens", viagem, setViagem, {
          headers: { Authorization: token },
        });
        ToastAlert("Cadastrado com sucesso", "info");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlert("Erro ao cadastrar a Viagem", "erro");
        }
      }
    }
    setIsLoading(false);
    retornar();
  }

  const carregamentoDependencias = veiculo.modelo === "" || usuario.usuario === "";

  // Preencher os campos automaticamente (origem, destino)
  useEffect(() => {
    setViagem((prevViagem) => ({
        ...prevViagem,
        origem: origem,
        destino: destino
    }));
}, [origem, destino]);



  return (
    <>
      <div className=" flex flex-col items-center text-[#212121] perfildark">
        <h1 className="text-4xl text-center my-8">
          {id !== undefined ? "Editar viagem" : "Buscar viagem"}
        </h1>

        <form className="flex flex-col w-1/2 gap-5 inputsize" onSubmit={gerarNovaViagem}>
          {/* <div>
            <Input
              type="date"
              placeholder="Data de Ida"
              name="data_ida"
              required
              value={viagem.data_ida}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div> */}
          <div>
            <Input
              type="text"
              placeholder="Origem"
              name="origem"
              required
              value={viagem.origem}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Destino"
              name="destino"
              required
              value={viagem.destino}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Distância (km)"
              name="distancia"
              required
              value={viagem.distancia}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Velocidade Média (km/h)"
              name="velocidade"
              required
              value={viagem.velocidade}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Preço (R$)"
              name="preco"
              required
              value={viagem.preco}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Status da Viagem</p>
            <select
              name="status"
              id="status"
              className="flex h-10 w-full rounded-full border border-stone-400 bg-background px-3 py-2 text-sm"
              required
              value={viagem.status || ""}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e)}
            >
              <option value="" disabled>
                Selecione o status
              </option>
              <option value="Pendente">Pendente</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluída">Concluída</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <p>Veículo</p>
            <select
              name="veiculo"
              id="veiculo"
              className="flex h-10 w-full rounded-full border border-stone-400 bg-background px-3 py-2 text-sm"
              onChange={(e) => buscarVeiculoPorID(e.currentTarget.value)}
            >
              <option value="" selected disabled>
                Selecione um veículo
              </option>
              {veiculos.map((veiculo) => (
                <option key={veiculo.id} value={veiculo.id}>
                  {veiculo.modelo} - {veiculo.placa} ({veiculo.cor})
                </option>
              ))}
            </select>
          </div>
          {/* <div className="flex flex-col gap-2">
            <p>Usuário</p>
            <select
              name="usuario"
              id="usuario"
              className="flex h-10 w-full rounded-md border border-stone-400 bg-background px-3 py-2 text-sm"
              disabled
            >
              <option value={usuario.id}>
                {usuario.nome} - ({usuario.usuario}) - {usuario.avaliacao}
              </option>
            </select>
          </div> */}

          <Button
            type="submit"
            className="cursor-pointer"
            disabled={carregamentoDependencias}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="25"
                visible={true}
              />
            ) : (
              <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
            )}

            
          </Button>
        </form>
      </div>
    </>
  );
}


export default FormViagens;
