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

const createMessage = (req = request, res = response) => {
    //Hacer
    if (req.is("application/xml")) {
        console.log("------ ES XML");
    } else {
        console.log("------ NO es xml");
    }
    try {
        console.log("Inicial");
        let data = service.createMessage(req.body);
        console.log("Cuarto");
        console.log("----", data);
        return res.status(200).json(dto.ok("Mensaje procesado exitosamente", data));
    } catch (error) {
        return res.status(400).json(dto.error("Error al procesar los mensajes"));
    }
};

const updateMessage = (req = request, res = response) => {
    //Hacer
    let data = service.getMessages();
    return res.status(200).json(dto.ok("mensaje actualizado", data));
};

module.exports = { getMessages, createMessage, updateMessage };
