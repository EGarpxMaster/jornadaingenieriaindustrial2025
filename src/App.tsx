import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import Historia from './pages/historia/historia';
import Actividades from './pages/actividades/actividades';
import Concurso from './pages/concurso/concurso';
import Registro from './pages/registro/registro';
import Aliados from './pages/aliados/aliados';
import Staff from './pages/staff/staff';
import Navbar from "./components/navbar/navbar";
import Footer from './components/footer/footer';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/concurso" element={<Concurso />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/aliados" element={<Aliados />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App