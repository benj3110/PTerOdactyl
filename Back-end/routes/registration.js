const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/registration");

router.put("/", registrationController.makeEmployee);

module.exports = router;
