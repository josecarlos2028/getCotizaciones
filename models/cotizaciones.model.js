/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

const mongoose = require('mongoose');

const cotizacionesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    entidad: {
        type: String,
        required: true
    },
    moneda: {
        type: String,
        required: true
    },
    compra: {
        type: Number,
        required: true,
        default: 0
    },
    venta: {
        type: Number,
        required: true,
        default: 0
    },
    spread: {
        type: Number,
        required: true,
        default: 0
    },
    difcompra: {
        type: Number,
        required: true,
        default: 0
    },
    difventa: {
        type: Number,
        required: true,
        default: 0
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
}, {
    timestamps: true // Añadimos timestamps para createdAt y updatedAt
});

module.exports = mongoose.model('Cotizaciones', cotizacionesSchema);
