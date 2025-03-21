import { Car, Gear, House, MapTrifold } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import "./Sidebar.css"

const Sidebar = () => {

  if (location.pathname==="/home" || location.pathname==="/perfil" || location.pathname.startsWith("/editarperfil/") || location.pathname==="/configuracao" || location.pathname==="/veiculo" || location.pathname==="/viagens" || location.pathname.startsWith("/cadastrarveiculo") || location.pathname.startsWith("/editarveiculo/") || location.pathname.startsWith("/deletarveiculo/") || location.pathname.startsWith("/deletarviagem/") || location.pathname.startsWith("/editarviagem/") || location.pathname.startsWith("/consultarnome/")) 
  return (
    <aside className="flex flex-col fixed w-20 md:w-40 lg:w-25 items-center top-0 pl-4 bg-[#212121] gap-10 h-full">
      <img src="https://ik.imagekit.io/grupo03/Vammo/VAMMO%20(1)%201.png?updatedAt=1741183646285" alt="Logo branco da Vammo!" className="w-25 mr-3 mt-3 logo-resp"></img>
      
      <nav className="flex flex-col mt-8 mr-3 items-center pb-12 md:pb-20 lg:pb-32 gap-8 flex-sidebar">
      <Link to="/home" className="hover:scale-110"><House size={24} className="cursor-pointer text-white"/></Link>
      <Link to="/viagens" className="hover:scale-110"><MapTrifold size={24} className="text-white"/></Link>
      <Link to="/veiculo" className="hover:scale-110"><Car size={24} className="text-white"/></Link>
      <div className="absolute bottom-10 md:bottom-20 lg:bottom-32 xl:bottom-20">
        <Link to="/configuracao"><Gear size={24} className="hover:scale-110 cursor-pointer text-white"/></Link>
      </div>
      </nav>
    </aside>
  )

  if (location.pathname==="/login" || location.pathname==="/register")
  return(
    <></>
  )
}

export default Sidebar
