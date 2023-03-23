const express = require("express");
const router = express.Router();

const PTOController = require("../controllers/PTO");

router.put("/approvePTO", PTOController.approvedToPending);

module.exports = router;
