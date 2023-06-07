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
        let mensajeJSON = parser(messageXML);
        let result = procesarMensajeXML(mensajeJSON);
        return result;
    } catch (error) {
        console.log("Error al procesar el XML: ", error);
        throw error;
    }
};

const procesarMensajeXML = (mensajeJSON) => {
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

const createMessage_Alternativa_1 = (messages) => {
    let data = "Datos del XML";
    console.log("Primero");
    xml_parser = new xml2js.Parser();
    xml_parser.parseString(messages, (err, result) => {
        if (err) {
            console.log("Error al leer el XML: ", err);
            throw err;
        } else {
            console.log("Segundo");
            data = result;
        }
    });
    console.log("Tercero");
    return data;
};

module.exports = { getMessages, messageFormat, createMessage, formatDate };
