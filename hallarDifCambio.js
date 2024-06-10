/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

const mongoose = require('mongoose');
const Cotizaciones = require('./models/cotizaciones.model');

const getHoy = () => {
    const hoy = new Date(Date.now());
    return new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
};

const findCotizacionPrevia = async (id, moneda, fecha) => {
    try {
        return await Cotizaciones.find({ id, moneda, fecha: { $lt: fecha } }, { _id: 0, compra: 1, venta: 1 })
            .sort({ fecha: -1 })
            .limit(1)
            .exec();
    } catch (error) {
        return [];
    }
};

const updateDifCambio = async (id, moneda) => {
    console.time('updateDifCambio(' + id + ', ' + moneda + ')');
    try {
        const result = await Cotizaciones.find({ id, moneda, fecha: { $gte: getHoy() } })
            .sort({ fecha: -1 })
            .exec();

        for (const value of result) {
            const prevResult = await findCotizacionPrevia(value.id, value.moneda, value.fecha);
            if (prevResult.length > 0) {
                const difcompra = value.compra - prevResult[0].compra;
                const difventa = value.venta - prevResult[0].venta;

                await Cotizaciones.updateOne({ _id: value._id }, {
                    $set: {
                        difcompra,
                        difventa
                    }
                }).exec();
            }
        }
    } catch (error) {
        console.log(error);
    }
    console.timeEnd('updateDifCambio(' + id + ', ' + moneda + ')');
};

const recorrido = [
    { id: 1, moneda: 'Dolar' },
    { id: 1, moneda: 'Euro' },
    { id: 1, moneda: 'Peso Argentino' },
    { id: 1, moneda: 'Real' },
    { id: 2, moneda: 'Dolar' },
    { id: 2, moneda: 'Euro' },
    { id: 2, moneda: 'Peso Argentino' },
    { id: 2, moneda: 'Real' },
    { id: 3, moneda: 'Dolar' },
    { id: 3, moneda: 'Euro' },
    { id: 4, moneda: 'Dolar' },
    { id: 4, moneda: 'Euro' },
    { id: 4, moneda: 'Peso Argentino' },
    { id: 4, moneda: 'Real' },
    { id: 5, moneda: 'Dolar' },
    { id: 5, moneda: 'Euro' },
    { id: 5, moneda: 'Peso Argentino' },
    { id: 5, moneda: 'Real' },
    { id: 6, moneda: 'Dolar' },
    { id: 6, moneda: 'Euro' },
    { id: 6, moneda: 'Peso Argentino' },
    { id: 6, moneda: 'Real' },
    { id: 7, moneda: 'Dolar' },
    { id: 7, moneda: 'Euro' },
    { id: 7, moneda: 'Peso Argentino' },
    { id: 7, moneda: 'Real' },
    { id: 8, moneda: 'Dolar' },
    { id: 8, moneda: 'Euro' },
    { id: 8, moneda: 'Peso Argentino' },
    { id: 8, moneda: 'Real' },
];

(async () => {
    for (const value of recorrido) {
        await updateDifCambio(value.id, value.moneda);
    }
})();
