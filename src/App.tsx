import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Initial from "./pages/initial/Initial";
import ListaViagens from "./components/viagens/listarviagem/ListarViagem";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/viagens" element={<ListaViagens />} />
        {/* <Route path="/cadastrarviagem" element={<FormViagems />} />
        <Route path="/editarviagem/:id" element={<FormViagems />} />
        <Route path="/deletarviagem/:id" element={<DeletarViagem />} />
        <Route path="/consultarviagem/:origem" element={<ListarViagemsPorOrigem />} /> */}
        {/* <Route path="/consultarviagem/:historico" element={<ListarViagemsPorHistorico />} /> */} 
      </Routes>
    </>
  );
}

export default App;
