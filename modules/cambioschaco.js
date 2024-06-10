// modules/cambioschaco.js
const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config/config');
const logger = require('../config/logger');

async function obtenerDatosCambiosChaco() {
    try {
        const { data: html } = await axios.get(config.cambioschaco.url);
        const $ = cheerio.load(html);
        const pizarra = [];

        $('#main-exchange-content tr').each((index, element) => {
            const monedaConfig = config.cambioschaco.parseConfig.find(cfg => cfg.id === $(element).attr('id'));
            if (monedaConfig) {
                const moneda = monedaConfig.moneda;
                const compra = parseFloat($(element).find('.purchase').text().replace(',', '').trim());
                const venta = parseFloat($(element).find('.sale').text().replace(',', '').trim());
                const spread = venta - compra;

                pizarra.push({
                    moneda,
                    codigo: monedaConfig.moneda,
                    compra,
                    venta,
                    spread
                });
            }
        });

        return {
            InfoCotizacion: {
                entidad: 'Cambios Chaco',
                fecha: new Date().toISOString().split('T')[0],
                pizarra
            }
        };
    } catch (error) {
        logger.error('Error al obtener datos de Cambios Chaco: %O', error);
        throw error;
    }
}

module.exports = obtenerDatosCambiosChaco;
