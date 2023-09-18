const admin = require("firebase-admin");

// Configuración Firebase Admin SDK
const serviceAccount = require("../agrolink-ecddb-firebase-adminsdk-jrr5c-45458310b9.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://agrolink-ecddb-default-rtdb.firebaseio.com/",
});

const db = admin.database();

module.exports = { db };
