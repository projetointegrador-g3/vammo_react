import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Veiculo } from "../../../model/Veiculo"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlert } from "../../../utils/ToastAlert"
import { AuthContext } from "../../../contexts/AuthContext"

function DeletarVeiculo() {

    const navigate = useNavigate

    const[veiculo, setVeiculo] = useState<Veiculo>({} as Veiculo)

    const {id} = useParams<{id: string}>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string){
        try{
            await buscar(`/veiculos/${id}`,setVeiculo,{
                headers: {
                    Authorization: token,
                },
            })
        } catch (error:any){
            if(error.toString().includes('403')){  handleLogout()  }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlert('Você precisa estar logado', "info")
            navigate('/');
        }
    }, [token])

    useEffect(()=> {
        if (id !== undefined){
            buscarPorId(id)
        }
    },[id])

    async function deletarVeiculo() {

        try {
            await deletar(`/veiculos/${id}`, {
            })

            ToastAlert('Veiculo apagado com sucesso', "sucesso")

        } catch (error: any) {
            if (error.toString().includes('403')) {  handleLogout() 

            }else {
                ToastAlert('Erro ao deletar o Veiculo', "erro")
            }
        }
        retornar()
    }

    function retornar() {
        navigate("/veiculos")
    }

    return (
        <div >
            <h1>Deletar Veiculo</h1>

            <p >Você tem certeza de que deseja apagar o veiculo a seguir? </p>

            <div>
                <header >
                    Veiculo
                </header>
                <div >
                    <p >{veiculo.modelo}</p>
                </div>
                <div >
                    <button onClick={retornar}>
                        Não
                    </button>
                    <button onClick={deletarVeiculo}>                       
                        <span>Sim</span>
                    </button>
                </div>
            </div>
        </div>
    )

}
export default DeletarVeiculo




