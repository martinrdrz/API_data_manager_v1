const { response, request } = require("express");
const service = require("../services/messages.service");
const dto = require("../dto/dto");

const createMessage = (req = request, res = response) => {
    try {
        let result = service.createMessage(req.body);
        res.header("Content-Type", "text/xml");
        res.status(200).send(dto.resultXML(result));
    } catch (error) {
        res.header("Content-Type", "text/xml");
        res.end();
    }
};

const messageFormat = (req = request, res = response) => {
    //if (req.is("application/xml")) {
    //    console.log("------ ES XML");
    //} else {
    //    console.log("------ NO es xml");
    //}
    try {
        let result = service.messageFormat(req.body);
        return res.status(200).json(dto.ok("Mensaje procesado exitosamente", result));
    } catch (error) {
        return res.status(500).json(dto.error("Error al procesar los mensajes"));
    }
};

module.exports = { createMessage, messageFormat };
