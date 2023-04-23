const dto = require("../dto/dto");

/**
 * @func notFound.
 * @description Esta funcion devuelve un mensaje de error indicando que no se encontro la ruta
 * @param {Object} req Request Object.
 * @param {Object} res Response Object.
 * @return {Object} Return res
 */
const notFound = (req, res) => {
    return res.status(404).json(dto.error("Route not found !!"));
};

// Exporting controller
module.exports = {
    notFound,
};
