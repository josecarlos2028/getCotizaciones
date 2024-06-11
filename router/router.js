// router/router.js
const express = require('express');
const router = express.Router();
const obtenerDatosCambiosChaco = require('../modules/cambioschaco');
const logger = require('../config/logger');

router.get('/cambioschaco', async (req, res) => {
    try {
        const datos = await obtenerDatosCambiosChaco();
        res.json({ sdtInfoCotizacion: datos });
    } catch (error) {
        logger.error('Error en la ruta /cambioschaco: %O', error);
        res.status(500).json({ error: 'Error al obtener datos de Cambios Chaco' });
    }
});

module.exports = router;
