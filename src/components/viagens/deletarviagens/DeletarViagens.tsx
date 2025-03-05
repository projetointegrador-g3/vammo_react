import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlert } from "../../../utils/ToastAlert";
import { Viagem } from "../../../model/Viagem";

function DeletarViagem() {
    const navigate = useNavigate();

    const [viagem, setViagem] = useState<Viagem>({} as Viagem);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();

    async function buscarPorID(id: string) {
        try {
            await buscar(`/viagens/${id}`, setViagem, {});
        } catch (error) {
            ToastAlert("Erro ao buscar Viagem", "erro");
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorID(id);
        }
    }, [id]);

    async function deletarViagem() {
        setIsLoading(true);

        try {
            await deletar(`/viagens/${id}`, {});
            ToastAlert("Viagem apagada com sucesso", "sucesso");
        } catch (error: any) {
            ToastAlert("Erro ao deletar a Viagem.", "erro");
        }
        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate("/viagens");
    }

    return (
        <div className="container w-2/4 mx-auto border rounded-lg p-4 mt-20">
            <h1 className="text-3xl text-center my-4">Deletar Viagem</h1>
            <p className="text-center mb-4">
                Você tem certeza de que deseja apagar a viagem a seguir?
            </p>

            <div className="flex flex-col overflow-hidden justify-between">
                <p className="text-2xl h-full text-center p-6 relative">
                    {viagem.origem} para {viagem.destino}
                </p>

                <div className="flex gap-10">
                    <button
                        className="flex justify-center text-center rounded-lg text-[var(--colorWhite)] bg-[var(--colorRed)] w-full py-2 hover:bg-[var(--colorRedDark)] cursor-pointer"
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className="flex justify-center text-center rounded-lg text-[var(--colorWhite)] bg-[var(--colorCyan)] w-full py-2 hover:bg-[var(--colorCyanDark)] cursor-pointer"
                        onClick={deletarViagem}
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

export default DeletarViagem;
