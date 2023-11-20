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
    const axiosRequests = datos.map((dato) => {
        return axios.post(URL, dato, { headers: HEADER });
    });
    try {
        const responses = await Promise.all(axiosRequests);
        return responses.map((response) => {
            return response.data;
        });
    } catch (error) {
        throw error;
    }
};

module.exports = { almacenarDatos };
