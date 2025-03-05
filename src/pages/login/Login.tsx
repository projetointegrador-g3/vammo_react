import { NavLink } from "react-router-dom"
import { LoginForm } from "../../components/forms/LoginForm"

const Login = () => {

  return (
    <div className='grid h-screen lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-5'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <NavLink to='/' className='flex items-center gap-2 font-medium'>
            <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
            </div>
            <img 
            src='https://ik.imagekit.io/grupo03/Vammo/vammoblack.png?updatedAt=1741184618721'
            className='w-30' />
          </NavLink>
        </div>

      {/* Formulário Login */}
      <div className='flex flex-1 items-center justify-center'>
          <LoginForm />
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
