import { Bell, MagnifyingGlass, SignOut } from "@phosphor-icons/react"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
const Navbar = () => {

  const {usuario}=useContext(AuthContext)

  if (location.pathname==="/" || location.pathname==="/about")
  return (
    <div className="flex pl-18">
      <img src="https://ik.imagekit.io/grupo03/Vammo/vammoblack.png?updatedAt=1741184618721" alt="Logo da Vammo!" className="w-25"></img>

      <div className="flex gap-5 pl-170 items-center">
        <Link to="/">Início</Link>
        <Link to="#service">Serviços</Link>
        <Link to="/about">Sobre nós</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/login" className="bg-[#212121] rounded-full w-15 text-center text-[#f6f5fa]">Login</Link>
      </div>
    </div>
  )

  if (location.pathname==="/home" || location.pathname==="/veiculo" || location.pathname==="/configuracoes" || location.pathname==="/perfil" || location.pathname==="/viagens")
  return(
    <div className="flex pl-30 pt-8">
      <div className="flex">
        <input type="text" placeholder="Buscar..." className="bg-black/5 pl-4 pr-30 py-2 rounded-full border-0 focus:outline-none"/>
        <MagnifyingGlass className="absolute ml-72 mt-3 cursor-pointer"/>
      </div>

      <div className="flex gap-8 pl-125 items-center">
        <Link to="notificacoes"><Bell/></Link>
        <img src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`}></img>
        <div className="flex">
          <Link to="/">Sair<SignOut className="absolute top-11 ml-8"/></Link>
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