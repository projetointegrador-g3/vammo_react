import { Bell, MagnifyingGlass, SignOut, List } from "@phosphor-icons/react"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import './Navbar.css'
import { ToastAlert } from "../../utils/ToastAlert"

const Navbar = () => {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  const [termoBusca, setTermoBusca] = useState<string>("");

  // Para desconectar o User
  const { handleLogout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const logout = () => {
    handleLogout()
    ToastAlert('O usuário foi desconectado!', 'info')
    navigate('/')
  }

  function handleBuscarTodosComponentes(e: ChangeEvent<HTMLInputElement>) {
    setTermoBusca(e.target.value);
  }

  function buscarTodosComponentes(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/consultarnome/${termoBusca}`);
    setTermoBusca('');
  }

  // Função para rolar até a seção
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Verifica se está em um dispositivo desktop
      if (window.innerWidth > 1024) {
        // Rolar suavemente até a seção no layout desktop
        section.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          window.scrollBy(0, -100); // Ajuste após rolar para a seção
        }, 500);
      } else {
        // Caso contrário, rolar de maneira normal no mobile
        section.scrollIntoView();
      }
      setIsMenuOpen(false);
    }
  };

  if (location.pathname === "/" || location.pathname === "/about" || location.pathname === "/contact") {
    return (
      <div className="navbar flex justify-between items-center w-full pl-4 md:pl-8 lg:pl-12">
        <img id="logo" src="https://ik.imagekit.io/grupo03/Vammo/vammoblack.png?updatedAt=1741184618721" alt="Logo da Vammo!" className="w-25" />

        <div className="lg:hidden flex items-center cursor-pointer" onClick={toggleMenu}>
          <List size={32} color="#212121" />
        </div>

        <div className="hidden lg:flex gap-5 justify-end flex-grow items-center pr-12">
          {location.pathname === "/" && (
            <>
              <a href="#service" className="hover:scale-110 hover:underline" onClick={() => scrollToSection("service")}>Serviços</a>
              <Link to="/about" className="hover:scale-110 hover:underline">Sobre nós</Link>
              <Link to="/contact" className="hover:scale-110 hover:underline">Contato</Link>
            </>
          )}

          {location.pathname === "/about" && (
            <>
              <Link to="/" className="hover:scale-110 hover:underline">Início</Link>
              <Link to="/contact" className="hover:scale-110 hover:underline">Contato</Link>
            </>
          )}

          {location.pathname === "/contact" && (
            <>
              <Link to="/" className="hover:scale-110 hover:underline">Início</Link>
              <Link to="/about" className="hover:scale-110 hover:underline">Sobre nós</Link>
            </>
          )}
          <Link to="/login" className="transition-all delay-70 text-center font-semibold hover:underline text-[#212121] logindmtxt">Login</Link> |
          
          <Link to="/register" className="block py-2 my-5 bg-[#212121] hover:bg-[#D8F505] hover:text-[#212121] 
          transition-all delay-70 rounded-full w-21 p-1 text-center text-[#f6f5fa] logindm" 
          onClick={() => setIsMenuOpen(false)}>Cadastrar</Link>

          <button className="absolute top-2 right-2 text-2xl text-[#D8F505] cursor-pointer" onClick={toggleMenu}></button>    
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[9999] flex justify-center items-center">
            <div className="bg-[#f6f5fa] p-4 rounded-lg w-[150px] sm:w-[300px] md:w-[350px] shadow-lg">
              {location.pathname === "/" && (
                <>
                  <a href="#service" className="block py-2 pl-7 hover:scale-110" onClick={() => scrollToSection("service")}>Serviços</a>
                  <Link to="/about" className="block py-2 pl-7 hover:scale-110" onClick={() => setIsMenuOpen(false)}>Sobre nós</Link>
                  <Link to="/contact" className="block py-2 pl-7 hover:scale-110" onClick={() => setIsMenuOpen(false)}>Contato</Link>
                </>
              )}

              {location.pathname === "/about" && (
                <>
                  <Link to="/" className="block py-2 pl-7 hover:scale-110" onClick={() => setIsMenuOpen(false)}>Início</Link>
                  <Link to="/contact" className="block py-2 pl-7 hover:scale-110" onClick={() => setIsMenuOpen(false)}>Contato</Link>
                </>
              )}

              {location.pathname === "/contact" && (
                <>
                  <Link to="/" className="block py-2 pl-7 hover:scale-110" onClick={() => setIsMenuOpen(false)}>Início</Link>
                  <Link to="/about" className="block py-2 pl-7 hover:scale-110" onClick={() => setIsMenuOpen(false)}>Sobre nós</Link>
                </>
              )}

              <Link to="/login" className="block py-2 ml-4 mt-2 mb-2 bg-[#212121] hover:bg-[#D8F505] hover:text-[#212121] transition-all delay-70 rounded-full w-21 p-1 text-center text-[#f6f5fa] perfildark" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <button className="absolute top-2 right-2 text-2xl text-[#D8F505] cursor-pointer" onClick={toggleMenu}></button>

            </div>
          </div>
        )}
      </div>
    )
  }

  // Restante do código continua como estava
  if (location.pathname === "/home" || location.pathname === "/veiculo" || location.pathname === "/configuracao" || location.pathname === "/perfil" || location.pathname === "/viagens" 
    || location.pathname.startsWith("/editarperfil/") || location.pathname.startsWith("/cadastrarveiculo") || location.pathname.startsWith("/editarveiculo/") || location.pathname.startsWith("/deletarveiculo/") || location.pathname.startsWith("/deletarviagem/") || location.pathname.startsWith("/editarviagem/") || location.pathname.startsWith("/consultarnome/")) 

    
    return (
      <div className="flex justify-start items-center w-full pl-4 md:pl-[6rem] lg:pl-[8rem] pt-8 resp-navbar">
        
        <div className="relative w-[250px] md:w-[300px] lg:w-[350px]">
        <form onSubmit={buscarTodosComponentes}>
          <input type="text" placeholder="Buscar..." value={termoBusca} onChange={handleBuscarTodosComponentes} className="bg-black/5 pl-4 pr-10 py-2 rounded-full border-0 focus:outline-none w-full resp-busca homeinput1" />
          <MagnifyingGlass className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-110" onClick={() => document.querySelector('form')?.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}))}/>
          </form>
        </div>
        
        <div className="flex gap-8 pl-4 md:pl-8 lg:pl-12 items-center ml-auto mr-2 md:mr-5 lg:mr-10 resp-elementos-navbar">
          <Link to="notificacoes" className="hover:scale-110"><Bell /></Link>

            <Link to='/perfil'>
            <img src={usuario.foto} 
            className="w-15 rounded-full cursor-pointer"
            alt={`Foto de perfil de ${usuario.nome}`} />
            </Link>
            <div className="flex">
            <Link to="/" className="flex items-center gap-2 hover:scale-110 hover:underline" onClick={logout}>Sair<SignOut className="hover:scale-110" /></Link>
          </div>
        </div>
      </div>
    )

  if (location.pathname === "/login" || location.pathname === "/register")
    return <></>
}

export default Navbar;
