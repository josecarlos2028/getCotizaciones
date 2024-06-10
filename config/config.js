require('dotenv').config(); // Cargar variables de entorno desde .env

module.exports = {
    mongoURI: process.env.MONGO_URI,
    cambioschaco: {
        url: 'https://www.cambioschaco.com.py/',
        parseConfig: [
            { id: 'exchange-usd', moneda: 'USD' },
            { id: 'exchange-brl', moneda: 'BRL' },
            { id: 'exchange-ars', moneda: 'ARS' },
            { id: 'exchange-eur', moneda: 'EUR' },
            { id: 'exchange-clp', moneda: 'CLP' },
            { id: 'exchange-uyu', moneda: 'UYU' },
            { id: 'exchange-cop', moneda: 'COP' },
            { id: 'exchange-mxn', moneda: 'MXN' },
            { id: 'exchange-bob', moneda: 'BOB' },
            { id: 'exchange-pen', moneda: 'PEN' },
            { id: 'exchange-cad', moneda: 'CAD' },
            { id: 'exchange-aud', moneda: 'AUD' },
            { id: 'exchange-nok', moneda: 'NOK' },
            { id: 'exchange-dkk', moneda: 'DKK' },
            { id: 'exchange-sek', moneda: 'SEK' },
            { id: 'exchange-gbp', moneda: 'GBP' },
            { id: 'exchange-chf', moneda: 'CHF' },
            { id: 'exchange-jpy', moneda: 'JPY' },
            { id: 'exchange-kwd', moneda: 'KWD' },
            { id: 'exchange-ils', moneda: 'ILS' },
            { id: 'exchange-zar', moneda: 'ZAR' },
            { id: 'exchange-rub', moneda: 'RUB' }
        ]
    }
};
