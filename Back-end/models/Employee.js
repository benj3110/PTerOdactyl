const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
	EmployeeID: { type: String, required: true },
	Name: { type: String, required: true },
	Role: { type: String, required: true },
	PTOAllowance: { type: String, required: true },
});

module.exports = mongoose.model("employees", EmployeeSchema);
