const { createMessage, decirHola, visualizarDatoMensaje } = require("./messages.service");
const { procesarTramas } = require("./procesarTramas.service");
const { almacenarDatos } = require("./almacenarDatos.service");

module.exports = { createMessage, decirHola, visualizarDatoMensaje, procesarTramas, almacenarDatos };
