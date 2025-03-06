import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Initial from './pages/initial/Initial'
import DeletarVeiculo from './components/veiculos/deletarveiculo/DeletarVeiculos'
import ListaVeiculos from './components/veiculos/listaveiculos/ListaVeiculos'
import FormVeiculo from './components/veiculos/formveiculo/FormVeiculo'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/login/Login'

function App() {
  
  return (
    <>
      <AuthProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/veiculos" element={<ListaVeiculos />} />
        <Route path="/cadastrarveiculo" element={<FormVeiculo />} />
        <Route path="/editarveiculo/:id" element={<FormVeiculo />} />
        <Route path="/deletarveiculo/:id" element={<DeletarVeiculo />} />
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
