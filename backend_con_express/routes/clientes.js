var express = require('express');
var router = express.Router();

const conexion = require('../config/db');

// GET: Obtener todos los clientes
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM clientes', (error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al consultar los clientes'
            });
        }

        res.json(resultados);
    });
});

// POST: Crear un nuevo cliente
router.post('/', (req, res) => {
    const { nomCliente, contacto, departamento, ciudad } = req.body;

    if (!nomCliente) {
        return res.status(400).json({
            error: 'El nombre del cliente es obligatorio'
        });
    }

    const sql = `
        INSERT INTO clientes (nomCliente, contacto, departamento, ciudad)
        VALUES (?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [nomCliente, contacto || null, departamento || null, ciudad || null],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al crear el cliente'
                });
            }

            res.status(201).json({
                mensaje: 'Cliente creado correctamente',
                id_cliente: resultado.insertId
            });
        }
    );
});

// PUT: Editar un cliente por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nomCliente, contacto, departamento, ciudad } = req.body;

    if (!nomCliente) {
        return res.status(400).json({
            error: 'El nombre del cliente es obligatorio'
        });
    }

    const sql = `
        UPDATE clientes
        SET nomCliente = ?,
            contacto = ?,
            departamento = ?,
            ciudad = ?
        WHERE id_cliente = ?
    `;

    conexion.query(
        sql,
        [
            nomCliente,
            contacto || null,
            departamento || null,
            ciudad || null,
            id
        ],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al editar el cliente'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Cliente no encontrado'
                });
            }

            res.json({
                mensaje: 'Cliente actualizado correctamente'
            });
        }
    );
});

// DELETE: Eliminar un cliente por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    conexion.query(
        'DELETE FROM clientes WHERE id_cliente = ?',
        [id],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al eliminar el cliente'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Cliente no encontrado'
                });
            }

            res.json({
                mensaje: 'Cliente eliminado correctamente'
            });
        }
    );
});

module.exports = router;

