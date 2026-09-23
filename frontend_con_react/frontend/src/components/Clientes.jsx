import { useEffect, useState } from 'react';
import api from '../services/api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nomCliente: '',
    contacto: '',
    departamento: '',
    ciudad: ''
  });

  // Obtener clientes
  const cargarClientes = () => {
    setCargando(true);

    api.get('/clientes')
      .then(response => {
        setClientes(response.data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('No se pudo cargar la lista de clientes');
      })
      .finally(() => {
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  // Manejar cambios del formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  // Abrir formulario para crear
  const abrirCrear = () => {
    setEditando(null);

    setFormulario({
      nomCliente: '',
      contacto: '',
      departamento: '',
      ciudad: ''
    });

    setMostrarFormulario(true);
  };

  // Abrir formulario para editar
  const abrirEditar = (cliente) => {
    setEditando(cliente.id_cliente);

    setFormulario({
      nomCliente: cliente.nomCliente || '',
      contacto: cliente.contacto || '',
      departamento: cliente.departamento || '',
      ciudad: cliente.ciudad || ''
    });

    setMostrarFormulario(true);
  };

  // Cancelar formulario
  const cancelarFormulario = () => {
    setMostrarFormulario(false);
    setEditando(null);
  };

  // Crear o editar cliente
  const guardarCliente = (e) => {
    e.preventDefault();

    if (!formulario.nomCliente.trim()) {
      alert('El nombre del cliente es obligatorio');
      return;
    }

    if (editando) {
      api.put(`/clientes/${editando}`, formulario)
        .then(() => {
          alert('Cliente actualizado correctamente');
          cancelarFormulario();
          cargarClientes();
        })
        .catch(err => {
          console.error(err);
          alert('No se pudo actualizar el cliente');
        });
    } else {
      api.post('/clientes', formulario)
        .then(() => {
          alert('Cliente creado correctamente');
          cancelarFormulario();
          cargarClientes();
        })
        .catch(err => {
          console.error(err);
          alert('No se pudo crear el cliente');
        });
    }
  };

  // Eliminar cliente
  const eliminarCliente = (id) => {
    const confirmar = window.confirm(
      '¿Estás seguro de que quieres eliminar este cliente?'
    );

    if (!confirmar) {
      return;
    }

    api.delete(`/clientes/${id}`)
      .then(() => {
        alert('Cliente eliminado correctamente');
        cargarClientes();
      })
      .catch(err => {
        console.error(err);
        alert('No se pudo eliminar el cliente');
      });
  };

  if (cargando) {
    return <p className="mt-3">Cargando clientes...</p>;
  }

  if (error) {
    return <p className="mt-3 text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Clientes</h2>

        <button
          className="btn btn-success"
          onClick={abrirCrear}
        >
          + Crear cliente
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card mb-4">
          <div className="card-header">
            {editando ? 'Editar cliente' : 'Crear cliente'}
          </div>

          <div className="card-body">
            <form onSubmit={guardarCliente}>

              <div className="mb-3">
                <label className="form-label">
                  Nombre
                </label>

                <input
                  type="text"
                  name="nomCliente"
                  className="form-control"
                  value={formulario.nomCliente}
                  onChange={manejarCambio}
                  placeholder="Nombre del cliente"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Contacto
                </label>

                <input
                  type="text"
                  name="contacto"
                  className="form-control"
                  value={formulario.contacto}
                  onChange={manejarCambio}
                  placeholder="Número de contacto"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Departamento
                </label>

                <input
                  type="text"
                  name="departamento"
                  className="form-control"
                  value={formulario.departamento}
                  onChange={manejarCambio}
                  placeholder="Departamento"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Ciudad
                </label>

                <input
                  type="text"
                  name="ciudad"
                  className="form-control"
                  value={formulario.ciudad}
                  onChange={manejarCambio}
                  placeholder="Ciudad"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary me-2"
              >
                {editando ? 'Guardar cambios' : 'Crear cliente'}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelarFormulario}
              >
                Cancelar
              </button>

            </form>
          </div>
        </div>
      )}

      <table className="table table-striped table-bordered">

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
          {clientes.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No hay clientes registrados
              </td>
            </tr>
          ) : (
            clientes.map(cliente => (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>{cliente.nomCliente}</td>
                <td>{cliente.contacto}</td>
                <td>{cliente.departamento}</td>
                <td>{cliente.ciudad}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => abrirEditar(cliente)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarCliente(cliente.id_cliente)}
                  >
                    Eliminar
                  </button>
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>

    </div>
  );
}

export default Clientes;

