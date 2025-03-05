import { ChangeEvent, useEffect, useState } from "react";  
import { useNavigate, useParams } from "react-router-dom";  
import { Veiculo } from "../../../model/Veiculo";  
import { Usuario } from "../../../model/Usuario";  
import { Viagem } from "../../../model/Viagem";  
import { atualizar, buscar, cadastrar } from "../../../services/Service";  
import { ToastAlert } from "../../../utils/ToastAlert";  
import { RotatingLines } from "react-loader-spinner";  
import { Input } from "../input";
import { Button } from "../button";

function FormViagens() {  
    const navigate = useNavigate();  
    const [isLoading, setIsLoading] = useState<boolean>(false);  
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);  
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);  
    const [veiculo, setVeiculo] = useState<Veiculo>({  
        id: 0,  
        modelo: '',  
        placa: '',  
        cor: '',  
        ano_fabricacao: 0,  
        observacao: '',  
        disponivel: true, 
    });  
    const [usuario, setUsuario] = useState<Usuario>({  
        id: 0,  
        tipo_user: '',  
        nome: '',  
        data_aniversario: '',  
        genero: '',  
        usuario: '',  
        senha: '',  
        foto: '',  
        avaliacao: 0,   
    });  
    const [viagem, setViagem] = useState<Viagem>({} as Viagem);  
    const { id } = useParams<{ id: string }>();  

    async function buscarViagemPorID(id: string) {  
        try {  
            await buscar(`/viagens/${id}`, setViagem, {});  
        } catch (error) {  
            console.error("Erro ao buscar viagem:", error);  
        }  
    }  

    async function buscarVeiculoPorID(id: string) {  
        try {  
            await buscar(`/veiculos/${id}`, setVeiculo, {});  
        } catch (error) {  
            console.error("Erro ao buscar veículo:", error);  
        }  
    }  

    async function buscarUsuarioPorID(id: string) {  
        try {  
            await buscar(`/usuarios/${id}`, setUsuario, {});  
        } catch (error) {  
            console.error("Erro ao buscar usuário:", error);  
        }  
    }  

    async function buscarVeiculos() {  
        try {  
            await buscar('/veiculos', setVeiculos, {});  
        } catch (error) {  
            console.error("Erro ao buscar veículos:", error);  
        }  
    }  

    async function buscarUsuarios() {  
        try {  
            await buscar('/usuarios', setUsuarios, {});  
        } catch (error) {  
            console.error("Erro ao buscar usuários:", error);  
        }  
    }  

    useEffect(() => {  
        buscarVeiculos();  
        buscarUsuarios();  
        if (id !== undefined) {  
            buscarViagemPorID(id);  
        }  
    }, [id]);  

    useEffect(() => {  
        setViagem({  
            ...viagem,  
            veiculo: veiculo,  
            usuario: usuario,  
        });  
    }, [veiculo, usuario]);  

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {  
        const { name, value } = e.target;  
        setViagem({  
            ...viagem,  
            [name]: value,  
        });  
    }  

    function retornar() {  
        navigate('/viagens');  
    }  

    async function gerarNovaViagem(e: ChangeEvent<HTMLFormElement>) {  
        e.preventDefault();  
        setIsLoading(true);  

        const viagemParaEnviar = {  
            ...viagem,  
            preco: parseFloat(viagem.preco.toString()),  
            distancia: parseFloat(viagem.distancia.toString()),  
            velocidade: parseFloat(viagem.velocidade.toString()),  
            duracao: parseFloat(viagem.duracao.toString()),  
            veiculo: veiculo,  
            usuario: usuario,  
        };  

        try {  
            if (id !== undefined) {  
                await atualizar('/viagens', viagemParaEnviar, setViagem, {});  
                ToastAlert('Viagem atualizada com sucesso!', 'sucesso');  
            } else {  
                await cadastrar('/viagens', viagemParaEnviar, setViagem, {});  
                ToastAlert('Viagem cadastrada com sucesso!', 'sucesso');  
            }  
        } catch (error: any) {  
            console.error("Erro ao cadastrar/atualizar a viagem:", error);  
            ToastAlert('Erro ao cadastrar/atualizar a Viagem!', 'erro');  
        }  

        setIsLoading(false);  
        retornar();  
    }  

    const carregamentoDependencias = veiculo.id === 0 || usuario.id === 0;  

    return (  
        <>  
            <div className=" flex flex-col items-center bg-#f6f5fa text-#212121">  
                <h1 className="text-4xl text-center my-8">  
                    {id !== undefined ? 'Editar Viagem' : 'Cadastrar Viagem'}  
                </h1>  

                <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaViagem}>  
                    <div>  
                        <Input  
                            type="date"  
                            placeholder="Data de Ida"  
                            name="data_ida"  
                            required  
                            value={viagem.data_ida || ''}  
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}  
                        />  
                    </div>  
                    <div>  
                        <Input  
                            type="text"  
                            placeholder="Origem"  
                            name="origem"  
                            required  
                            value={viagem.origem || ''}  
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}  
                        />  
                    </div>  
                    <div>  
                        <Input  
                            type="text"  
                            placeholder="Destino"  
                            name="destino"  
                            required  
                            value={viagem.destino || ''}  
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}  
                        />  
                    </div>  
                    <div>  
                        <Input  
                            type="number"  
                            placeholder="Distância (km)"  
                            name="distancia"  
                            required  
                            value={viagem.distancia || ''}  
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}  
                        />  
                    </div>  
                    <div>  
                        <Input  
                            type="number"  
                            placeholder="Velocidade Média (km/h)"  
                            name="velocidade"  
                            required  
                            value={viagem.velocidade || ''}  
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}  
                        />  
                    </div>  
                    <div>  
                        <Input  
                            type="number"  
                            placeholder="Preço (R$)"  
                            name="preco"  
                            required  
                            value={viagem.preco || ''}  
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}  
                        />  
                    </div>  
                    <div>  
                        <Input  
                            type="number"   
                            placeholder="Duração (horas)"  
                            name="duracao"  
                            required  
                            value={viagem.duracao || ''}  
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}  
                        />  
                    </div>  
                    <div className="flex flex-col gap-2">  
                        <p>Status da Viagem</p>  
                        <select  
                            name="status"  
                            id="status"  
                            className="flex h-10 w-full rounded-md border border-stone-400 bg-background px-3 py-2 text-sm"  
                            required  
                            onChange={(e) => atualizarEstado(e)}  
                        >  
                            <option value="" disabled selected>Selecione o Status</option>  
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
                            className="flex h-10 w-full rounded-md border border-stone-400 bg-background px-3 py-2 text-sm"  
                            onChange={(e) => buscarVeiculoPorID(e.currentTarget.value)}  
                        >  
                            <option value="" selected disabled>Selecione um Veículo</option>  
                            {veiculos.map((veiculo) => (  
                                <option key={veiculo.id} value={veiculo.id}>  
                                    {veiculo.modelo} - {veiculo.placa} ({veiculo.cor})  
                                </option>  
                            ))}  
                        </select>  
                    </div>  
                    <div className="flex flex-col gap-2">  
                        <p>Usuário</p>  
                        <select  
                            name="usuario"  
                            id="usuario"  
                            className="flex h-10 w-full rounded-md border border-stone-400 bg-background px-3 py-2 text-sm"  
                            onChange={(e) => buscarUsuarioPorID(e.currentTarget.value)}  
                        >  
                            <option value="" selected disabled>Selecione um Usuário</option>  
                            {usuarios.map((usuario) => (  
                                <option key={usuario.id} value={usuario.id}>  
                                    {usuario.nome} ({usuario.usuario})  
                                </option>  
                            ))}  
                        </select>  
                    </div>  
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
                            <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>  
                        )}  
                    </Button>  
                </form>  
            </div>  
        </>  
    );  
}  

export default FormViagens;  
