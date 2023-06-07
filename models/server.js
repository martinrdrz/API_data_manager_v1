const express = require("express");
const cors = require("cors");
const routes = require("../routes");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        //process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; //no se verifica los certificados de https
        this.usuarioPath = "/api/v1";

        //Conector a la Base de Datos
        //No hay

        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();

        //Middlewares para manejo de Errores
        this.middlewaresError();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.text({ type: "text/xml" }));
    }

    routes() {
        this.app.use(this.usuarioPath, routes);
    }

    middlewaresError() {
        //Hacer
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto: ", this.port);
        });
    }
}

module.exports = Server;
