const service = require("../services/alert.service");

//datos de entrada: usuario# + sistema# + dato# + estado
const alert = (req, res) => {
    let mensaje = req.body;
    try {
        service.verificarDatos(mensaje);
        service.visualizarDatos(mensaje);
    } catch (error) {
        console.log("Error: Error al procesar mensaje de Alerta");
        console.log(" ");
        return res.status(200).end();
    }
    return res.status(200).end();
};

// Exporting controller
module.exports = {
    alert,
};
