import { useNavigate } from "react-router-dom";
import { buscar } from "../../../services/Service";
import { Veiculo } from "../../../model/Veiculo";
import { useContext, useEffect, useState } from "react";
import CardVeiculos from "../cardveiculos/CardVeiculos";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlert } from "../../../utils/ToastAlert";

function ListaVeiculos() {
    const navigate = useNavigate();
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario?.token || "";

    async function buscarVeiculos() {
        try {
            await buscar(`/veiculos`, setVeiculos, {
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
            ToastAlert("Você precisa estar logado", "info");
            navigate("/");
        } else {
            buscarVeiculos();
        }
    }, [token]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Lista de Veículos
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
