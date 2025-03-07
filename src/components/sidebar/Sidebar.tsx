import { Car, Gear, House, MapTrifold } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

const Sidebar = () => {

  if (location.pathname==="/home" || location.pathname==="/perfil" || location.pathname.startsWith("/editarperfil/") || location.pathname==="/configuracao" || location.pathname==="/veiculo" || location.pathname==="/viagens")
  return (
    <aside className="flex flex-col fixed w-25 h-full items-center top-0 pl-4 bg-[#212121] gap-10">
      <img src="https://ik.imagekit.io/grupo03/Vammo/VAMMO%20(1)%201.png?updatedAt=1741183646285" alt="Logo branco da Vammo!" className="w-25 mr-4 mt-3"></img>
      
      <nav className="flex flex-col mt-8 mr-5 items-center pb-50 gap-8">
      <Link to="/home" className="hover:scale-110"><House size={24} className="cursor-pointer text-white"/></Link>
      <Link to="/viagens" className="hover:scale-110"><MapTrifold size={24} className="text-white"/></Link>
      <Link to="/veiculo" className="hover:scale-110"><Car size={24} className="text-white"/></Link>
      <div className="pt-40">
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
