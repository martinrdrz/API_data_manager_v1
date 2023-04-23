const dto = require("../dto/dto");

const mensajeResGral = (req, res) => {
    console.log("ENTREEEEEEE");
    return res.json(dto.ok("datos enviados OK."));
};

module.exports = { mensajeResGral };
