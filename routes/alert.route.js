const express = require("express");

const router = express.Router();

const controller = require("../controllers/alert.controller");

router.post("/", controller.alert);

module.exports = router;
