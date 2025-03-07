import { ToastContainer } from 'react-toastify'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Initial from './pages/initial/Initial'
import { AuthProvider } from './contexts/AuthContext'
import ListaViagens from './components/viagens/listarviagem/ListarViagem'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import DeletarViagem from './components/viagens/deletarviagens/DeletarViagens'
import ListarViagensOrigem from './components/viagens/listarviagemorigem/ListarViagemOrigem'
import ListaVeiculos from './components/veiculos/listaveiculos/ListaVeiculos'
import FormVeiculo from './components/veiculos/formveiculo/FormVeiculo'
import DeletarVeiculo from './components/veiculos/deletarveiculo/DeletarVeiculos'
import Configuracao from './components/configuracoes/Configuracao'
import PagePerfil from './components/perfil/PagePerfil'
import FormPerfil from './components/perfil/FormPerfil'
import FormViagens from './components/viagens/formviagens/FormViagens'

function App() {

  const location=useLocation()

  return (
    <>
      <AuthProvider>
        <ToastContainer />

        {location.pathname !=="/login" && location.pathname !=="/register" && (
          <>
            <Navbar/>
            <Sidebar/>
          </>
        )}
        
        <Routes>
          <Route path="/" element={<Initial />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/viagens" element={<ListaViagens />} />
          <Route path="/cadastrarviagem" element={<FormViagens />} />
          <Route path="/editarviagem/:id" element={<FormViagens />} />
          <Route path="/deletarviagem/:id" element={<DeletarViagem />} />
          <Route path="/consultarviagem/:origem" element={<ListarViagensOrigem />} />
          {/* <Route path="/consultarviagem/:historico" element={<ListarViagensHistorico />} />   */}
          <Route path="/veiculo" element={<ListaVeiculos />} />
          <Route path="/cadastrarveiculo" element={<FormVeiculo />} />
          <Route path="/editarveiculo/:id" element={<FormVeiculo />} />
          <Route path="/deletarveiculo/:id" element={<DeletarVeiculo />} />
          <Route path="/configuracao" element={<Configuracao />} />
          <Route path="/perfil" element={<PagePerfil />} />
          <Route path="/editarperfil/:id" element={<FormPerfil />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
