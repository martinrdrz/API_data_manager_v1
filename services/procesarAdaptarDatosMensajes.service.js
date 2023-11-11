//Lee los datos de Firebase para saber como analizar cada uno de los mensajes que vienen en la trama de entrada, se arma un objeto con la informacion necesaria para saber donde almacenar dicha informacion y los datos propiamente dichos y se devuelve.
const dao = require("../dao/dao");

const procesarAdaptarDatosMensajeSat = async (datosCompletos) => {
  //TO DO
  //Funcion: ArmarArregloPorTrama
  //Arma una estructura Array_A con un objeto json por cada mensaje que viene en el mensaje transmitido por la estacion terrestre. Recordar que por cada mensaje transmitido por la estacion terrestre puede haber varios mensajes de distintos modulos satelitales dentro. Cada objeto json es este caso, mantiene la informacion de cada modulo satelital, lo que cada trama contiene es la informacion de todos los sistemas que ese modulo satelital esta cubriendo.
  //ArmarArregloMensajesPorSistema
  //Luego de la estructura anterior, Array_A, armar una estructura Array_B donde cada objeto json representa un mensaje por cada sistema de un usuario. Recordar que la trama orginal que viene del modem contiene informacion de todos los sistemas que este modem cubra, y en esta estructura Array_B, la idea es que cada objeto solo mantiene la información de cada sistema.
  //ArmarArregloDatosPorCanalThingspeak
  //Luego, a partir de la estructura Array_B, generar una nueva estructura donde cada objeto json contiene la informacion de la Api_Key y sus datos del 1 al 8, que se deben guardar en Thingspeak por medio de una sola operacion de escritura.
  let arrayMensajesPorModem = ArmarArregloPorTramaSat(datosCompletos.messages);
  console.log("Funcion: ArmarArregloPorTramaSat");
  console.log("-----------------------------------------");
  console.log(arrayMensajesPorModem);
  let datosConfig;
  try {
    datosConfig = await dao.getConfigDispositivos();
    console.log("");
    console.log("Funcion: getConfigDispositivos");
    console.log("----------------------------------");
    console.log(datosConfig);
    //return datosConfig;
  } catch (error) {
    throw error;
  }

  arrayMensajePorSistema = ArmarArregloMensajesPorSistema(arrayMensajesPorModem, datosConfig);

  //arrayDatosPorCanalTinhgspeak = ArmarArregloDatosPorCanalThingspeak(arrayMensajePorSistema);
};

const ArmarArregloPorTramaSat = (messages) => {
  let arrayResult = [];
  messages.forEach((message) => {
    let objResult = {};
    message.children.forEach((item) => {
      if (item.name == "esn") {
        objResult.deviceID = item.content;
      } else if (item.name == "payload") {
        //llamar funcion conversion de Hexa del payload a string de numeros decimales y almacenar esa informacion en objResult.length y objResult.payload
        objResult.length = item.attributes.length;
        objResult.payload = item.content.slice(2);
      }
    });
    arrayResult.push(objResult);
  });
  return arrayResult;
};

const ArmarArregloMensajesPorSistema = (arrayMensajesPorModem, datosConfig) => {
  //Dato de entrada: arrayMensajesPorModem:
  //{ deviceID: '0-99990', length: '9', payload: 'C0560D72DA4AB2445A' }
  //{ deviceID: '0-99991', length: '9', payload: 'A14AA1DBDB818F9759' }
  //{ deviceID: '0-99991', length: '9', payload: 'A14AA1DBDB818F9759' }
  console.log("");
  console.log("Funcion: ArmarArregloMensajesPorSistema");
  console.log("------------------------------------------------");
  let arrayTodosMensajesPorSistema = [];
  for (const mensajePorModem of arrayMensajesPorModem) {
    //console.log(mensajePorModem);
    //console.log(`--- ${mensajePorModem.deviceID} ---`);
    const datosConfigDevice = datosConfig[mensajePorModem.deviceID];
    //console.log(datosConfigDevice);
    //console.log("");
    const arrayMensajesPorSistema = convertirMensajePorModemEnSistemas(mensajePorModem, datosConfigDevice);
    for (const mensajePorSistema of arrayMensajesPorSistema) {
      arrayTodosMensajesPorSistema.push(mensajePorSistema);
    }
  }
  return arrayTodosMensajesPorSistema;
};

const convertirMensajePorModemEnSistemas = (mensajePorModem, datosConfigDevice) => {
  //Dato de entrada: mensajePorModem:
  //{ deviceID: '0-99990', length: '9', payload: 'C0560D72DA4AB2445A' }
  let datos = [];
  return datos;
};

const ArmarArregloDatosPorCanalThingspeak = (dato) => {
  //TO DO
};

module.exports = { procesarAdaptarDatosMensajeSat };
