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
        let mensajesFormateados = await service.procesarAdaptarDatosMensajeSat(resultMensajesOriginales, "SAT");
        let resultMensajesAlmacenados = await service.almacenarDatos(mensajesFormateados);
        console.log("-----------------");
        console.log(resultMensajesAlmacenados);
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
        let mensajesFormateados = await service.procesarAdaptarDatosMensajeSat(mensaje, "GSM");
        let resultMensajesAlmacenados = await service.almacenarDatos(mensajesFormateados);
        console.log("-----------------");
        console.log(resultMensajesAlmacenados);
        res.status(200).send("OK");
    } catch (error) {
        console.log("");
        console.log("ERROR");
        return res.status(400).send("ERROR");
    }
};

module.exports = { satMessage, gsmMessage };
