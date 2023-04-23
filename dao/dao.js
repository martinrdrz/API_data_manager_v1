var tablaDestinos = require("../assets/tablaDestinos.json");
var tablaIdentidades = require("../assets/tablaIdentidades.json");
var tablaModoAvistaje = require("../assets/tablaModoAvistajes.json");
const { enviarDatosArgos, urlArgosDev, urlArgosTest } = require("./argos");

const obtenerAvistajeDescripcion = (buque = "") => {
    const result = tablaDestinos.find(
        (elemento) => elemento.id_destino === buque
    );
    if (result == undefined) {
        return "Sin Descripcion";
    } else {
        return result.descripcion;
    }
};

const obtenerAvistajeIdentidad = (valor = 0) => {
    const result = tablaIdentidades.find(
        (elemento) => elemento.id_identidad === valor
    );
    if (result == undefined) {
        return "DESCONOCIDO";
    } else {
        return result.descripcion;
    }
};

const obtenerAvistajeModo = (valor = 7) => {
    const result = tablaModoAvistaje.find(
        (elemento) => elemento.id_modo === valor
    );
    if (result == undefined) {
        return "VISUAL";
    } else {
        return result.descripcion;
    }
};

const enviarDatos = async (mensaje) => {
    try {
        const result = await enviarDatosArgos(mensaje, urlArgosTest);
        console.log("Mensaje Enviado a SERVICIO ->Test !!");
        //return true; //Arma una promesa de manera automatica con el true y la devuelve.
    } catch (error) {
        console.log("Error: CATCH dentro de DAO ->Test");
        throw error; //Propaga el error, yaque el mismo fue generado endtro de dao.
    }

    try {
        const result = await enviarDatosArgos(mensaje, urlArgosDev);
        console.log("Mensaje Enviado a SERVICIO -> Dev !!");
        return true; //Arma una promesa de manera automatica con el true y la devuelve.
    } catch (error) {
        console.log("Error: CATCH dentro de DAO -> Dev");
        throw error; //Propaga el error, yaque el mismo fue generado endtro de dao.
    }
};

module.exports = {
    enviarDatos,
    obtenerAvistajeDescripcion,
    obtenerAvistajeIdentidad,
    obtenerAvistajeModo,
};
