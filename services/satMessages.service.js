const parser = require("xml-parser");
const { formatDate } = require("../helpers/formato.helper");

const satMessage = (messageXML) => {
    try {
        let result = procesarMensajeXML(messageXML);
        return result;
    } catch (error) {
        throw error;
    }
};

const visualizarDatoMensajeSat = (mensaje) => {
    console.log(`Cantidad mensajes recibidos: ${mensaje.messages.length}`);
    console.log(`Datos  del priemer mensaje recibido:`);
    mensaje.messages[0].children.forEach((element) => {
        if (element.name == "payload") {
            console.log(`${element.name} : ${element.attributes.length} : ${element.content}`);
        } else {
            console.log(`${element.name} : ${element.content}`);
        }
    });
    console.log("");
};

const procesarMensajeXML = (messageXML) => {
    let mensajeJSON;
    try {
        //Parser devuelve un Json del xml de entrada
        //Permite verificar si hay Error en ParseXML del mensaje
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
            flag_pass_ok: false,
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
            flag_pass_ok: true,
        };
        console.log("Info: Mensaje OK at ", result.deliveryTimeStamp);
        return result;
    } else {
        //Si hay error en alguno de los mensajes

        //Habilitar este resultado en caso Normal.
        let result = {
            correlationID: mensajeJSON.root.attributes.messageID,
            deliveryTimeStamp: formatDate(new Date()),
            state: "fail",
            stateMessage: "Messages with errors",
            flag_pass_ok: false,
        };

        //Habilitar este resultado en caso de Certificacion
        // let result = {
        //     correlationID: mensajeJSON.root.attributes.messageID,
        //     deliveryTimeStamp: formatDate(new Date()),
        //     state: "pass",
        //     stateMessage: "Store OK",
        // };
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

module.exports = { satMessage, visualizarDatoMensajeSat };
