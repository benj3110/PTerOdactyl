const express = require("express");
const router = express.Router();

const DatesController = require("../controllers/Date");

router.get("/getAutoHolidays", DatesController.getAutoHolidays);

module.exports = router;