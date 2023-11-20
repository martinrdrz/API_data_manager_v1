const axios = require("axios");

const URL = "https://api.thingspeak.com/update";
const METHOD = "POST";
const HEADER = {
    "Content-Type": "application/json",
};

const almacenarDatos = async (datos) => {
    //datos de entrada:
    //[
    //  {api_key: "JJ6NFZ7SR97W6RVS", field1: 2, field2: 11, field3: 34, field4: 2},
    //  {api_key: "20B0EGUTPK40BG08", field1: 3, field2: 21 },
    //];
    console.log("");
    console.log("Se Almacenan los datos");
    const axiosRequests = datos.map((dato) => {
        return axios.post(URL, dato, { headers: HEADER }); //alternativa 1
        //let req = { data: dato };
        //req.url = URL;
        //req.method = METHOD;
        //req.header = HEADER;
        //return axios(req); //alterativa 2
    });
    try {
        const responses = await Promise.all(axiosRequests);
        //responses.forEach((response) => console.log(response.data));
        return responses.map((response) => {
            return response.data;
        });
        //return responses;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { almacenarDatos };
