const express = require("express");
const router = express.Router();

const PTOController = require("../controllers/PTO");

router.put("/", PTOController.inputPTO);

module.exports = router;
