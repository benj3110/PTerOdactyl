const express = require("express");
const router = express.Router();

const PTOController = require("../controllers/PTO");

router.put("/calcPTO", PTOController.calcPTOData);

module.exports = router;
