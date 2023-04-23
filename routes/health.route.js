const express = require("express");

const router = express.Router();

const controller = require("../controllers/health.controller");

router.get("/", controller.health);

module.exports = router;
