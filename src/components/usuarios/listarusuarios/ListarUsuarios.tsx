import { useEffect, useState } from 'react';
import { buscar } from '../../../services/Service';


interface Usuario {
    id: number;
    tipo_user: string;
    nome: string;
    data_aniversario: string;
    genero: string;
    usuario: string;
    senha: string;
    foto: string;
    avaliacao: string;
    viagem?: Usuario | null;
}

function ListarUsuarios() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  async function consultarUsuarios() {

    try {
      await buscar('/all', setUsuarios, {
        headers: {
            Authorization: token,
        },
      });
    } catch (error: any) {
      alert('Erro!')
    }
    
  }

  useEffect(() => {
    consultarUsuarios();
  }, []);

  return (
    <div className='lista'>
      <h1>Lista de usuários - Gerada pelo Axios</h1>
      <ul>
        {usuarios.map( (usuario) => (
          <li key={usuario.id}>{usuario.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListarUsuarios;