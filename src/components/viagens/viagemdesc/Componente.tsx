import React, { useState } from 'react';
import { Viagem } from './ViagemCalc';

const App: React.FC = () => {
    const [viagem, setViagem] = useState<Viagem | null>(null);
    const [tipoUsuario, setTipoUsuario] = useState<'motorista' | 'passageiro'>('passageiro');
    const [valorViagem, setValorViagem] = useState<number>(0);
    const [resultado, setResultado] = useState<string>('');

    const iniciarViagem = () => {
        const novaViagem = new Viagem(tipoUsuario);
        setViagem(novaViagem);
        setResultado('Viagem iniciada!');
    };

    const realizarViagem = () => {
        if (viagem && valorViagem > 0) {
            const valorFinal = viagem.realizarViagem(valorViagem);
            setResultado(`Viagem realizada! Valor final: R$ ${valorFinal.toFixed(2)}`);
        } else {
            setResultado('Por favor, insira um valor válido para a viagem.');
        }
    };

    return (
        <div>
            <h1>Vammo!</h1>
            <div>
                <label>
                    Tipo de Usuário:
                    <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value as 'motorista' | 'passageiro')}>
                        <option value="passageiro">Passageiro</option>
                        <option value="motorista">Motorista</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Valor da Viagem:
                    <input
                        type="number"
                        value={valorViagem}
                        onChange={(e) => setValorViagem(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <button onClick={iniciarViagem}>Iniciar Viagem</button>
            <button onClick={realizarViagem}>Realizar Viagem</button>
            <div>
                <h2>Resultado:</h2>
                <p>{resultado}</p>
            </div>
        </div>
    );
};

export default App;