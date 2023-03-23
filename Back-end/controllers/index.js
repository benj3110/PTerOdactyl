import expressAsyncHandler from "express-async-handler";

//Helper calc functions
export const calcPTO = expressAsyncHandler(async() => {

    const startDate = new Date(startDatePassed);
	const endDate = new Date(endDatePassed);
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
	let hoursPTO = minutesPTO / 60;//return
	let counter = 0;
	const remaining = employeeData.Remaining - hoursPTO;//return
	let newCarried = Math.floor(employeeData?.CarriedOver);//return
	console.log(newCarried);
})