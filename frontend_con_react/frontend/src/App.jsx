import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Clientes from './components/Clientes';
import Productos from './components/Productos';
import Ventas from './components/Ventas';
import DetalleVenta from './components/Detalle_Venta'; // <-- Agregar el guion bajo aquí

function App() {
  return (
    <Router>
      <Menu />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h3 className="mt-3 text-center">Bienvenido al Sistema de Gestión</h3>} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/detalle-venta" element={<DetalleVenta />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;