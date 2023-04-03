const Dates = require("../models/Dates");
const asyncHandler = require("express-async-handler");

const getAutoHolidays = asyncHandler(async (req, res) => {
	const autoHolidays = await Dates.findOne({Role: "Admin"});
	res.status(200).json(autoHolidays);
});

module.exports = { getAutoHolidays };
