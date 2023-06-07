const { response, request } = require("express");
const service = require("../services/messages.service");
const dto = require("../dto/dto");

const getMessages = (req = request, res = response) => {
    //Hacer
    let data = service.getMessages();
    return res.status(200).json(dto.ok("mensajes del modem satelital", data));
};

/*
const getMessage = (req = request, res = response) => {
    //Hacer
    const { id } = req.params;
    console.log("Parametro de entrada: ", id.toUpperCase());
    let data = service.getMessages();
    return res.status(200).json(dto.ok("mensaje del modem satelital", data));
};
*/

const messageFormat = (req = request, res = response) => {
    if (req.is("application/xml")) {
        console.log("------ ES XML");
    } else {
        console.log("------ NO es xml");
    }
    try {
        console.log("Inicial");
        let data = service.messageFormat(req.body);
        console.log("Cuarto");
        console.log("----", data);
        return res.status(200).json(dto.ok("Mensaje procesado exitosamente", data));
    } catch (error) {
        return res.status(400).json(dto.error("Error al procesar los mensajes"));
    }
};

const createMessage = (req = request, res = response) => {
    //Hacer
    // if (req.is("text/xml")) {
    //     console.log("------ ES XML");
    // } else {
    //     console.log("------ NO es xml");
    // }
    try {
        let data = service.createMessage(req.body);
        //res.header("Content-Type", "application/xml");
        res.header("Content-Type", "text/xml");
        res.status(200).send(dto.resultXML(data));
        //return res.status(200).json(dto.resultXML(data));
    } catch (error) {
        let data = {
            timeStamp: service.formatDateI(new Date()),
            messageID: "0",
            messageLocalID: "0",
            dataOK: false,
        };
        //res.header("Content-Type", "application/xml");
        res.header("Content-Type", "text/xml");
        res.status(400).send(dto.resultXML(data));
        //return res.status(400).json(dto.resultXML(data));
    }
};

const updateMessage = (req = request, res = response) => {
    //Hacer
    let data = service.getMessages();
    return res.status(200).json(dto.ok("mensaje actualizado", data));
};

module.exports = { getMessages, messageFormat, createMessage, updateMessage };
