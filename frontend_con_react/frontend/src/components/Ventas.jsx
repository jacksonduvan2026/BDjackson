import { useEffect, useState } from 'react';
import api from '../services/api';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/ventas')
      .then(response => {
        console.log('Respuesta recibida del backend:', response.data);
        
        // Comprobar si la respuesta es un arreglo directo
        if (Array.isArray(response.data)) {
          setVentas(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          // Por si Express responde con { data: [...] }
          setVentas(response.data.data);
        } else {
          setError('El backend no retornó una lista válida de ventas');
        }
        
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudo cargar la lista de ventas');
        setCargando(false);
        console.error(err);
      });
  }, []);

  if (cargando) return <p className="mt-3">Cargando ventas...</p>;
  if (error) return <p className="mt-3 text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Listado de Ventas</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID Venta</th>
            <th>ID Cliente</th>
            <th>Fecha Venta</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id_venta}>
              <td>{v.id_venta}</td>
              <td>{v.id_cliente}</td>
              <td>{v.fecha_venta}</td>
              <td>{v.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ventas;