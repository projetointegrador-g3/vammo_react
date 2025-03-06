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
    const token = usuario.token;

    const [veiculo, setVeiculo] = useState<Veiculo>({} as Veiculo);

    useEffect(() => {
        if (token === "") {
            ToastAlert("Você precisa estar logado", "info");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        if (id) {
            buscar(`/veiculos/${id}`, setVeiculo, {
                headers: { Authorization: token },
            }).catch((error) => {
                if (error.toString().includes("403")) {
                    handleLogout();
                }
            });
        }
    }, [id]);

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
                await atualizar(`/veiculo`, veiculo, setVeiculo, {
                    headers: { Authorization: token },
                });
                ToastAlert("Veículo atualizado com sucesso", "sucesso");
            } else {
                await cadastrar(`/veiculo`, veiculo, setVeiculo, {
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
        <div className=" flex flex-col items-center bg-#f6f5fa text-#212121">
            <h1 className="text-4xl text-center my-8">
                {id ? "Editar Veículo" : "Cadastrar Veículo"}</h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoVeiculo}>
                <div>
                    <label htmlFor="modelo">Modelo do Veículo</label>
                    <input
                        type="text"
                        placeholder="Modelo"
                        name="modelo"
                        required
                        value={veiculo.modelo || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="placa">Placa do Veículo</label>
                    <input
                        type="text"
                        placeholder="Placa"
                        name="placa"
                        required
                        value={veiculo.placa || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="cor">Cor do Veículo</label>
                    <input
                        type="text"
                        placeholder="Cor"
                        name="cor"
                        required
                        value={veiculo.cor || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="ano_fabricacao">Ano de Fabricação</label>
                    <input
                        type="date"
                        name="ano_fabricacao"
                        required
                        value={veiculo.ano_fabricacao || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="observacao">Observações</label>
                    <input
                        type="text"
                        placeholder="Observação"
                        name="observacao"
                        required
                        value={veiculo.observacao || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="disponivel">Disponibilidade</label>
                    <input
                        type="date"
                        name="disponivel"
                        required
                        value={veiculo.disponivel || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div>
                    <label htmlFor="idViagem">ID da Viagem</label>
                    <input
                        type="text"
                        placeholder="ID da Viagem"
                        name="idViagem"
                        value={'Viagem.id' || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
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
