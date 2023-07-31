const { satMessage, visualizarDatoMensajeSat, visualizarDatoMensajeGsm } = require("./messages.service");
const { procesarTramas } = require("./procesarTramas.service");
const { almacenarDatos } = require("./almacenarDatos.service");

module.exports = { satMessage, visualizarDatoMensajeSat, visualizarDatoMensajeGsm, procesarTramas, almacenarDatos };
