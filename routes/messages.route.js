const { Router } = require("express");
//const { check } = require("express-validator");
//const { validarCampos } = require("../middlewares/validarCampos.middle");

const controller = require("../controllers/messages.controller");

const router = Router();

//no se pude cambiar esta ruta porque ya estadada de alta en Globalstart
router.post("/message", controller.satMessage);
router.post("/gsmmessage", controller.gsmMessage);
router.get("/ggsmmessage", controller.ggsmMessage);

module.exports = router;
