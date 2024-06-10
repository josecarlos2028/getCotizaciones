// modules/generico.js
const CambiosChaco = require('./cambioschaco');

async function getCotizacionesDBlocal(banco) {
  switch (banco) {
    case 'CambiosChaco':
      return await CambiosChaco.getCotizaciones();
    default:
      throw new Error('Entidad no encontrada');
  }
}

module.exports = {
  getCotizacionesDBlocal
};
