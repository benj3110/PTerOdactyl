const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
	Name: { type: String, required: true },
	Role: { type: String, required: true },
	Manager: { type: String, required: true },
	ManagingNames: [{ type: String, required: false }],
	Allowance: { type: String, required: true },
	Remaining: { type: String, required: true },
	UsedDates: [{ type: String, required: false }],
	UsedHours: { type: String, require: true },
	CarriedOver: { type: String, required: false },
	PendingDates: [{ type: String, required: false }],
});

module.exports = mongoose.model("employees", EmployeeSchema);
