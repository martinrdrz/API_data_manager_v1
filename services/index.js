const { createMessage } = require("./messages.service");
const { procesarTramas } = require("./procesarTramas.service");
const { almacenarDatos } = require("./almacenarDatos.service");

module.exports = { createMessage, procesarTramas, almacenarDatos };
