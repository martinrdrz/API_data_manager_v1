const { response, request } = require("express");
const service = require("../services");
const dto = require("../dto/dto");

const satMessage = async (req = request, res = response) => {
    let result;
    try {
        resultMensajesOriginales = service.satMessage(req.body);
        res.header("Content-Type", "text/xml");
        res.status(200).send(dto.resultXML(resultMensajesOriginales));
    } catch (error) {
        //No se contesta y se deja la conexion abierta para que BOF comience a enviar mensajes Vacios
    }

    try {
        service.visualizarDatoMensajeSat(resultMensajesOriginales);
        //verificar si se recibe un mensaje vacio, en tal caso no hay que procesarlo
        if (resultMensajesOriginales.messages && resultMensajesOriginales.messages.length) {
            let mensajesFormateados = await service.procesarAdaptarDatosMensaje(resultMensajesOriginales, "SAT");
            let resultMensajesAlmacenados = await service.almacenarDatos(mensajesFormateados);
            console.log("Indices mensajes almacenados thingspeak: " + resultMensajesAlmacenados);
            console.log("");
        } else {
            console.log("Mensajes satelitales vacios.");
        }
    } catch (error) {
        console.log(error.message);
    }
};

const gsmMessage = async (req = request, res = response) => {
    let mensaje = req.query;
    try {
        service.verificarMensajeGsm(mensaje);
        service.visualizarDatoMensajeGsm(mensaje);
        //const arrayMensajeOriginal = [mensaje];
        let mensajesFormateados = await service.procesarAdaptarDatosMensaje(mensaje, "GSM");
        let resultMensajesAlmacenados = await service.almacenarDatos(mensajesFormateados);
        console.log("Indices mensajes almacenados thingspeak: " + resultMensajesAlmacenados);
        console.log("");
        res.status(200).send("OK");
    } catch (error) {
        console.log("Error: Error al procesar mensaje GSM");
        console.log("");
        return res.status(400).send("ERROR");
    }
};

module.exports = { satMessage, gsmMessage };
