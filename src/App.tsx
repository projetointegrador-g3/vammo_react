import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Initial from './pages/initial/Initial'
import { AuthProvider } from './contexts/AuthContext'
import ListaViagens from './components/viagens/listarviagem/ListarViagem'
import FormViagens from './components/viagens/formviagens/FormViagens'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
<<<<<<< HEAD
=======
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
>>>>>>> c6b63d016b9bcd1412bb0048a99630895251f73b

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
          <Route path="/editarviagem/:id" element={<FormViagens />} />
          <Route path="/deletarviagem/:id" element={<DeletarViagem />} />
          <Route path="/consultarviagem/:origem" element={<ListarViagensOrigem />} />
          {/* <Route path="/consultarviagem/:historico" element={<ListarViagensHistorico />} />   */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
