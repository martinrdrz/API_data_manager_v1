const dao = require("../dao/dao");
const xml2js = require("xml2js");
const parser = require("xml-parser");
const { v4: uuidv4 } = require("uuid");

const getMessages = () => {
    const data = {
        message_id: "ahdte5673daa",
        message_type: "satelite data",
        comments: "data example from satelite modem",
    };
    return data;
};

const messageFormat = (messages) => {
    try {
        let xml = parser(messages);
        return xml;
    } catch (error) {
        console.log("Error al procesar el XML: ", error);
        throw error;
    }
};

/*-------------------------------------------------------------------------------------------------------
<?xml version="1.0" encoding="UTF-8"?>
<stuResponseMsg xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation="http://cody.glpconnect.com/XSD/StuResponse_Rev1_0.xsd"
deliveryTimeStamp="25/08/2009 21:00:00 GMT" messageID="8675309"
correlationID="56bdca48088610048fddba385e1cd5b8">
<state>pass</state>
<stateMessage>Store OK</stateMessage>
</stuResponseMsg>
-------------------------------------------------------------------------------------------------------*/

const createMessage = (messageXML) => {
    try {
        let result = procesarMensajeXML(messageXML);
        return result;
    } catch (error) {
        console.log("Error al procesar el XML: ", error);
        throw error;
    }
};

const procesarMensajeXML = (messageXML) => {
    let mensajeJSON;
    try {
        //Verifica si hay Error en PasrseXML
        mensajeJSON = parser(messageXML);
    } catch (error) {
        console.log("Error: Error al procesar el XML: ", error);
        throw error;
    }

    //Verifica si existe atributo "messageID"
    if (!mensajeJSON.root.attributes.hasOwnProperty("messageID")) {
        console.log("Error: No existe la propiedad MessageID");
        throw new Error("No existe la propiedad MessageID");
    }

    //Verifica si el mensaje es vacio
    if (mensajeJSON.root.children.length == 0) {
        console.log("Mensaje Vacio");
        let result = {
            correlationID: mensajeJSON.root.attributes.messageID,
            deliveryTimeStamp: formatDate(new Date()),
            state: "pass",
            stateMessage: "message not store, empty message",
        };
        return result;
    }

    //Verifica si los datos estan OK
    if (dataFormatOK(mensajeJSON)) {
        let result = {
            correlationID: mensajeJSON.root.attributes.messageID,
            deliveryTimeStamp: formatDate(new Date()),
            state: "pass",
            stateMessage: "Store OK",
        };
        return result;
    } else {
        //Si hay error en alguno de los mensajes
        let result = {
            correlationID: mensajeJSON.root.attributes.messageID,
            deliveryTimeStamp: formatDate(new Date()),
            state: "fail",
            stateMessage: "messages with error",
        };
        return result;
    }
};

const dataFormatOK = (mensajeJSON) => {
    let messageOK = {
        esn: false,
        unixTime: false,
        payload: false,
    };
    mensajeJSON.root.children.forEach((stuMessage, index) => {
        console.log(`Mensaje Nro: ${index}`);
        stuMessage.children.forEach((field) => {
            if (field.name == "esn" && field.content != "") {
                messageOK.esn = true;
            } else if (field.name == "unixTime" && field.content != "") {
                messageOK.unixTime = true;
            } else if (field.name == "payload" && field.content != "" && field.attributes.length != "") {
                messageOK.payload = true;
            }
        });
        if (!(messageOK.esn && messageOK.unixTime && messageOK.payload)) {
            return false;
        }
    });
    return true;
};

const createMessage_1 = (messageXML) => {
    try {
        let mensajeJSON = parser(messageXML);
        let result = procesarMensajeXML(mensajeJSON);
        return result;
    } catch (error) {
        console.log("Error al procesar el XML: ", error);
        throw error;
    }
};

const procesarMensajeXML_1 = (mensajeJSON) => {
    //hacer
    let dataOK = true;
    let result = {};
    if (mensajeJSON.root.attributes.hasOwnProperty("timeStamp")) {
        //console.log("Campo timeStamp exite");
        console.log(`Campo timeStamp exite: ${mensajeJSON.root.attributes.timeStamp}`);
        result.timeStamp = formatDate(new Date());
    } else {
        dataOK = false;
    }
    if (dataOK && mensajeJSON.root.attributes.hasOwnProperty("messageID")) {
        console.log(`Campo messageID exite: ${mensajeJSON.root.attributes.messageID}`);
        result.messageID = mensajeJSON.root.attributes.messageID;
    } else {
        dataOK = false;
    }
    console.log("Cantidad de mensajes: ", mensajeJSON.root.children.length);

    mensajeJSON.root.children.forEach((mensaje, index) => {
        console.log(`Mensaje Nro: ${index}`);
        mensaje.children.forEach((field) => {
            if (field.name == "esn") {
                console.log(`esn: ${field.content}`);
            } else if (field.name == "unixTime") {
                console.log(`unixTime: ${field.content}`);
            } else if (field.name == "payload") {
                console.log(`payload.length: ${field.attributes.length}`);
                console.log(`payload: ${field.content}`);
            }
        });
    });
    result.dataOK = dataOK;
    result.messageLocalID = uuidv4().replace(/-/g, "");
    return result;
    /* formato de result
        result.messageID
        result.timeStamp
        result.dataOK
        result.messageLocalID
    */
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

module.exports = { getMessages, messageFormat, createMessage, formatDate };
