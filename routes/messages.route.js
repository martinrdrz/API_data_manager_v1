const { Router } = require("express");
//const { check } = require("express-validator");
//const { validarCampos } = require("../middlewares/validarCampos.middle");

const controller = require("../controllers/messages.controller");

const router = Router();

router.get("/messages", controller.getMessages);
//router.get("/messages/:id", controller.getMessage);
router.post("/messages", controller.createMessage);
//router.put("/message", controller.updateMessage);

module.exports = router;
