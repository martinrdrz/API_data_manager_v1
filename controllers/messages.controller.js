const { response, request } = require("express");
//const service = require("../services/messages.service");
const service = require("../services");
const dto = require("../dto/dto");

const createMessage = (req = request, res = response) => {
    try {
        let result = service.createMessage(req.body);
        res.header("Content-Type", "text/xml");
        res.status(200).send(dto.resultXML(result));
        let datos = service.procesarTramas(result);
        let result_2 = service.almacenarDatos(datos);
        //AlmacenarDatosEntrada(datos)
    } catch (error) {
        //No se contesta y se deja la conexion abierta para que BOF comience a enviar mensajes Vacios
        //res.header("Content-Type", "text/xml");
        //res.end();
    }
};

module.exports = { createMessage };
