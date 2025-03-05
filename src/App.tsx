import { ToastContainer } from 'react-toastify'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Initial from './pages/initial/Initial'
import ListarUsuarios from './components/usuarios/listarusuarios/ListarUsuarios'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  
  return (
    <>
      <AuthProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/all" element={<ListarUsuarios/>}/>
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
