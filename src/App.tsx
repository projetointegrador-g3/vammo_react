import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Initial from './pages/initial/Initial'
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
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
