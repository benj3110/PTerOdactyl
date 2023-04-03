const mongoose = require("mongoose");

const DatesSchema = new mongoose.Schema({
	MandatoryPTODates: [{ type: String, required: true }],
	BankHolidays: [{ type: String, required: true }],
});

module.exports = mongoose.model("dates", DatesSchema);
