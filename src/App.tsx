import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Initial from './pages/initial/Initial'
import Navbar from './components/navbar/Navbar' 
import Sidebar from './components/sidebar/Sidebar'

function App() {
  
  return (
    <>
      <ToastContainer />
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
