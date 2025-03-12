import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Veiculo } from "../../../model/Veiculo"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlert } from "../../../utils/ToastAlert"
import { AuthContext } from "../../../contexts/AuthContext"
import { RotatingLines } from "react-loader-spinner"

function DeletarVeiculo() {

    const navigate = useNavigate();
    const[veiculo, setVeiculo] = useState<Veiculo>({} as Veiculo);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {id} = useParams<{id: string}>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string){
        try{
            await buscar(`/veiculo/${id}`,setVeiculo,{
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
            ToastAlert('Você precisa estar logado', "info");
            navigate('/');
        }
    }, [token])

    useEffect(()=> {
        if (id !== undefined){
            buscarPorId(id)
        }
    },[id])

    async function deletarVeiculo() {
        setIsLoading(true);
        try {
            await deletar(`/veiculo/${id}`, {
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
        navigate("/veiculo")
    }

    return (
        <div className="container w-1/2 mx-auto border rounded-4xl p-8 mt-40 content-center">
          <h1 className="text-3xl text-center my-4">Deletar Veículo</h1>
          <p className="text-center mb-4 text-lg ">
            Você tem certeza de que deseja apagar o veículo a seguir?
          </p>
    
          <div className="flex flex-col overflow-hidden justify-between">
            <p className="text-2xl h-full text-center p-6 relative">
              {veiculo.modelo}
            </p>
    
            <div className="flex gap-10">
              <button
                className="flex justify-center text-center rounded-lg bg-[var(--yellow)] w-full py-2 hover:bg-[var(--yellowDark)] cursor-pointer"
                onClick={retornar}
              >
                Não
              </button>
              <button
                className="flex justify-center text-center rounded-lg text-white bg-[var(--purple)] w-full py-2 hover:bg-[var(--purpleDark)]  cursor-pointer"
                onClick={deletarVeiculo}
              >
                {isLoading ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                ) : (
                  <span>Sim</span>
                )}
              </button>
            </div>
          </div>
        </div>
      );

}
export default DeletarVeiculo




