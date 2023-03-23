const express = require("express");
const router = express.Router();

const PTOController = require("../controllers/PTO");

router.put("/disapprovePTO", PTOController.disapprovedPTO);

module.exports = router;
