const { Router } = require("express");
//const { check } = require("express-validator");
//const { validarCampos } = require("../middlewares/validarCampos.middle");

const controller = require("../controllers/messages.controller");

const router = Router();

//no se pude cambiar esta ruta porque ya estadada de alta en Globalstart
router.post("/message", controller.satMessage);
router.get("/gsmmessage", controller.gsmMessage);

module.exports = router;
