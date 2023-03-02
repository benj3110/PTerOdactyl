const express = require("express");
const router = express.Router();

const employeeDataController = require("../controllers/employeeData");

router.get("/", employeeDataController.getEmployeeData);

module.exports = router;
