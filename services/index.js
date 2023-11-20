const { satMessage, visualizarDatoMensajeSat } = require("./satMessages.service");
const { verificarMensajeGsm, visualizarDatoMensajeGsm } = require("./gsmMessages.service");
const { procesarAdaptarDatosMensaje } = require("./procesarAdaptarDatosMensajes.service");
const { almacenarDatos } = require("./almacenarDatos.service");

module.exports = {
    satMessage,
    visualizarDatoMensajeSat,
    verificarMensajeGsm,
    visualizarDatoMensajeGsm,
    procesarAdaptarDatosMensaje,
    almacenarDatos,
};
