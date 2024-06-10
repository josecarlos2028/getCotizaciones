// server.js
const express = require('express');
const mongoose = require('mongoose');
const router = require('./router/router');
const config = require('./config/config');
const logger = require('./config/logger');

const app = express();
const PORT = 3050;

app.use(express.json());
app.use(router);

// Configura la opción strictQuery en Mongoose
mongoose.set('strictQuery', true);

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('MongoDB connected'))
    .catch((error) => logger.error('MongoDB connection error: %O', error));

app.listen(PORT, () => {
    logger.info(`Cotizaciones API en http://localhost:${PORT}`);
});
