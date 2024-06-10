/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

const mongoose = require('mongoose');
const CronJob = require('cron').CronJob;

const Cotizaciones = require('./models/cotizaciones.model');
const BancoAmambay = require('./modules/amambay');
const BancoAtlas = require('./modules/atlas');
const BancoBBVA = require('./modules/bbva');
const CambiosAlberdi = require('./modules/cambiosalberdi');
const CambiosChaco = require('./modules/cambioschaco');
const Familiar = require('./modules/familiar');
const Interfisa = require('./modules/interfisa');
const MaxiCambios = require('./modules/maxicambios');
const Generico = require('./modules/generico');

mongoose.connection.once('connected', () => {
    console.log("Conectados a la base de datos.");
    new CronJob('00 00,30 8,9,10,11,12,13,14,15,16,17 * * 1-5', recorrerEntidades, null, true, "America/Asuncion");
    new CronJob('10 00,30 8,9,10,11,12,13,14,15,16,17 * * 1-5', ctrlDifCambio, null, true, "America/Asuncion");
});

const ctrlDifCambio = async () => {
    for (const value of Generico.recorrido) {
        await Generico.updateDifCambio(value.id, value.moneda);
    }
};

const recorrerEntidades = async () => {
    const getCotizacionesHTMLlocal = async (modulo, nombre) => {
        console.time('Guardamos ' + nombre + ' en');
        try {
            const result = await Generico.getCotizacionesHTML(modulo, nombre);
            for (const value of result) {
                const cotizacion = new Cotizaciones(value);
                await cotizacion.save();
            }
        } catch (error) {
            console.log(nombre + ' volvio vacio: ', error);
        }
        console.timeEnd('Guardamos ' + nombre + ' en');
    };

    await getCotizacionesHTMLlocal(BancoAmambay, 'BancoAmambay');
    await getCotizacionesHTMLlocal(BancoAtlas, 'BancoAtlas');
    await getCotizacionesHTMLlocal(BancoBBVA, 'BancoBBVA');
    await getCotizacionesHTMLlocal(CambiosAlberdi, 'CambiosAlberdi');
    await getCotizacionesHTMLlocal(CambiosChaco, 'CambiosChaco');
    await getCotizacionesHTMLlocal(Interfisa, 'Interfisa');
    await getCotizacionesHTMLlocal(Familiar, 'Familiar');
    await getCotizacionesHTMLlocal(MaxiCambios, 'MaxiCambios');
};
