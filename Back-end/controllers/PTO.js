const Employee = require("../models/employee");
const asyncHandler = require("express-async-handler"); //used instead of try catch blocks and handling errors, wrapping the async func

const requestPTO = asyncHandler(async (req, res, next) => {
	const checkPTO = await Employee.find({
		Name: req.body.name,
		PendingDates: req.body.PendingDates,
	});

	if (checkPTO.length == 0) {
		const requestingPTO = await Employee.updateOne(
			{ Name: req.body.name },
			{ $push: { PendingDates: req.body.PendingDates } }
		);
		res.status(200).json("Updating PTO requests");
	} else {
		res.status(200).json("PTO dates already in database");
	}
});

const inputPTO = asyncHandler(async (req, res, next) => {
	const inputtingPTO = await Employee.updateOne(
		{ Name: req.body.name },
		{
			Allowance: req.body.allowance,
			CarriedOver: req.body.carriedOver,
			Remaining: req.body.remaining,
		}
	);
	res.status(200).json("PTO data has been updated");
});

module.exports = { requestPTO, inputPTO };
