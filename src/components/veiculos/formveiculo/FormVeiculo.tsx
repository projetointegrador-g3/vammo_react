import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Veiculo } from "../../../model/Veiculo";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlert } from "../../../utils/ToastAlert";
import { AuthContext } from "../../../contexts/AuthContext";

function FormVeiculo() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario?.token || "";

    // Estado inicial corrigido
    const [veiculo, setVeiculo] = useState<Veiculo>({} as Veiculo);

    // Verifica se o usuário está autenticado
    useEffect(() => {
        if (!token) {
            ToastAlert("Você precisa estar logado", "info");
            navigate("/");
        }
    }, [token, navigate]);

    // Busca os dados do veículo se houver um ID
    useEffect(() => {
        if (id && token) {
            buscar(`/veiculos/${id}`, setVeiculo, {
                headers: { Authorization: token },
            }).catch((error) => {
                if (error.toString().includes("403")) {
                    handleLogout();
                }
            });
        }
    }, [id, token, handleLogout]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setVeiculo({
            ...veiculo,
            [e.target.name]: e.target.value,
        });
    }

    function retornar() {
        navigate("/veiculo");
    }

    async function gerarNovoVeiculo(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            if (id) {
                await atualizar(`/veiculos`, veiculo, setVeiculo, {
                    headers: { Authorization: token },
                });
                ToastAlert("Veículo atualizado com sucesso", "sucesso");
            } else {
                await cadastrar(`/veiculos`, veiculo, setVeiculo, {
                    headers: { Authorization: token },
                });
                ToastAlert("Veículo cadastrado com sucesso", "sucesso");
            }
        } catch (error: any) {
            if (error.toString().includes("403")) {
                handleLogout();
            } else {
                ToastAlert("Erro ao salvar o veículo", "erro");
            }
        }
        retornar();
    }

    return (
        <div className="flex flex-col items-center bg-[#f6f5fa] text-[#212121]">
            <h1 className="text-4xl text-center my-8">
                {id ? "Editar Veículo" : "Cadastrar Veículo"}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoVeiculo}>
                <div>
                    <label htmlFor="modelo">Modelo do Veículo</label>
                    <input
                        type="text"
                        placeholder="Modelo"
                        name="modelo"
                        required
                        value={veiculo.modelo}
                        onChange={atualizarEstado}
                    />
                </div>
                <div>
                    <label htmlFor="placa">Placa do Veículo</label>
                    <input
                        type="text"
                        placeholder="Placa"
                        name="placa"
                        required
                        value={veiculo.placa}
                        onChange={atualizarEstado}
                    />
                </div>
                <div>
                    <label htmlFor="cor">Cor do Veículo</label>
                    <input
                        type="text"
                        placeholder="Cor"
                        name="cor"
                        required
                        value={veiculo.cor}
                        onChange={atualizarEstado}
                    />
                </div>
                <div>
                    <label htmlFor="ano_fabricacao">Ano de Fabricação</label>
                    <input
                        type="date"
                        name="ano_fabricacao"
                        required
                        value={veiculo.ano_fabricacao}
                        onChange={atualizarEstado}
                    />
                </div>
                <div>
                    <label htmlFor="observacao">Observações</label>
                    <input
                        type="text"
                        placeholder="Observação"
                        name="observacao"
                        required
                        value={veiculo.observacao}
                        onChange={atualizarEstado}
                    />
                </div>
                <div>
                    <label htmlFor="disponivel">Disponibilidade</label>
                    <input
                        type="checkbox"
                        name="disponivel"
                        required
                        checked={veiculo.disponivel}
                        onChange={atualizarEstado}
                    />
                </div>

                <button type="submit">
                    <span>{id ? "Atualizar" : "Cadastrar"}</span>
                </button>
            </form>
        </div>
    );
}

export default FormVeiculo;
