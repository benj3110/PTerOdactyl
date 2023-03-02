const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
	EmployeeID: { type: String, required: true },
	Name: { type: String, required: true },
	Role: { type: String, required: true },
	Allowance: { type: String, required: true },
	Remaining: { type: String, required: true },
	UsedDates: { type: String, required: false }, //todo turn into list and turn dates into date types?
	CarriedOver: { type: String, required: false },
	PendingDates: { type: String, required: false }, //todo turn into list
});

module.exports = mongoose.model("employees", EmployeeSchema);
