const { formatDate } = require("../helpers/formato.helper");

let nro_mensaje = 0;

//Datos de entrada: {usuario: "usuario_1", sistema: "sistema_1", dato: "dato_1", estado: 0}
const verificarDatos = (mensaje) => {
    if (!mensaje.usuario) {
        throw new Error("Error: Falta campo usuario del mensaje.");
    }
    if (!mensaje.sistema) {
        throw new Error("Error: Falta campo sistema del mensaje.");
    }
    if (!mensaje.dato) {
        throw new Error("Error: Falta campo dato del mensaje.");
    }
    if (mensaje.estado == undefined || mensaje.estado == null) {
        throw new Error("Error: Falta campo estado del mensaje.");
    }
    if (mensaje.estado !== 0 && mensaje.estado !== 1) {
        throw new Error("Error: Falta campo estado del mensaje.");
    }

    return true;
};

const visualizarDatos = (mensaje) => {
    nro_mensaje++;
    console.log(`Mensaje ALERTA ${nro_mensaje} recibido el ${formatDate(new Date())}:`);
    console.log(mensaje);
};

module.exports = { verificarDatos, visualizarDatos };
