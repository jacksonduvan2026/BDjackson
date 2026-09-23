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

// DELETE: Eliminar un cliente por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM clientes WHERE id_cliente = ?', [id], (error, resultado) => {
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

        res.json({ mensaje: 'Cliente eliminado correctamente' });
    });
});

module.exports = router;