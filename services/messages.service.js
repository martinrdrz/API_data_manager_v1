const dao = require("../dao/dao");

const getMessages = () => {
    const data = {
        message_id: "ahdte5673d",
        message_type: "satelite data",
        comments: "data example from satelite modem",
    };
    return data;
};

const procesarNotificacion = async (mensaje) => {
    // Tener en cuenta que en la invocacion a esta funcion, se realizó un "req.body", el cual al tener activado el middleware "express.json()", ya hace una conversion del mensaje que viene en formato  Json y lo pasa automaticamente a Objeto de JavaScript.
    //segundo comentario, solo para hacer un commit
    if (mensaje) {
        console.log("Mensaje con formato Correcto en el Servicio !!");
        try {
            const result = await dao.enviarDatos(mensaje);
            console.log("Mensaje de vuelta de DAO!!");
            return true; //Arma una promesa de manera automatica con el true y la devuelve.
        } catch (error) {
            console.log("Error: Se produjo un error en DAO y lo atrapo en Service");
            throw error; //Propaga el error, yaque el mismo fue generado endtro de dao.
        }
    } else {
        console.log("Error: Mensaje MAL formateado");
        return false;
    }
};

module.exports = { getMessages };
