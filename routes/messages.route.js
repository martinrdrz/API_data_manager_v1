const { Router } = require("express");
//const { check } = require("express-validator");
//const { validarCampos } = require("../middlewares/validarCampos.middle");

const controller = require("../controllers/messages.controller");

const router = Router();

router.post("/message", controller.createMessage);
//router.get("/messages", controller.getMessages);
router.post("/messageFormat", controller.messageFormat);

module.exports = router;
