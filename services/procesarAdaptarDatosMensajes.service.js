//Lee los datos de Firebase para saber como analizar cada uno de los mensajes que vienen en la trama de entrada, se arma un objeto con la informacion necesaria para saber donde almacenar dicha informacion y los datos propiamente dichos y se devuelve.
const dao = require("../dao/dao");
const DATOS_POR_CANAL_THINGSPEAK = 8;

const procesarAdaptarDatosMensaje = async (datosMensajesDeModem, modemTipo) => {
    //TO DO
    //Funcion: ArmarArregloPorTrama
    //Arma una estructura Array_A con un objeto json por cada mensaje que viene en el mensaje transmitido por la estacion terrestre. Recordar que por cada mensaje transmitido por la estacion terrestre puede haber varios mensajes de distintos modulos satelitales dentro. Cada objeto json es este caso, mantiene la informacion de cada modulo satelital, lo que cada trama contiene es la informacion de todos los sistemas que ese modulo satelital esta cubriendo.
    //ArmarArregloMensajesPorSistema
    //Luego de la estructura anterior, Array_A, armar una estructura Array_B donde cada objeto json representa un mensaje por cada sistema de un usuario. Recordar que la trama orginal que viene del modem contiene informacion de todos los sistemas que este modem cubra, y en esta estructura Array_B, la idea es que cada objeto solo mantiene la información de cada sistema.
    //ArmarArregloDatosPorCanalThingspeak
    //Luego, a partir de la estructura Array_B, generar una nueva estructura donde cada objeto json contiene la informacion de la Api_Key y sus datos del 1 al 8, que se deben guardar en Thingspeak por medio de una sola operacion de escritura.
    let arrayMensajesPorModem;
    if (modemTipo == "SAT") {
        try {
            arrayMensajesPorModem = ArmarArregloPorTramaSat(datosMensajesDeModem.messages);
        } catch (error) {
            throw new Error("Error: Error en el armado del arreglo de Tramas por mensaje satelital");
        }
    } else {
        //al ser un dato de un modem GSM, viene siempre un solo dato/mensaje en el arreglo.
        const mensaje = { deviceID: datosMensajesDeModem.id, payload: datosMensajesDeModem.payload.slice(2) };
        arrayMensajesPorModem = [mensaje];
    }

    let datosConfig;
    try {
        datosConfig = await dao.getConfigDispositivos();
    } catch (error) {
        throw new Error("Error: Error en la consulta a la base de datos de Google");
    }

    let arrayMensajesPorSistema;
    try {
        arrayMensajesPorSistema = ArmarArregloMensajesPorSistema(arrayMensajesPorModem, datosConfig);
    } catch (error) {
        throw new Error("Error: Error en el armado del Arreglo de mensajes por Sistemas");
    }

    try {
        const arrayDatosPorCanalTinhgspeak = ArmarArregloDatosPorCanalThingspeak(arrayMensajesPorSistema, datosConfig);
        return arrayDatosPorCanalTinhgspeak;
    } catch (error) {
        throw new Error("Error: Error en el armado del Arreglo de Datos por Canal de Thingspeak");
    }
};

const ArmarArregloPorTramaSat = (messages) => {
    try {
        let arrayResult = [];
        messages.forEach((message) => {
            let objResult = {};
            message.children.forEach((item) => {
                if (item.name == "esn") {
                    objResult.deviceID = item.content;
                } else if (item.name == "payload") {
                    //objResult.length = item.attributes.length; //por el momento no es necesario este campo
                    objResult.payload = item.content.slice(2);
                }
            });
            arrayResult.push(objResult);
        });
        return arrayResult;
    } catch (error) {
        throw error;
    }
};

const ArmarArregloMensajesPorSistema = (arrayMensajesPorModem, datosConfig) => {
    //Dato de entrada: arrayMensajesPorModem:
    //[
    //  { deviceID: '0-99990', length: '9', payload: 'C0560D72DA4AB2445A' }
    //  { deviceID: '0-99991', length: '9', payload: 'A14AA1DBDB818F9759' }
    //  { deviceID: '0-99991', length: '9', payload: 'A14AA1DBDB818F9759' }
    //]
    try {
        let arrayTodosMensajesPorSistema = [];
        for (const mensajePorModem of arrayMensajesPorModem) {
            //una mejora a realizar podria ser de verificar con un try/catch la siguiente consulta a los datos de la configuracion, porque se puede darel caso de que el deviceID no figureen dicha estructura, y si es asi, en la situacion actual se produciria una excepcion que cortaria el analisis de los mensajes, y enel caso de que se traten de mensajes satelitales con varios mensajes (que por ahi es raro el caso), el resto de los mensajes no seria procesados.
            const datosConfigDevice = datosConfig[mensajePorModem.deviceID];
            const arrayMensajesPorSistema = convertirMensajePorModemEnSistemas(mensajePorModem, datosConfigDevice);
            for (const mensajesPorSistema of arrayMensajesPorSistema) {
                arrayTodosMensajesPorSistema.push(mensajesPorSistema);
            }
        }
        return arrayTodosMensajesPorSistema;
    } catch (error) {
        throw error;
    }
};

const convertirMensajePorModemEnSistemas = (mensajePorModem, datosConfigDevice) => {
    //Dato de entrada: mensajePorModem:
    //{ deviceID: '0-99990', length: '9', payload: 'C0560D72DA4AB2445A' }
    try {
        //Convertir el payload a string de Bits
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
            const mensajePorSistema = {
                deviceID: mensajePorModem.deviceID,
                mensaje_nro: `mensaje_${indexMsje}`,
                payload,
            };
            indexPayload += cantBitsDatos;
            mensajesPorSistema.push(mensajePorSistema);
        }
        return mensajesPorSistema;
    } catch (error) {
        throw error;
    }
};

const ArmarArregloDatosPorCanalThingspeak = (arrayMensajePorSistema, datosConfig) => {
    //dato entrada: arrayMensajePorSistema
    /*[
    {
      deviceID: "0-99990",
      mensaje_nro: "mensaje_1",
      payload: "01111000100010011001",
    },
    {
      deviceID: "0-99990",
      mensaje_nro: "mensaje_2",
      payload: "001100111",
    },
  ]*/
    //Salida de la funcion: De acuerdo al formato que espera Thingspeak.
    /*[
    {
      api_key: "aaaaaa",
      field1: 10,
      field2: 20,
      field3: 30,
    }
  ]*/
    try {
        let arrayMensajesThingspeak = [];
        for (const mensajeSistema of arrayMensajePorSistema) {
            let datosConfigMensaje = datosConfig[mensajeSistema.deviceID][mensajeSistema.mensaje_nro];
            for (let indexCanal = 1; indexCanal <= datosConfigMensaje["cant_canales_asignados"]; indexCanal++) {
                let totalDatosEnCanal = DATOS_POR_CANAL_THINGSPEAK;
                if (indexCanal == datosConfigMensaje["cant_canales_asignados"]) {
                    //Me da cantidad de datos a leer para el ultimo canal, ya que puede estar no completo.
                    totalDatosEnCanal = datosConfigMensaje["cant_datos"] % DATOS_POR_CANAL_THINGSPEAK;
                }

                let mensajeThingspeak = { api_key: datosConfigMensaje[`writeAPIkey_${indexCanal}`] };
                let inicioIndexLeerBits = 1;
                let indexDatoConfig = 0;
                for (let indexDatoEnCanal = 1; indexDatoEnCanal <= totalDatosEnCanal; indexDatoEnCanal++) {
                    indexDatoConfig = (indexCanal - 1) * DATOS_POR_CANAL_THINGSPEAK + indexDatoEnCanal;
                    const cadenaBits = mensajeSistema.payload;
                    const cantBitsLeer = datosConfigMensaje[`bits_dato_${indexDatoConfig}`];
                    const datoValor = convertirBitsANumero(cadenaBits, inicioIndexLeerBits, cantBitsLeer);
                    inicioIndexLeerBits += cantBitsLeer;
                    mensajeThingspeak[`field${indexDatoEnCanal}`] = datoValor;
                }
                arrayMensajesThingspeak.push(mensajeThingspeak);
            }
        }
        return arrayMensajesThingspeak;
    } catch (error) {
        throw error;
    }
};

const convertirHexaABits = (cadenaHexa) => {
    try {
        let cadenaBits = "";
        for (let i = 0; i < cadenaHexa.length; i++) {
            let hexChar = cadenaHexa.charAt(i);
            let binaryChar = parseInt(hexChar, 16).toString(2).padStart(4, "0"); // Rellenar con ceros para asegurar 4 bits por carácter hexadecimal
            cadenaBits += binaryChar;
        }
        return cadenaBits;
    } catch (error) {
        throw error;
    }
};

const convertirBitsANumero = (binaryString, startIndexFromEnd, length) => {
    try {
        // Calcula el índice de inicio desde el final del string
        const startIndex = binaryString.length - (startIndexFromEnd - 1) - length;
        // Extrae la subcadena basada en el índice de inicio y la longitud dada
        const subString = binaryString.slice(startIndex, startIndex + length);
        // Convierte la subcadena binaria a un número entero
        const intValue = parseInt(subString, 2);
        return intValue;
    } catch (error) {
        throw error;
    }
};

module.exports = { procesarAdaptarDatosMensaje };
