const { Router } = require("express");
//const { check } = require("express-validator");
//const { validarCampos } = require("../middlewares/validarCampos.middle");

const controller = require("../controllers/messages.controller");

const router = Router();

router.post("/message", controller.satMessage);
router.post("/gsmmessage", controller.gsmMessage);

module.exports = router;
