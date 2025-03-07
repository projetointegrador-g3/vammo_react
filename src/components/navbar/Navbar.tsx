import { Bell, MagnifyingGlass, SignOut } from "@phosphor-icons/react"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
const Navbar = () => {

  const {usuario}=useContext(AuthContext)

  if (location.pathname==="/")
  return (
    <div className="flex pl-18">
      <img id="logo" src="https://ik.imagekit.io/grupo03/Vammo/vammoblack.png?updatedAt=1741184618721" alt="Logo da Vammo!" className="w-25"></img>

      <div className="flex gap-5 pl-170 items-center">
        <a href="#service" className="hover:scale-110 hover:underline">Serviços</a>
        <Link to="/about" className="hover:scale-110 hover:underline">Sobre nós</Link>
        <Link to="/contact" className="hover:scale-110 hover:underline">Contato</Link>
        <Link to="/login" className="bg-[#212121] hover:bg-[#D8F505] hover:text-[#212121] transition-all delay-70 rounded-full w-20 p-1 text-center text-[#f6f5fa]">Login</Link>
      </div>
    </div>
  )

  if (location.pathname==="/about")
    return (
      <div className="flex pl-18">
        <img src="https://ik.imagekit.io/grupo03/Vammo/vammoblack.png?updatedAt=1741184618721" alt="Logo da Vammo!" className="w-25"></img>
  
        <div className="flex gap-5 pl-199 items-center">
          <Link to="/" className="hover:scale-110 hover:underline">Início</Link>
          <Link to="/contact" className="hover:scale-110 hover:underline">Contato</Link>
          <Link to="/login" className="bg-[#212121] hover:bg-[#D8F505] hover:text-[#212121] transition-all delay-70 rounded-full w-20 p-1 text-center text-[#f6f5fa]">Login</Link>
        </div>
      </div>
    )

    if (location.pathname==="/contact")
      return (
        <div className="flex pl-18">
          <img src="https://ik.imagekit.io/grupo03/Vammo/vammoblack.png?updatedAt=1741184618721" alt="Logo da Vammo!" className="w-25"></img>
    
          <div className="flex gap-5 pl-195 items-center">
            <Link to="/" className="hover:scale-110 hover:underline">Início</Link>
            <Link to="/about" className="hover:scale-110 hover:underline">Sobre nós</Link>
            <Link to="/login" className="bg-[#212121] hover:bg-[#D8F505] hover:text-[#212121] transition-all delay-70 rounded-full w-20 p-1 text-center text-[#f6f5fa]">Login</Link>
          </div>
        </div>
      )

if (location.pathname==="/home" || location.pathname==="/veiculo" || location.pathname==="/configuracao" || location.pathname==="/perfil" || location.pathname==="/viagens")
  return(
    <div className="flex pl-30 pt-8 ">
      <div className="flex">
        <input type="text" placeholder="Buscar..." className="bg-black/5 pl-4 pr-30 py-2 rounded-full border-0 focus:outline-none"/>
        <MagnifyingGlass className="absolute ml-72 mt-3 cursor-pointer hover:scale-110"/>
      </div>

      <div className="flex gap-8 pl-230 items-center ">
        <Link to="notificacoes" className="hover:scale-110"><Bell/></Link>
        <Link to="/perfil">
          <img className="w-10 rounded-full" src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`}></img>
        </Link>
        <div className="flex">
          <Link to="/" className="flex items-center gap-2 hover:scale-110 hover:underline">Sair<SignOut className="hover:scale-110"/></Link>
        </div>
      </div>
    </div>
  )

  if (location.pathname==="/login" || location.pathname==="/register")
  return(
    <></>
  )
} 
export default Navbar