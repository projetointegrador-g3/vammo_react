import { NavLink } from "react-router-dom"
import { LoginForm } from "../../components/forms/LoginForm"


const Login = () => {
  return (
    
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-5'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <NavLink to='/' className='flex items-center gap-2 font-medium'>
            <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
            </div>
            <img 
            src='https://ik.imagekit.io/grupo03/DishDash/DishDash-logo.png?updatedAt=1740667879038'
            className='w-25' />
          </NavLink>
        </div>

      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full max-w-xs'>
          <LoginForm />
        </div>
      </div>
    </div>
    <div className='relative hidden bg-muted lg:block'>
      <img
        src='https://ik.imagekit.io/grupo03/DishDash/Copy?updatedAt=1740668460868'
        alt='Imagem'
        className='h-[100vh] w-[100vh] mx-15'
      />
    </div>
  </div> 
  )
}

export default Login
