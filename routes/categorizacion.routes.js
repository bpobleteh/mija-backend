const express = require("express");
const router = express.Router();
const categorizacionCtrl = require("../controllers/categorizacion.controller");

router.post("/", categorizacionCtrl.crearCategorizacion);

module.exports = router;
