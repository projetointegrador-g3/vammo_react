import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "../../utils/cn";
import { Label } from "../ui/label";

export function LoginForm({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<'form'>) {
  
    return (
      <form className={cn('flex flex-col gap-6', className)} {...props}>
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
            <Input id='email' type='email' placeholder='admin@email.com' required />
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
            <Input id='password' type='password' placeholder='********' required />
          </div>

          {/* Lembrar de mim */}
          <div className='flex items-center gap-2 text-sm'>
            <input type='checkbox' id='lembrar' 
            className='border-2 border-orange-600 rounded p-2'/>
            <label htmlFor='lembrar'>Lembrar-me</label>
          

          {/* Esqueceu a senha */}
            <Link to='/forgot-password' className='ml-15 underline-offset-4 hover:underline'>
              Esqueceu a senha?
            </Link>
          </div>


          {/* Botões */}
          <Button type='submit' className='w-full'>Entrar</Button>

          {/* Barra horizontal */}
          <div className='relative text-center text-sm '>
            <span className='relative z-10 px-2 text-muted-foreground'>
              Ou entre com
            </span>

            {/* Botão Google */}
            <img src='https://ik.imagekit.io/grupo03/DishDash/google-sigh-up.png?updatedAt=1740670098307'
            className='w-10 mt-3 mx-35'/>
          </div>
        </div>

        <div className='text-center text-sm'>
          Ainda não tem uma conta?{' '}
          <Link to='/register' className='text-orange-700'>
            Cadastre-se!
          </Link>
        </div>
      </form>
    )
  }