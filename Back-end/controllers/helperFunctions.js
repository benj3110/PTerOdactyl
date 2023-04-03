const asyncHandler = require("express-async-handler");
const moment = require("moment");
const Dates = require("../models/Dates");

//Helper calc functions
const calcPTO = asyncHandler(async (startDate, endDate) => {
	// console.log(startDate);
	// console.log(endDate);
	let minutesPTO = 0;
	let current = startDate;
	const autoHolidays = await Dates.findOne({ Role: "Admin" });

	while (current < endDate) {
		let isHoliday = false;
		for (let i = 0; i < autoHolidays.BankHolidays.length; i++) {
			if (current.toDateString() == autoHolidays.BankHolidays[i]) {
				isHoliday = true;
				current.setMinutes(current.getMinutes() + 1440);
				break;
			}
		}
		if (isHoliday) {
			continue;
		}

		switch (current.getDay()) {
			case 0:
				current.setMinutes(current.getMinutes() + 1440);
				break;
			case 1:
			case 2:
			case 3:
			case 4:
				if (moment(current).utc().hours() < 17) {
					minutesPTO++;
					current.setMinutes(current.getMinutes() + 1);
				} else {
					current.setMinutes(current.getMinutes() + 960);
				}
				break;
			case 5:
				if (moment(current).utc().hours() < 14) {
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
	return hoursPTO;
});

const convertTime = asyncHandler(async (date) => {
	const convertedTime = new Date(
		date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
	);

	return convertedTime;
});

module.exports = { calcPTO, convertTime };
