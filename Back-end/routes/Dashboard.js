const express = require("express");
const router = express.Router();

const { getPTOdata } = require("../controllers/employeeData");

router.put("/get", getPTOdata);

module.exports = router;
