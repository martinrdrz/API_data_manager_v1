const express = require("express");

const router = express.Router();

const controller = require("../controllers/alert.controller");

router.get("/", controller.alert);

module.exports = router;
