const express = require("express");
const router = express.Router();

const PTOController = require("../controllers/PTO");

router.put("/requestPTO", PTOController.requestPTO);

module.exports = router;
