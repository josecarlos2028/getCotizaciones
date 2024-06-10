/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

const mongoose = require('mongoose');
const Config = require(__dirname + '/../config/config');

const dbURI = Config.dbURI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Mongoose se ha conectado a:', dbURI);
    } catch (err) {
        console.error('Mongoose con error al conectarse:', err);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose se ha desconectado.');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose se ha desconectado, cuando la app ha terminado.');
    process.exit(0);
});

// Agregamos los modelos
require('./cotizaciones.model');

module.exports = connectDB;
