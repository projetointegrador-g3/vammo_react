import { useNavigate } from "react-router-dom";
import { buscar } from "../../../services/Service";
import { Veiculo } from "../../../model/Veiculo";
import { useEffect, useState } from "react";
import CardVeiculos from "../cardveiculos/CardVeiculos";

function ListaVeiculos(){

    const navigate = useNavigate();

    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

    /*const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;*/

    async function buscarVeiculos() {
        try{
            await buscar(`/veiculos`,setVeiculos,{
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

    useEffect(() => {
        buscarVeiculos()
    }, [veiculos.length])

    return (
        <>
            {veiculos.length === 0} 
            <div>{veiculos.map((veiculo) => (
                <CardVeiculos key={veiculo.id} veiculo={veiculo}/>
            ))}
            </div>           
        </>
    )

}

export default ListaVeiculos;