import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Inicio from './pages/Inicio';
import Registro from './pages/Registro';
import Lista from './pages/Lista';

export default function App() {
  return (
    <>
      <Menu />
      <main className="contenedor">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/lista" element={<Lista />} />
        </Routes>
      </main>
    </>
  );
}
