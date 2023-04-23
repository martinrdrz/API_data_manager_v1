const configuracion = require("dotenv");
const Server = require("./models/server");

configuracion.config();
const server = new Server();
server.listen();
