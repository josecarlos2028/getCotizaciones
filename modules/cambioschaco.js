// modules/cambioschaco.js
const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config/config');
const logger = require('../config/logger');

function parseNumber(value) {
    // Detect if comma is used as decimal separator
    const hasCommaAsDecimal = value.includes(',');
    const hasPointAsThousands = value.includes('.');

    if (hasCommaAsDecimal && hasPointAsThousands) {
        // Handle European style numbers: 1.234,56
        value = value.replace('.', '').replace(',', '.');
    } else if (hasCommaAsDecimal) {
        // Handle numbers with commas as decimal separator: 1,234
        value = value.replace(',', '.');
    } else if (hasPointAsThousands) {
        // Handle numbers with points as thousands separator: 1.234
        value = value.replace('.', '');
    }

    return parseFloat(value);
}

async function obtenerDatosCambiosChaco() {
    try {
        const { data: html } = await axios.get(config.cambioschaco.url);
        const $ = cheerio.load(html);
        const pizarraItems = [];

        $('#main-exchange-content tr').each((index, element) => {
            const monedaConfig = config.cambioschaco.parseConfig.find(cfg => cfg.id === $(element).attr('id'));
            if (monedaConfig) {
                const moneda = monedaConfig.moneda;
                const compra = parseNumber($(element).find('.purchase').text().trim());
                const venta = parseNumber($(element).find('.sale').text().trim());
                const spread = venta - compra;

                pizarraItems.push({
                    moneda,
                    codigo: monedaConfig.moneda,
                    compra,
                    venta,
                    spread
                });
            }
        });

        return {
            entidad: 'Cambios Chaco',
            fecha: new Date().toISOString().split('T')[0],
            pizarra: {
                pizarraItem: pizarraItems
            }
        };
    } catch (error) {
        logger.error('Error al obtener datos de Cambios Chaco: %O', error);
        throw error;
    }
}

module.exports = obtenerDatosCambiosChaco;
