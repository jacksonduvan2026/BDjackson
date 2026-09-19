var express = require('express');
var router = express.Router();

const conexion = require('../config/db');

router.get('/', (req, res) => {
    conexion.query('SELECT * FROM productos', (error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al consultar los productos'
            });
        }

        res.json(resultados);
    });
});

module.exports = router;