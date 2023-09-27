//Lee los datos de Firebase para saber como analizar cada uno de los mensajes que vienen en la trama de entrada, se arma un objeto con la informacion necesaria para saber donde almacenar dicha informacion y los datos propieamente dichos y se devuelve.
const dao = require("../dao/dao");

const procesarAdaptarDatosMensajeSat = async (datosCompletos) => {
  //TO DO
  //Funcion: ArmarArregloPorTrama
  //Armar una estructura Array_A con un objeto json por cada mensajes que viene en el mensaje transmitido por la estacion terrestre. Recordar que por cada mensaje transmitido por la estacion terrestre puede haber varios mensajes de distintos modulos satelitales dentro. Cada objeto json es este caso, mantiene la informacion de cada modulo satelital, lo que cada trama contiene infromacion de todos los sistemas que ese modulo satelital esta cubriendo.
  //ArmarArregloMensajesPorSistema
  //Luego de la estructura anterior, Array_A, armar una estructura Array_B dnde cada objeto json representa un mensaje por cada sistema de un usuario. Recordar que la trma orginal que viene del modem contiene informacion de todos los sistemas que este modem cubra, y en esta estructura Array_B, la idea es que cada objeto solo mantiene la información de cada sistema.
  //ArmarArregloDatosPorCanalThingspeak
  //Luego, a partir de la estructura Array_B, generar una nueva estructura donde cada objeto json contiene la informacion de la Api_Key y sus datos del 1 al 8, que se deben guardar en Thingspeak por medio de una sola operacion de escritura.
  arrayMensajePorModem = ArmarArregloPorTrama(datosCompletos.messages);
  console.log(arrayMensajePorModem);

  try {
    const datos = await dao.getConfigDispositivos();
    //console.log(datos);
    return datos;
  } catch (error) {
    throw error;
  }

  //   try {
  //     dao
  //       .getConfigDispositivos()
  //       .then((datos) => {
  //         console.log(datos);
  //       })
  //       .catch((error) => {
  //         throw error;
  //       });
  //   } catch (error) {
  //     throw error;
  //   }

  //arrayMensajePorSistema = ArmarArregloMensajesPorSistema(arrayMensajePorModem);
  //arrayDatosPorCanalTinhgspeak = ArmarArregloDatosPorCanalThingspeak(arrayMensajePorSistema);
};

const ArmarArregloPorTrama = (messages) => {
  let arrayResult = [];
  messages.forEach((message) => {
    let objResult = {};
    message.children.forEach((item) => {
      if (item.name == "esn") {
        objResult.deviceID = item.content;
      } else if (item.name == "payload") {
        objResult.length = item.attributes.length;
        objResult.payload = item.content;
      }
    });
    arrayResult.push(objResult);
  });
  return arrayResult;
};

const ArmarArregloMensajesPorSistema = (dato) => {
  //TO DO
};

const ArmarArregloDatosPorCanalThingspeak = (dato) => {
  //TO DO
};

module.exports = { procesarAdaptarDatosMensajeSat };
