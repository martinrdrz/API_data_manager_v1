const service = require("../services/alert.service");

//datos de entrada: usuario# + sistema# + dato# + estado
const alert = (req, res) => {
    try {
        let mensaje = req.body;
        service.verificarDatos(mensaje);
        service.actualizarAlert(mensaje);
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
