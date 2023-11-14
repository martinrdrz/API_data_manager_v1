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

  const arrayMensajesPorSistema = ArmarArregloMensajesPorSistema(arrayMensajesPorModem, datosConfig);

  const arrayDatosPorCanalTinhgspeak = ArmarArregloDatosPorCanalThingspeak(arrayMensajesPorSistema);
  return arrayDatosPorCanalTinhgspeak;
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
    for (const mensajesPorSistema of arrayMensajesPorSistema) {
      arrayTodosMensajesPorSistema.push(mensajesPorSistema);
    }
  }
  console.log("");
  console.log("Mostrar todos los mensajes por Sistemas");
  console.log("------------------------------------------------");
  console.log(arrayTodosMensajesPorSistema);
  return arrayTodosMensajesPorSistema;
};

//cliclar por cada mensajes
//en cada mensaje leer la cantidad de bits totales para ese mensaje
//armar nuevo mensaje con los datos y bits en formato string para ese mensaje
//continuar co el siguiente mensaje
const convertirMensajePorModemEnSistemas = (mensajePorModem, datosConfigDevice) => {
  //Dato de entrada: mensajePorModem:
  //{ deviceID: '0-99990', length: '9', payload: 'C0560D72DA4AB2445A' }

  console.log("");
  console.log("Funcion: convertirMensajePorModemEnSistemas");
  console.log("------------------------------------------------");
  console.log(mensajePorModem);
  console.log("");

  //Convertir el payload a string de Bits
  //---------------------------------------
  let mensajesPorSistema = [];
  let indexPayload = 0;
  mensajePorModem.payload = convertirHexaABits(mensajePorModem.payload);
  for (let indexMsje = 1; indexMsje <= datosConfigDevice.cant_mensajes; indexMsje++) {
    const mensaje = datosConfigDevice[`mensaje_${indexMsje}`]; //ej. estoy en mensaje_1
    let cantBitsDatos = 0;
    for (let indexDato = 1; indexDato <= mensaje.cant_datos; indexDato++) {
      cantBitsDatos += mensaje[`bits_dato_${indexDato}`];
    }
    let indexDesdeInicio = mensajePorModem.payload.length - indexPayload - cantBitsDatos;
    const payload = mensajePorModem.payload.substring(indexDesdeInicio, indexDesdeInicio + cantBitsDatos);
    const mensajePorSistema = { deviceID: mensajePorModem.deviceID, mensaje_nro: `mensaje_${indexMsje}`, payload };
    indexPayload += cantBitsDatos;
    mensajesPorSistema.push(mensajePorSistema);
    console.log(mensajePorSistema);
    console.log("");
  }
  return mensajesPorSistema;
};

const ArmarArregloDatosPorCanalThingspeak = (arrayMensajePorSistema) => {
  //TO DO
};

const convertirHexaABits = (cadenaHexa) => {
  let cadenaBits = "";
  for (let i = 0; i < cadenaHexa.length; i++) {
    let hexChar = cadenaHexa.charAt(i);
    let binaryChar = parseInt(hexChar, 16).toString(2).padStart(4, "0"); // Rellenar con ceros para asegurar 4 bits por carácter hexadecimal
    cadenaBits += binaryChar;
  }
  return cadenaBits;
};

module.exports = { procesarAdaptarDatosMensajeSat };
