let nro_mensaje = 0;

const verificarMensajeGsm = (mensaje) => {
    if (!mensaje.id) {
        throw new Error("Falta campo ID del mensaje.");
    }

    if (!mensaje.payload_length) {
        throw new Error("Falta campo longitud del mensaje.");
    }

    if (!mensaje.payload) {
        throw new Error("Falta campo payload del mensaje.");
    }
    return true;
};

const visualizarDatoMensajeGsm = (mensaje) => {
    nro_mensaje++;
    console.log(`Mensaje ${nro_mensaje} recibido:`);
    console.log(mensaje);
};

module.exports = { verificarMensajeGsm, visualizarDatoMensajeGsm };
