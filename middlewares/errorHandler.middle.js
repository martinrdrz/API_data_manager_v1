const dto = require("../dto/dto");

const errorHandler = (err, req, res, next) => {
    const { message } = err;
    const status = err.status || 500;
    return res.status(status).json(dto.error(message));
    //next();  va sin next() ya que es el ultimo middleware que ataja el error y solo tiene que devolverlo al usuario
};

module.exports = {
    errorHandler,
};
