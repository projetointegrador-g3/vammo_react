import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Initial from './pages/initial/Initial'
<<<<<<< HEAD
import { AuthProvider } from './contexts/AuthContext'
import ListaViagens from './components/viagens/listarviagem/ListarViagem'
import FormViagens from './components/viagens/formviagens/FormViagens'
import Login from './pages/login/Login'
import Register from './pages/register/Register'

=======
import DeletarVeiculo from './components/veiculos/deletarveiculo/DeletarVeiculos'
import ListaVeiculos from './components/veiculos/listaveiculos/ListaVeiculos'
import FormVeiculo from './components/veiculos/formveiculo/FormVeiculo'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/login/Login'
>>>>>>> origin/02_veiculos

function App() {
  return (
    <>
      <AuthProvider>
      <ToastContainer />
      
        <Routes>
          <Route path="/" element={<Initial />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/viagens" element={<ListaViagens />} />
          <Route path="/cadastrarviagem" element={<FormViagens />} />
          {/* <Route path="/editarviagem/:id" element={<FormViagens />} />
          <Route path="/deletarviagem/:id" element={<DeletarViagem />} />
          <Route path="/consultarviagem/:origem" element={<ListarViagemsPorOrigem />} /> */} 
          {/* <Route path="/consultarviagem/:historico" element={<ListarViagemsPorHistorico />} /> */} 
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
