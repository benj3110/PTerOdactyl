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

module.exports = { requestPTO };
