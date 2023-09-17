const { satMessage, visualizarDatoMensajeSat } = require("./satMessages.service");
const { verificarMensajeGsm, visualizarDatoMensajeGsm } = require("./gsmMessages.service");
const { procesarAdaptarDatosMensajeSat } = require("./procesarAdaptarDatosMensajes.service");
const { almacenarDatos } = require("./almacenarDatos.service");

module.exports = {
    satMessage,
    visualizarDatoMensajeSat,
    verificarMensajeGsm,
    visualizarDatoMensajeGsm,
    procesarAdaptarDatosMensajeSat,
    almacenarDatos,
};
