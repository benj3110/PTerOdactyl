const Employee = require("../models/employee");
const asyncHandler = require("express-async-handler"); //used instead of try catch blocks and handling errors, wrapping the async func

const requestPTO = asyncHandler(async (req, res, next) => {
	const checkPTO = await Employee.find({
		Name: req.body.name,
		PendingDates: req.body.PendingDates,
	});
	const employeeData = await Employee.findOne({ Name: req.body.name });

	const startDate = new Date(req.body.startDate);
	const endDate = new Date(req.body.endDate);
	let minutesPTO = 0;
	let current = startDate;

	while (current < endDate) {
		switch (current.getDay()) {
			case 0:
				current.setMinutes(current.getMinutes() + 1440);
				break;
			case 1:
			case 2:
			case 3:
			case 4:
				if (current.getHours() < 17) {
					minutesPTO++;
					current.setMinutes(current.getMinutes() + 1);
				} else {
					current.setMinutes(current.getMinutes() + 960);
				}
				break;
			case 5:
				if (current.getHours() < 14) {
					minutesPTO++;
					current.setMinutes(current.getMinutes() + 1);
				} else {
					current.setMinutes(current.getMinutes() + 660);
				}
				break;
			case 6:
				current.setMinutes(current.getMinutes() + 1440);
				break;
			default:
				console.log("days err");
		}
		//if (current.getDay = (0||6)){
		// 	current.setDate(current.getDay + 1)
		// } else {
		// minutesPTO++;
		// current.setMinutes(current.getMinutes() + 1);
		// }
	}
	let hoursPTO = minutesPTO / 60;
	console.log(hoursPTO);

	if (
		checkPTO.length == 0 &&
		Math.floor(employeeData.Allowance) >= hoursPTO
	) {
		const requestingPTODates = await Employee.updateOne(
			{ Name: req.body.name },
			{ $push: { PendingDates: req.body.PendingDates } }
		);
		const updatingPTOHours = await Employee.updateOne(
			{ Name: req.body.name },
			{
				$set: {
					Allowance: (employeeData.Allowance - hoursPTO).toString(),
				},
			}
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
