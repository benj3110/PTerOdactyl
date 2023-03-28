const Employee = require("../models/employee");
const asyncHandler = require("express-async-handler"); //used instead of try catch blocks and handling errors, wrapping the async func
const helperFunc = require("./helperFunctions");
const moment = require("moment");

const requestPTO = asyncHandler(async (req, res, next) => {
	const checkPTO = await Employee.find({
		Name: req.body.name,
		PendingDates: req.body.PendingDates,
	});
	//todo actually do a validation this doesn't do anything

	const startDatePreMod = moment(
		req.body.startDate,
		"DD/MM/YYYY, HH:mm:ss"
	).toDate();
	const endDatePreMod = moment(
		req.body.endDate,
		"DD/MM/YYYY, HH:mm:ss"
	).toDate();

	const startDate = await helperFunc.convertTime(startDatePreMod);
	const endDate = await helperFunc.convertTime(endDatePreMod);

	const employeeData = await Employee.findOne({ Name: req.body.name });
	const hoursPTO = await helperFunc.calcPTO(startDate, endDate);

	let counter = 0;
	const remaining = employeeData.Remaining - hoursPTO;
	let newCarried = Number(employeeData?.CarriedOver);
	while (newCarried > 0 && counter < hoursPTO) {
		newCarried -= 0.5;
		counter += 0.5;
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
			PendingDates: [],
			toApprove: [],
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
	const employeeData = await Employee.findOne({ Name: req.body.name });
	const deleteApproving = await Employee.updateOne(
		{ Name: req.body.name },
		{ $pull: { toApprove: req.body.disapprovedDates } }
	);

	const startDatePreMod = moment(
		req.body.startDate,
		"DD/MM/YYYY, HH:mm:ss"
	).toDate();
	const endDatePreMod = moment(
		req.body.endDate,
		"DD/MM/YYYY, HH:mm:ss"
	).toDate();

	const startDate = await helperFunc.convertTime(startDatePreMod);
	const endDate = await helperFunc.convertTime(endDatePreMod);
	const hoursPTO = await helperFunc.calcPTO(startDate, endDate);
	//console.log(Number(employeeData?.Remaining));
	const newRemaining = Number(employeeData?.Remaining) + hoursPTO;
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

	const startDatePreMod = moment(
		req.body.startDate,
		"DD/MM/YYYY, HH:mm:ss"
	).toDate();
	const endDatePreMod = moment(
		req.body.endDate,
		"DD/MM/YYYY, HH:mm:ss"
	).toDate();

	const startDate = await helperFunc.convertTime(startDatePreMod);
	const endDate = await helperFunc.convertTime(endDatePreMod);

	const hoursPTO = await helperFunc.calcPTO(startDate, endDate);
	let counter = 0;
	const remaining = employeeData?.Remaining - hoursPTO;
	let newCarried = Number(employeeData?.CarriedOver);

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
