import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Veiculo } from "../../../model/Veiculo";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlert } from "../../../utils/ToastAlert";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

function FormVeiculo() {

    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [veiculo, setVeiculo] = useState<Veiculo>({} as Veiculo);

    async function buscarPorId(id: string) {

        try {
            await buscar(`/veiculo/${id}`, setVeiculo, {
                headers: { Authorization: token }
            })

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
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
            buscarPorId(id)
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
        setIsLoading(true);

        if (id !== undefined) {
            try {

                await atualizar(`/veiculo`, veiculo, setVeiculo, {
                    headers: { Authorization: token },
                });
                ToastAlert("Veículo atualizado com sucesso", "sucesso");
            }

            catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout();
                } else {
                    ToastAlert("Erro ao salvar o veículo", "erro");
                }
            }
        } else {
            try {
                await cadastrar(`/veiculo`, veiculo, setVeiculo, {
                    headers: { Authorization: token },
                });
                ToastAlert("Veículo cadastrado com sucesso", "sucesso");
            }

            catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout();
                } else {
                    ToastAlert("Erro ao salvar o veículo", "erro");
                }
            } 
        }
        setIsLoading(false)
        retornar();
    }
    return (
        <div className=" flex flex-col items-center bg-#f6f5fa text-#212121">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? "Editar Veículo" : "Cadastrar Veículo"}</h1>

            <form className="flex flex-col w-1/2 gap-9"   onSubmit={gerarNovoVeiculo}> 
                <div>
                    <label htmlFor="modelo">Modelo do Veículo</label>
                    <input
                        type="text"
                        placeholder="Modelo"
                        name="modelo"
                        required
                        value={veiculo.modelo}
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
                        value={veiculo.placa}
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
                        value={veiculo.cor}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="ano_fabricacao">Ano de Fabricação</label>
                    <input
                        type="text"
                        name="ano_fabricacao"
                        placeholder="Ex.:2022"
                        required
                        value={veiculo.ano_fabricacao}
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
                        value={veiculo.observacao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="disponivel">Disponibilidade</label>
                    <input
                        type="text"
                        name="disponivel"
                        placeholder="ex.: Sim/Não"
                        value={veiculo.disponivel} // Use 'checked' para checkboxes  
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <button type='submit'
                    className='rounded text-white bg-indigo-400 
                     hover:bg-indigo-900 w-1/2 py-2 mx-auto 
                     flex justify-center'>
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true} />
                        :
                        <span> {id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }

                </button>
            </form>
        </div>
    );
}


export default FormVeiculo