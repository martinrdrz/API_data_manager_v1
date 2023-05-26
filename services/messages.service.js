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

const createMessage = (messages) => {
    //console.log("----------------");
    //console.log(messages);
    //console.log("----------------");
    try {
        let xml = parser(messages);
        console.log("-------------------------");
        console.log(xml);
        console.log("-------------------------");
        return xml;
    } catch (error) {
        console.log("Error al procesar el XML: ", error);
        throw error;
    }
};

const createMessage_Alternativa_1 = (messages) => {
    //console.log("----------------");
    //console.log(messages);
    //console.log("----------------");
    let data = "Datos del XML";
    console.log("Primero");
    xml_parser = new xml2js.Parser();
    xml_parser.parseString(messages, (err, result) => {
        if (err) {
            console.log("Error al leer el XML: ", err);
            throw err;
        } else {
            //console.log("-------------------------");
            //console.log("result");
            //console.log("-------------------------");
            console.log("Segundo");
            data = result;
        }
    });
    console.log("Tercero");
    return data;
};

module.exports = { getMessages, createMessage };
