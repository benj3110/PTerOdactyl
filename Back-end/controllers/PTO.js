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
	console.log(req.body.startDate);
	console.log(req.body.endDate);

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
	let counter = 0;
	const remaining = employeeData.Remaining - hoursPTO;
	let newCarried = Math.floor(employeeData?.CarriedOver);
	//console.log(newCarried);

	while (newCarried > 0 && counter < hoursPTO) {
		newCarried -= 0.5;
		counter += 0.5;
		//console.log(newCarried);
	}

	if (
		checkPTO.length == 0 &&
		Math.floor(employeeData.Remaining) >= hoursPTO
	) {
		const requestingPTODates = await Employee.updateOne(
			{ Name: req.body.name },
			{ $push: { toApprove: req.body.toApprove } }
		);
		const updatingPTOHours = await Employee.updateOne(
			{ Name: req.body.name },
			{
				$set: {
					Remaining: remaining.toString(),
					CarriedOver: newCarried,
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
			PendingDates: "",
			toApprove: "",
		}
	);
	res.status(200).json("PTO data has been updated");
});

const approvedToPending = asyncHandler(async (req, res) => {
	const toPending = await Employee.updateOne(
		{ Name: req.body.name },
		{ $push: { PendingDates: req.body.toBePendingDates } }
	);
	const deleteApproving = await Employee.updateOne(
		{ Name: req.body.name },
		{ $pull: { toApprove: req.body.toBePendingDates } }
	);
	res.status(200).json("PTO has been approved");
});

const disapprovedPTO = asyncHandler(async (req, res) => {
	const deleteApproving = await Employee.updateOne(
		{ Name: req.body.name },
		{ $pull: { toApprove: req.body.disapprovedDates } }
	);

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
	}
	let hoursPTO = minutesPTO / 60;
	const newRemaining = Math.floor(employeeData.Remaining) + hoursPTO;
	//console.log(newRemaining)
	const addRemaining = await Employee.updateOne(
		{ Name: req.body.name },
		{
			$set: {
				Remaining: newRemaining.toString(),
			},
		}
	);
	res.status(200).json("disapproved PTO");
});

const calcPTOData = asyncHandler(async (req, res) => {
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
	}

	let hoursPTO = minutesPTO / 60;
	let counter = 0;
	const remaining = employeeData.Remaining - hoursPTO;
	let newCarried = Number(employeeData?.CarriedOver);
	//console.log(newCarried);

	while (newCarried > 0 && counter < hoursPTO) {
		newCarried -= 0.5;
		counter += 0.5;
		//console.log(newCarried);
	}

	res.status(200).json({
		newCarried: newCarried.toString(),
		newRemaining: remaining,
		PTOHours: hoursPTO,
	});
});

module.exports = {
	requestPTO,
	inputPTO,
	approvedToPending,
	calcPTOData,
	disapprovedPTO,
};
