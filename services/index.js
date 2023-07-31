const { satMessage, visualizarDatoMensajeSat } = require("./satMessages.service");
const { verificarMensajeGsm, visualizarDatoMensajeGsm } = require("./gsmMessages.service");
const { procesarTramaMensaje } = require("./procesarDatosMensajes.service");
const { almacenarDatos } = require("./almacenarDatos.service");

module.exports = {
    satMessage,
    visualizarDatoMensajeSat,
    verificarMensajeGsm,
    visualizarDatoMensajeGsm,
    procesarTramaMensaje,
    almacenarDatos,
};
