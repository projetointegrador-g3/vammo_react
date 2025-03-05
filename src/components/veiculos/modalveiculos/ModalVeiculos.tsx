import Popup from 'reactjs-popup';
import FormVeiculo from "../formveiculo/FormVeiculo";

function ModalVeiculo(){
    return(
        <>
            <Popup
                    trigger={<button>Novo Veiculo</button>}modal>
                    <FormVeiculo/>
            </Popup>
        </>
    )
}
export default ModalVeiculo;