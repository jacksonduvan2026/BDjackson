import { useEffect, useState } from 'react';
import api from '../services/api';

function DetalleVenta() {
  const [detalles, setDetalles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/detalle_venta')
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : response.data.data;
        setDetalles(data || []);
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudo cargar la lista de detalles de venta');
        setCargando(false);
        console.error(err);
      });
  }, []);

  if (cargando) return <p className="mt-3">Cargando detalles de venta...</p>;
  if (error) return <p className="mt-3 text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Detalle de Ventas</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID Detalle</th>
            <th>ID Venta</th>
            <th>ID Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map(d => (
            <tr key={d.id_detalle}>
              <td>{d.id_detalle}</td>
              <td>{d.id_venta}</td>
              <td>{d.id_producto}</td>
              <td>{d.cantidad}</td>
              <td>${Number(d.precio_unitario).toLocaleString()}</td>
              <td>${Number(d.subtotal).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetalleVenta;