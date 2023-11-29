const { db } = require("./databaseConexion.dao");

const getConfigDispositivos = async () => {
    try {
        const ref = db.ref("dispositivos");
        const snapshot = await ref.once("value");
        const data = snapshot.val();
        return data;
    } catch (error) {
        throw new Error("Error lectura Firebase.");
    }
};

//datos de entrada:
//nodo = path que identifica el nodo a actualizar, por ejemplo: 'usuarios/martinrdrz@hotmailcom/sistema_1/dato_1'
//dato: objeto que se debe actualizar, para la alarma por ejemplo: {'estado_alarma': 1}
const updateAlert = async (nodo, dato) => {
    try {
        // const ref = db.ref("usuarios/martinrdrz@hotmailcom/sistema_1/dato_1");
        const ref = db.ref(nodo);
        await ref.update(dato);
    } catch (error) {
        throw new Error("Error Escritura Alerta en Firebase.");
    }
};

const getConfigDispositivos_promise = () => {
    return new Promise((resolve, reject) => {
        try {
            const ref = db.ref("dispositivos");
            ref.once("value", (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            });
        } catch (error) {
            reject(new Error("Error lectura Firebase."));
        }
    });
};

module.exports = { getConfigDispositivos, updateAlert };
