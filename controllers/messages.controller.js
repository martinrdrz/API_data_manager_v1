const { response, request } = require("express");
//const service = require("../services/messages.service");
const service = require("../services");
const dto = require("../dto/dto");

const satMessage = (req = request, res = response) => {
    try {
        let result = service.satMessage(req.body);
        res.header("Content-Type", "text/xml");
        res.status(200).send(dto.resultXML(result));
        service.visualizarDatoMensajeSat(result);
        //verificar si se recibe un mensaje vacio, en tal caso no hay que procesarlo
        let datos = service.procesarTramas(result);
        let result_2 = service.almacenarDatos(datos);
        //AlmacenarDatosEntrada(datos)
    } catch (error) {
        //No se contesta y se deja la conexion abierta para que BOF comience a enviar mensajes Vacios
        //res.header("Content-Type", "text/xml");
        //res.end();
    }
};

const gsmMessage = (req = request, res = response) => {
    try {
        if (req.is("json")) {
            //console.log(req.body);
            service.visualizarDatoMensajeGsm(req.body);
            res.status(200).json(dto.ok("data OK."));
        } else {
            console.log("Error de formato");
            res.status(200).json(dto.error("Error de formato"));
        }
    } catch (error) {
        return res.status(400).json(dto.error(error.message));
    }
};

module.exports = { satMessage, gsmMessage };
