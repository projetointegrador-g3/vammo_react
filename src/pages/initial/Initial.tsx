import { ArrowRight, Car, ListCheck, MapPin, Navigation, ShieldCheck, UserCheck } from 'lucide-react'
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom'


const Initial = () => {
  return (
    <div>
      <main>
        <section className='bginitial flex flex-col items-center justify-center'>
          <h1 className='font-semibold text-4xl text-center'>Encontre um destino <br/>e vammo?</h1>
          <p>Conectando você ao seu próximo destino de forma rápida e segura. <br/>Vammo simplifica sua jornada com caronas acessíveis e confiáveis.</p>

            <form className="flex flex-col gap-5 mt-5 w-80">
        <section className="p-3 bg-[#D8DFE9] rounded-full flex items-center gap-2">
          <div className='px-2 flex items-center flex-1 gap-2'>
                  <input 
                  type="text" 
                  name='origem' 
                  placeholder='Local de partida'
                  className='bg-transparent text-lg placeholder-[#212121] outline-none flex-1' 
                  />
                  <Navigation />
                </div>
        </section>

        <section className="p-3 bg-[#D8DFE9] rounded-full flex items-center gap-2">
        <div className='px-2 flex items-center flex-1 gap-2'>
                  <input 
                  type="text" 
                  name='origem' 
                  placeholder='Destino'
                  className='bg-transparent text-lg placeholder-[#212121] outline-none flex-1' 
                  />
                  <MapPin />
                </div>
                
                </section>

                <section className="p-2 bg-[var(--yellow)] text-[var(--black)] rounded-full flex items-center gap-2">
                    <div className='px-2 flex items-center flex-1 gap-2'>
                      Verificar Preços
                    </div>
                
                  <Link to="/login" className='bg-[#212121] rounded-full px-5 py-2 flex items-center gap-2 cursor-pointer'>
                    <ArrowRight className='size-5 text-[#F6F5FA]' />
                  </Link>
                
                </section>
            </form>
        </section>

        <section className='mt-20'>
          <h2 id='service' className='font-semibold text-2xl text-center'>Nossos serviços</h2>
          <div className='bg-[#D8DFE9] p-10'>
          <p className='text-center'>Escolha o Vammo perfeito para a sua viagem: </p>
            <div className='flex items-center justify-center gap-20 p-10'>

            <div id='card' className='text-center'>
              <img className='transition duration-0.3 hover:scale-110' src="https://ik.imagekit.io/grupo03/Vammo/assets%20-%20initial%20page/car1.png" alt="" />
              <h3 className='font-semibold text-xl mt-5'>Vammo Easy</h3>
              <p>Mais Promoções</p>
            </div>

            <div id='card' className='text-center'>
              <img className='transition duration-0.3 hover:scale-110' src="https://ik.imagekit.io/grupo03/Vammo/assets%20-%20initial%20page/moto.png" alt="" />
              <h3 className='font-semibold text-xl mt-5'>Vammo Max</h3>
              <p>Mais rapidez</p>
            </div>

            <div id='card' className='text-center'>
              <img className='transition duration-0.3 hover:scale-110' src="https://ik.imagekit.io/grupo03/Vammo/assets%20-%20initial%20page/car3.png" alt="" />
              <h3 className='font-semibold text-xl mt-5'>Vammo Quick</h3>
              <p>Para caber toda a galera</p>
            </div>

            <div id='card' className='text-center'>
              <img className='transition duration-0.3 hover:scale-110'src="https://ik.imagekit.io/grupo03/Vammo/assets%20-%20initial%20page/car2.png" alt="" />
              <h3 className='font-semibold text-xl mt-5'>Vammo Green</h3>
              <p>Carros elétricos</p>
            </div>
            </div>
          </div>

        </section>

        <section className='p-8'>
          
          <div className='flex items-center justify-center gap-10 p-8'>
          <div className='flex flex-col gap-2'>
          <h2 className='font-semibold text-4xl text-center'>Na Vammo você encontra: </h2>
          <p id='topicos'>
            <UserCheck /> Motoristas bem avaliados
          </p>

          <p id='topicos'>
            <Car /> Carros  atuais e em ótimo estado
          </p>

          <p id='topicos'>
            <ListCheck /> Histórico de viagens
          </p>

          <p id='topicos'>
            <ShieldCheck /> Segurança do início ao fim
          </p>
          </div>
          
            <img className='w-150' src="https://ik.imagekit.io/grupo03/Vammo/assets%20-%20initial%20page/couple-car.png?updatedAt=1741188804186" alt="" />
          
          </div>
        </section>
      </main>
      <Footer />
    </div>
    
  )
}

export default Initial;
