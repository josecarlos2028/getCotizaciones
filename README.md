# getCotizaciones

API para obtener cotizaciones de la entidad Cambios Chaco. Este proyecto está diseñado para ser fácilmente expandible y modular, permitiendo agregar nuevas entidades de cotización en el futuro.

## Características

- Obtiene las cotizaciones de Cambios Chaco.
- Estructura de JSON organizada y fácil de entender.
- Uso de librerías modernas y seguras.
- Configuración modular para fácil mantenimiento y expansión.

## Requisitos

- Node.js v14 o superior
- MongoDB

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/josecarlos2028/getCotizaciones.git
   cd getCotizaciones


## Instala las dependencias:
npm install


## Configura las variables de entorno en un archivo .env:
MONGO_URI=mongodb://localhost:27017/cotizaciones


## Uso
Inicia el servidor:
npm start

Accede a la API en http://localhost:3050/cambioschaco para obtener las cotizaciones de Cambios Chaco.

## Estructura del Proyecto
getCotizaciones
├── .env
├── adddb.js
├── hallarDifCambio.js
├── package.json
├── server.js
├── README.md
├── LICENSE
├── config
│   ├── config.js
│   └── logger.js
├── models
│   ├── cotizaciones.model.js
│   └── db.js
├── modules
│   ├── cambioschaco.js
│   └── generico.js
├── router
│   └── router.js
└── logs
    └── app.log

## Contribución
Si deseas contribuir al proyecto, por favor sigue estos pasos:

- Haz un fork del repositorio.
- Crea una nueva rama (git checkout -b feature/nueva-entidad).
- Realiza tus cambios y haz commit (git commit -am 'Agregar nueva entidad').
- Sube la rama (git push origin feature/nueva-entidad).
- Abre un Pull Request.