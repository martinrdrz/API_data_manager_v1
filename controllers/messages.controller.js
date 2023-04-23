const { response, request } = require("express");
const service = require("../services/messages.service");
const dto = require("../dto/dto");

const getMessages = (req = request, res = response) => {
    //Hacer
    let data = service.getMessages();
    return res.status(200).json(dto.ok("mensajes del modem satelital", data));
};

const getMessage = (req = request, res = response) => {
    //Hacer
    const { id } = req.params;
    console.log("Parametro de entrada: ", id.toUpperCase());
    let data = service.getMessages();
    return res.status(200).json(dto.ok("mensaje del modem satelital", data));
};

const createMessage = (req = request, res = response) => {
    //Hacer
    let data = service.getMessages();
    return res.status(200).json(dto.ok("mensaje guardado", data));
};

const updateMessage = (req = request, res = response) => {
    //Hacer
    let data = service.getMessages();
    return res.status(200).json(dto.ok("mensaje actualizado", data));
};

module.exports = { getMessages, getMessage, createMessage, updateMessage };
