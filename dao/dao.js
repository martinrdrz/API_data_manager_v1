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

module.exports = { getConfigDispositivos };
