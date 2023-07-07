const resultXML = ({ correlationID, deliveryTimeStamp, state, stateMessage }) => {
    let responseXML;
    responseXML = `<?xml version="1.0" encoding="UTF-8"?> `;
    responseXML += `<stuResponseMsg xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" `;
    responseXML += `xsi:noNamespaceSchemaLocation="http://cody.glpconnect.com/XSD/StuResponse_Rev1_0.xsd" `;
    responseXML += `deliveryTimeStamp="${deliveryTimeStamp}" `;
    responseXML += `correlationID="${correlationID}"> `;
    responseXML += `<state>${state}</state> `;
    responseXML += `<stateMessage>${stateMessage}</stateMessage> `;
    responseXML += `</stuResponseMsg>`;
    return responseXML;
};

const error = (message) => ({
    response: "Error",
    message: message,
});

const ok = (message = "", data = {}) => ({
    response: "OK",
    message: message,
    data: data,
});

module.exports = {
    resultXML,
    ok,
    error,
};
