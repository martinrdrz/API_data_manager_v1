const dao = require("../dao/dao");
const xml2js = require("xml2js");
const parser = require("xml-parser");

const messageFormat = (messages) => {
    try {
        let xml = parser(messages);
        return xml;
    } catch (error) {
        console.log("Error al procesar el XML: ", error);
        throw error;
    }
};

const createMessage = (messageXML) => {
    try {
        let result = procesarMensajeXML(messageXML);
        //console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
};

const procesarMensajeXML = (messageXML) => {
    let mensajeJSON;
    try {
        //Verifica si hay Error en ParseXML
        mensajeJSON = parser(messageXML);
        if (mensajeJSON.declaration == undefined) {
            //Verifica si el XML tiene error en la declaracion del encabezado
            throw new Error();
        }
    } catch (error) {
        console.log("Error: En libreria parse de XML at ", formatDate(new Date()));
        throw error;
    }

    //Verifica si existe atributo "messageID"
    if (!mensajeJSON.root.attributes.hasOwnProperty("messageID")) {
        console.log("Error: No existe la propiedad MessageID at ", formatDate(new Date()));
        throw new Error("No existe la propiedad MessageID");
    }

    //Verifica si el mensaje es vacio
    if (mensajeJSON.root.children.length == 0) {
        let result = {
            correlationID: mensajeJSON.root.attributes.messageID,
            deliveryTimeStamp: formatDate(new Date()),
            state: "pass",
            stateMessage: "Message not store, empty message",
        };
        console.log("Info: Mensaje Vacio at ", result.deliveryTimeStamp);
        return result;
    }

    //Verifica si los datos estan OK
    if (dataFormatOK(mensajeJSON)) {
        let result = {
            correlationID: mensajeJSON.root.attributes.messageID,
            deliveryTimeStamp: formatDate(new Date()),
            state: "pass",
            stateMessage: "Store OK",
            messages: mensajeJSON.root.children,
        };
        console.log("Info: Mensaje OK at ", result.deliveryTimeStamp);
        return result;
    } else {
        //Si hay error en alguno de los mensajes

        //Habilitar este resultado en caso Normal.
        // let result = {
        //     correlationID: mensajeJSON.root.attributes.messageID,
        //     deliveryTimeStamp: formatDate(new Date()),
        //     state: "fail",
        //     stateMessage: "Messages with errors",
        // };

        //Habilitar este resultado en caso de Certificacion
        let result = {
            correlationID: mensajeJSON.root.attributes.messageID,
            deliveryTimeStamp: formatDate(new Date()),
            state: "pass",
            stateMessage: "Store OK",
        };
        console.log("Info: Mensaje with Error at ", result.deliveryTimeStamp);
        return result;
    }
};

const dataFormatOK = (mensajeJSON) => {
    let message = {};
    let messageOK = true;
    mensajeJSON.root.children.forEach((stuMessage, index) => {
        message.esn = false;
        message.unixTime = false;
        message.payload = false;
        stuMessage.children.forEach((field) => {
            if (field.name == "esn" && field.content != "") {
                message.esn = true;
            } else if (field.name == "unixTime" && field.content != "") {
                message.unixTime = true;
            } else if (field.name == "payload" && field.content != "" && field.attributes.length != "") {
                if (parseInt(field.attributes.length) * 2 == field.content.length - 2) {
                    message.payload = true;
                } else {
                    message.payload = false;
                }
            }
        });
        if (!(message.esn && message.unixTime && message.payload)) {
            messageOK = false;
        }
    });
    return messageOK;
};

function formatDate(date) {
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} GMT`;
}

module.exports = { messageFormat, createMessage };
