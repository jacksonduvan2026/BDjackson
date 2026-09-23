import { useEffect, useState } from 'react';
import api from '../services/api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/clientes')
      .then(response => {
        setClientes(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudo cargar la lista de clientes');
        setCargando(false);
        console.error(err);
      });
  }, []);

  // Función para eliminar cliente
  const eliminarCliente = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este cliente?');
    if (!confirmar) return;

    try {
      // Petición DELETE a tu API
      await api.delete(`/clientes/${id}`);
      
      // Actualiza el estado local filtrando el cliente eliminado sin recargar la página
      setClientes(clientes.filter(cliente => cliente.id_cliente !== id));
    } catch (err) {
      console.error('Error al eliminar cliente:', err);
      alert('No se pudo eliminar el cliente. Verifica que el backend tenga configurada la ruta DELETE.');
    }
  };

  if (cargando) return <p className="mt-3">Cargando clientes...</p>;
  if (error) return <p className="mt-3 text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Listado de Clientes</h2>
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Departamento</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.id_cliente}>
              <td>{c.id_cliente}</td>
              <td>{c.nomCliente}</td>
              <td>{c.contacto}</td>
              <td>{c.departamento}</td>
              <td>{c.ciudad}</td>
              <td>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarCliente(c.id_cliente)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;