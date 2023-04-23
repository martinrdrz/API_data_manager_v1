const express = require("express");

const router = express.Router();

const healthRoutes = require("./health.route");
const messagesRoute = require("./messages.route");
const middle = require("../middlewares/errorHandler.middle");
const controller = require("../controllers/notFound.controller");

router.use("/health", healthRoutes);
router.use("/", messagesRoute);
router.get("*", controller.notFound); //maneja todas aquellas routes que no estan consideradas en los uses anteriores
router.use(middle.errorHandler); //errorHandler es un middleware y puede ir acá en routes o en la ultima parte del archivo "server", ya que tiene que ser lo ultimo que atrapa los errores

module.exports = router;
