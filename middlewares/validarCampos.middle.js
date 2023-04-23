const { validationResult } = require("express-validator");
const dto = require("../dto/dto");

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //dao.error();
        console.log(errors.array({ onlyFirstError: true })[0].msg);
        return res
            .status(400)
            .json(dto.error("Error en formato de entrada de los datos."));
        //return res.status(400).json(errors.array({ onlyFirstError: true }));
        //return res.status(400).json(errors);
    }
    next();
};

module.exports = {
    validarCampos,
};
