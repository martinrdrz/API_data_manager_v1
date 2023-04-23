const axios = require("axios").default;
//const urlArgos = "http://dev.argos.ara.ar:32004/c4-interface";
//const urlArgos = "https://argostestbep.armada.mil.ar/c4-interface";
const urlArgosDev =
    "https://argosdevbe.armada.mil.ar/pulsar-producer/c4-interface";
const urlArgosTest =
    "https://argostestbe.armada.mil.ar/pulsar-producer/c4-interface";

const enviarDatosArgos = async (mensaje, pUrl) => {
    try {
        let mensajeStr = JSON.stringify(mensaje);
        console.log("  ");
        console.log("******************************");
        console.log(mensajeStr);
        console.log("******************************");
        console.log("  ");
        console.log("  ");
        console.log("******************************");
        console.log(mensaje);
        console.log("******************************");
        console.log("  ");

        let result = await axios({
            url: pUrl,
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            data: mensaje, //Se envia el mensaje en formato Objeto de JavaScript
            //data: mensajeStr,
        });
        console.log("Codigo de RESULTADO de ARGOS: ", result.status);
        //console.log("Mensaje de RESULTADO de ARGOS: ", result.statusText);
    } catch (error) {
        console.log("Error: CATCH dentro de ARGOS!!");
        console.log("Error de la consulta AXIOS---------------");
        console.log(error);
        throw new Error("Error al realizar la consulta axios"); //Genera un nuevo error para poder poner una descripcion adecuada al error ocurrido.
    }
};

const enviarDatosArgos_1 = (mensaje) => {
    return new Promise((resolve, reject) => {
        if (true) {
            setTimeout(() => resolve("Datos enviados al Argos OK."), 500);
        } else {
            reject(new Error("Error al enviar datos al Argos"));
        }
    });
};

const servicioSuma = (a, b) => {
    new Promise((resolve, reject) => {
        setTimeout(resolve(a + b), 1000);
    });
};

const servicioSuma_2 = async (a, b) => {
    return await Promise.resolve(a + b);
};

module.exports = { enviarDatosArgos, urlArgosDev, urlArgosTest };

// // Ejemplo #1
// fetch(url)
//   .then((res) => {
//     // maneja la respuesta
//   })
//   .catch((error) => {
//     // maneja el error
//   });

// // Ejemplo #2
// fetch(url, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// })
//   .then((response) => response.json())
//   .catch((error) => console.log(error));

// axios.get(url)
//     .then((response) => console.log(response))
//     .catch((error) => console.log(error));

// // Ejemplo # 2
// axios({
//     url: "http://api.com",
//     method: "POST",
//     header: {
//         "Content-Type": "application/json",
//     },
//     data: { name: "Holyguard", age: 45 },
// });
