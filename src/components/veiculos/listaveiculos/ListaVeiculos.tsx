import { Link, useNavigate } from "react-router-dom";
import { buscar } from "../../../services/Service";
import { Veiculo } from "../../../model/Veiculo";
import { useContext, useEffect, useState } from "react";
import CardVeiculos from "../cardveiculos/CardVeiculos";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlert } from "../../../utils/ToastAlert";
import { PlusSquare } from "lucide-react";

function ListaVeiculos() {
    const navigate = useNavigate();
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario?.token || "";

    async function buscarVeiculos() {
        try {
            await buscar(`/veiculo`, setVeiculos, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (!token) {
            ToastAlert("Você precisa estar logado!", "info");
            navigate("/");
        } else {
            buscarVeiculos();
        }
    }, [token]);

    return (
        <div className="container mx-30 p-4 flex flex-col my-5">
            <h1 className="text-2xl font-bold text-gray-800">
                Véiculos da Frota
            </h1>

            <Link to={`/cadastrarveiculo`}>
                <button className="px-4 py-2 flex items-center gap-3 bg-[#d8f505] hover:bg-black hover:text-[#f6f5fa] transition-all delay-70 rounded-4xl
                ease-in-out cursor-pointer ml-300">
                    <PlusSquare className='size-5'/>
                    <p className="text-sm font-semibold">Adicionar novo veículo</p>
                </button>
            </Link>

            <div className="flex flex-col sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                {veiculos.length > 0 ? (
                    veiculos.map((veiculo) => (
                        <CardVeiculos key={veiculo.id} veiculo={veiculo} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        Nenhum veículo cadastrado.
                    </p>
                )}
            </div>
        </div>
    );
}

export default ListaVeiculos;
