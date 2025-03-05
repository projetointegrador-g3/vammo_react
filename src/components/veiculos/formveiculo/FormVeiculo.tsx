import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Veiculo } from "../../../model/Veiculo";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlert } from "../../../utils/ToastAlert";

function FormVeiculo(){
    
    const navigate = useNavigate();

    const [veiculo, setVeiculo] = useState<Veiculo>({} as Veiculo)

    const {id} = useParams<{ id: string }>()

    /*const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token*/

    async function buscarPorId(id: string){
        try{
            await buscar(`/veiculos/${id}`,setVeiculo,{
                /*headers: {
                    Authorization: token,
                },*/
            })
        } catch (error:any){
            if(error.toString().includes('403')){ /* handleLogout() */ }
        }
    }

    /*useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info")
            navigate('/');
        }
    }, [token])*/

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setVeiculo({
            ...veiculo,
            [e.target.name]: e.target.value,
        });
    }

    function retornar() {
        navigate('/veiculo');
    }

    async function gerarNovoVeiculo(e:ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        
        if (id !== undefined) {
            try{
                await atualizar (`/veiculo`, veiculo, setVeiculo, {
                    /*headers: {
                        Authorization: token,
                    },*/
                });

                ToastAlert('Veiculo atualizado com sucesso', "sucesso")
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    /*handleLogout()*/
                } else {
                    ToastAlert('Erro ao atualizar o Veiculo', "erro")
                }
            }
        } else {
            try {
                await cadastrar(`/veiculo`, veiculo, setVeiculo, {
                    /*headers: {
                        Authorization: token,
                    },*/
                })

                ToastAlert('Veiculo cadastrado com sucesso', "sucesso");

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    /*handleLogout()*/
                } else {
                    ToastAlert('Erro ao cadastrar o Veiculo', "erro");
                }
            }
        }
        retornar()
    }

    return (
        <div>
            <h1 >
                {id !== undefined ? 'Editar Veiculo' : 'Cadastrar Veiculo'}
            </h1>

            <form onSubmit={gerarNovoVeiculo}>
                <div>
                    <label htmlFor="titulo">Modelo de Veiculo</label>
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
                    <label htmlFor="titulo">Placa de Veiculo</label>
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
                    <label htmlFor="titulo">Cor de Veiculo</label>
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
                    <label htmlFor="titulo">Ano de Fabricacao do Veiculo</label>
                    <input
                        type="date"
                        placeholder="Ano de Fabricacao"
                        name="ano_fabricacao"
                        required
                        value={veiculo.ano_fabricacao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="titulo">Observações sobre o Veiculo</label>
                    <input
                        type="text"
                        placeholder="Observação"
                        name="Observação"
                        required
                        value={veiculo.observacao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="titulo">Disponibilidade do Veiculo</label>
                    <input
                        type="date"
                        placeholder="Ano de Fabricacao"
                        name="ano_fabricacao"
                        required
                        value={veiculo.disponivel}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    type='submit'
                >
                    {<span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>}
                </button>
            </form>
        </div>
    );

}

export default FormVeiculo