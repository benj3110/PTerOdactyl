const express = require("express");
const router = express.Router();

const employeeDataController = require("../controllers/employeeData");

router.get("/getEmployeeData/:name", employeeDataController.getEmployeeData);

module.exports = router;
