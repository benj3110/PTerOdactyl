const express = require("express");
const router = express.Router();

const employeeDataController = require("../controllers/employeeDataSearch");

router.get("/getEmployeeDataSearch/:name", employeeDataController.getEmployeeData);

module.exports = router;
