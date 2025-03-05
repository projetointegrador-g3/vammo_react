import { Link, NavLink, useNavigate } from "react-router-dom"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import UsuarioLogin from "../../model/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { cn } from "../../utils/cn";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { RotatingLines } from 'react-loader-spinner';

export function Login ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {

  const navigate = useNavigate();

  const {usuario, handleLogin, isLoading } = useContext(AuthContext)

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  )

  useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    console.log(JSON.stringify(usuarioLogin))


    return (
      <div className='grid h-screen lg:grid-cols-2'>
        <div className='flex flex-col gap-4 p-6 md:p-5'>
          <div className='flex justify-center gap-2 md:justify-start'>
            <NavLink to='/' className='flex items-center gap-2 font-medium'>
              <img 
              src='https://ik.imagekit.io/grupo03/Vammo/vammoblack.png?updatedAt=1741184618721'
              className='w-30' />
            </NavLink>
          </div>
  
        {/* Formulário Login */}
        <div className='flex flex-1 items-center justify-center'>
            
        <form className={cn('flex flex-col w-100 gap-6', className)} {...props} onSubmit={login}>
          <div className='flex flex-col items-center gap-2 text-center'>
            <h1 className='text-2xl font-bold'>Boas-vindas!</h1>
            <p className='text-balance text-sm'>
              Entre com seu email e senha para ter acesso
            </p>
          </div>
    
          {/* Inicio Forms */}
          <div className='grid gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='usuario' type='email' placeholder='admin@email.com' required
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
    
            {/* Senha */}
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Senha</Label>
                <a
                  href='#'
                  className='ml-auto text-sm underline-offset-4 hover:underline'>
                  {/* Esqueceu sua senha? */}
                </a>
              </div>
              <Input id='senha' type='password' placeholder='********' required 
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
  
            {/* Lembrar de mim */}
            <div className='flex items-center gap-2 text-sm'>
              <input type='checkbox' id='lembrar' 
              className='border-2 rounded p-2'/>
              <label htmlFor='lembrar'>Lembrar-me</label>
            
  
            {/* Esqueceu a senha */}
              <Link to='/forgot-password' className='ml-43 underline-offset-4 hover:underline'>
                Esqueceu a senha?
              </Link>
            </div>
  
  
            {/* Botões */}
            <Button type='submit' className='w-full'>
            {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Entrar</span>
                        }
            </Button>
  
            <div className='relative text-center text-sm '>
              <span className='relative z-10 px-2 text-muted-foreground'>
                Ou entre com
              </span>
  
              {/* Botão Google */}
              <button>
                <img src='https://ik.imagekit.io/grupo03/Vammo/google-sigh-up%20(1).png?updatedAt=1741185816536'
              className='w-10 mt-3 mx-45 cursor-pointer'/>
              </button>
            </div>
          </div>
  
          <div className='text-center text-sm'>
            Ainda não tem uma conta?{' '}
            <Link to='/register' className='text-purple-800 hover:underline'>
              Cadastre-se!
            </Link>
          </div>
        </form>
        
        </div>
      </div>
  
      {/* Imagem lateral */}
      <div className='relative hidden bg-muted lg:block w-[50vw] h-[100vh]'>
        <img
          src='https://ik.imagekit.io/grupo03/Vammo/car.png?updatedAt=1741184620379'
          alt='Imagem'
          className='h-full w-full object-cover'
        />
      </div>
    </div> 
    )
  }
  
  export default Login
  