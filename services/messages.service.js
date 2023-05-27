const dao = require("../dao/dao");
const xml2js = require("xml2js");
const parser = require("xml-parser");

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
    if (mensajeJSON.root.attributes.hasOwnProperty("timeStamp")) {
        console.log("Campo timeStamp exite");
    }
    if (mensajeJSON.root.attributes.hasOwnProperty("messageID")) {
        console.log("Campo messageID exite");
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

    return "Resultado del Procesamiento del mensajeXML-JSON";
};

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

module.exports = { getMessages, messageFormat, createMessage };
