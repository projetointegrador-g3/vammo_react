import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Usuario } from '../../model/Usuario';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/Service';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { cn } from '../../utils/cn';
import { ToastAlert } from '../../utils/ToastAlert';
import { RotatingLines } from 'react-loader-spinner';

export default function AuthPage() {
  // Hook
  const navigate = useNavigate();

  // States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    tipo_user: '',
    nome: '',
    data_aniversario: '',
    genero: '',
    usuario: '',
    senha: '',
    foto: '',
    avaliacao: '',
  });

  useEffect(() => {
    if (usuario.id !== 0) retornar();
  }, [usuario]);

  const retornar = async () => {
    navigate('/login');
  };

  const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmarSenha = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmarSenha(e.target.value);
  };

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario);
        ToastAlert('Usuário cadastrado com sucesso! ✨', 'sucesso');
      } catch (error) {
        ToastAlert('Ocorreu um erro ao cadastrar o usuário. ❌', 'erro');
        setIsLoading(false);
      }
    } else {
      ToastAlert('Senha inválida ou não confere. ❌', 'info');
      setUsuario({ ...usuario, senha: '' });
      setConfirmarSenha('');
    }

    setIsLoading(false);
  }

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      {/* Background */}
      <div className='relative hidden bg-muted lg:block'>
        <img
          src='https://ik.imagekit.io/grupo03/Vammo/dirigindo.avif?updatedAt=1741186876235'
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover'
        />
      </div>

        {/* Logo */}
      <div className='flex flex-col md:p-10'>
        <div className='flex justify-end'>
          <Link to='/' className=''>
                <img 
                src='https://ik.imagekit.io/grupo03/Vammo/vammoblack.png?updatedAt=1741184618721'
                className='w-20 h-20' />
          </Link>
        </div>

        <div className='flex flex-1  items-center justify-center'>
          <div className='w-full max-w-xs'>
            <div className='flex flex-col items-center gap-2 text-center'>
              <h1 className='text-2xl font-bold'>Crie uma conta</h1>
              <p className='text-balance text-sm text-muted-foreground mb-5'>
                Adicione algumas informações para sua nova conta
              </p>
            </div>

            {/* Form */}
            <form className={cn('flex flex-col gap-6')} onSubmit={cadastrarNovoUsuario}>

              <div className='grid gap-2 b-0'>
                <Label htmlFor='nome'>Nome</Label>
                <Input
                  id='nome'
                  type='text'
                  placeholder='Seu nome'
                  name='nome'
                  value={usuario.nome}
                  onChange={atualizarEstado}
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='usuario'
                  type='email'
                  placeholder='usuario@exemplo.com'
                  name='usuario'
                  value={usuario.usuario}
                  onChange={atualizarEstado}
                  required
                />

                <Label htmlFor='data_aniversario'>Data de nascimento</Label>
                <Input id='data_aniversario' 
                value={usuario.data_aniversario}
                type='date' onChange={atualizarEstado} />

                <Label htmlFor='password'>Escolha uma senha</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='********'
                  name='senha'
                  value={usuario.senha}
                  onChange={atualizarEstado}
                  required
                />

                <Label htmlFor='confirmarSenha'>Confirme a senha</Label>
                <Input
                  id='confirmarSenha'
                  type='password'
                  placeholder='********'
                  value={confirmarSenha}
                  onChange={handleConfirmarSenha}
                  required
                />
              </div>

              <Button type='submit'>
                {isLoading ? (
                  <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.75' width='24' visible />
                ) : (
                  <span>Cadastrar</span>
                )}
              </Button>

              <div className='relative text-center text-sm after:absolute after:inset-0 after:items-center after:border-t pt-3.5'>
                <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
              </div>
            </form>

            <div className='text-center text-sm'>
              Você já tem uma conta?{' '}
              <Link to='/login' className='underline underline-offset-4 font-semibold'>
                Entre!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
