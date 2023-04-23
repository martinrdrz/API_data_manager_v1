const dto = require("../dto/dto");

/**
 * @func health.
 * @description Esta funcion retorna un mensaje queindica que esta online el servicio como respuesta al la consultade la API.
 * @param {Object} req Request Object.
 * @param {Object} res Response Object.
 * @return {Object} Return res
 */
const health = (req, res) => {
    return res.status(200).json(dto.ok("Service is online!!"));
};

// Exporting controller
module.exports = {
    health,
};
