import React, { useState } from "react";
import DatePicker from "react-datepicker";
//import { useLocation, useNavigate, NavigateFunction } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
// import { makeBooking } from "../utils";
// import bookingObject from "../interfaces/bookingInterfaces";

// const BookingForm: () => JSX.Element = () => {
//   //const employeeID: string = "6376593095ada97b2c6f943b";
//   const { state } = useLocation();
//   const employeeID: string = state[`id`];
//   const availableHoliday: number = state[`availableHours`];
//   const navigate: NavigateFunction = useNavigate();
//   console.log(state);
//   console.log(employeeID);
//   console.log(availableHoliday);

//   const todaysDate: Date = new Date();

//   console.log(todaysDate);

//   const [startDate, setStartDate] = useState<Date>(
//     //setHours(setMinutes(new Date(), 30), 17)
//     todaysDate
//   );

//   console.log(
//     `${todaysDate.toISOString().substring(0, 8)}${
//       todaysDate.getDate() < 10 ? "0" : ""
//     }${todaysDate.getDate() + 1}${todaysDate.toISOString().substring(10, 16)}`
//   );

//   const [endDate, setEndDate] = useState<Date>(
//     //setHours(setMinutes(new Date(), 30), 17)
//     new Date(
//       `${todaysDate.toISOString().substring(0, 8)}${
//         todaysDate.getDate() < 9 ? "0" : ""
//       }${todaysDate.getDate() + 1}${todaysDate.toISOString().substring(10, 16)}`
//     )
//   );

//   const handleSubmit: () => void = async () => {
//     //const fromToCombinedArray = {employeeID: employeeID, bookingFrom: (startDate?.toISOString().substring(0,16)), bookingTo: (endDate?.toISOString().substring(0,16))};
//     //setBookingSubmit(fromToCombinedArray);

//     const bookingSubmit: bookingObject = {
//       employeeID: employeeID,
//       bookingFrom: startDate?.toISOString().substring(0, 16),
//       bookingTo: endDate?.toISOString().substring(0, 16),
//     };
//     await putBookingWrap(bookingSubmit);
//     navigate("/");
//   };

//   const putBookingWrap: (
//     bookingSubmit: bookingObject
//   ) => Promise<void> = async (bookingSubmit: bookingObject) => {
//     console.log(`Attempting to submit the following object:`, bookingSubmit);
//     //if (bookingSubmit.hasOwnProperty(employeeID)) {
//     console.log(`Submitting request`);

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     await makeBooking(bookingSubmit);
//   };

//   const filterPassedTime = (time: Date) => {
//     const selectedDate: Date = new Date(time);
//     const startTime: Date = new Date(time);
//     const endTime: Date = new Date(time);
//     startTime.setHours(8, 30);
//     if (endTime.getDay() === 5) {
//       endTime.setHours(13, 29);
//     } else {
//       endTime.setHours(16, 59);
//     }

//     if (
//       startTime.getTime() <= selectedDate.getTime() &&
//       selectedDate.getTime() < endTime.getTime()
//     ) {
//       // console.log(`within work hours`);
//       if (
//         todaysDate.toISOString().substring(0, 10) ===
//         selectedDate.toISOString().substring(0, 10)
//       ) {
//         // console.log(`looking at todays date`);
//         if (todaysDate.getTime() < selectedDate.getTime()) {
//           return true;
//         }
//       } else {
//         // console.log(`looking at diffent date`);
//         return true;
//       }
//     }
//     return false;
//   };

//   return (
//     <div className="box">
//       <div className="hero">
//         <video autoPlay loop muted id="video"></video>
//       </div>
//       <div className="Second-comp">
//         <div className="BookingForm">
//           <div className="booking-formTitle">
//             <h1>Booking Form</h1>
//           </div>
//           <div className="available-hours">
//             <label> Available Hours: {availableHoliday}</label>
//           </div>
//           <div>
//             From:
//             <DatePicker
//               selected={startDate}
//               onChange={(date: Date) => setStartDate(date)}
//               showTimeSelect
//               minDate={todaysDate}
//               filterTime={filterPassedTime}
//               //minTime={setHours(setMinutes(new Date(), 0), 17)}
//               //maxTime={setHours(setMinutes(new Date(), 30), 20)}
//               dateFormat="do MMMM Y HH:mm"
//             />
//           </div>
//           <div>
//             To:
//             <DatePicker
//               selected={endDate}
//               onChange={(date: Date) => setEndDate(date)}
//               showTimeSelect
//               minDate={startDate ? startDate : todaysDate}
//               //minTime={setHours(setMinutes(new Date(), 0), 17)}
//               //maxTime={setHours(setMinutes(new Date(), 30), 20)}
//               dateFormat="do MMMM Y HH:mm"
//             />
//           </div>
//           <button
//             onClick={() => {
//               handleSubmit();
//             }}
//           >
//             {" "}
//             Submit{" "}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;

const BookingForm: () => JSX.Element = () => {
	//const { state } = useLocation();
	//const employeeID: string = state[`id`];
	//const availableHoliday: number = state[`availableHours`];
	//const navigate: NavigateFunction = useNavigate();
	// console.log(state);
	// console.log(employeeID);
	// console.log(availableHoliday);

	const todaysDate: Date = new Date();

	console.log(todaysDate.toISOString().substring(0, 16));

	const [startDate, setStartDate] = useState<Date>(
		//setHours(setMinutes(new Date(), 30), 17)
		todaysDate
	);

	// console.log(
	//   `${todaysDate.toISOString().substring(0, 8)}${
	//     todaysDate.getDate() < 10 ? "0" : ""
	//   }${todaysDate.getDate() + 1}${todaysDate.toISOString().substring(10, 16)}`
	// );

	const [endDate, setEndDate] = useState<Date>(
		//setHours(setMinutes(new Date(), 30), 17)
		new Date(
			`${todaysDate.toISOString().substring(0, 8)}${
				todaysDate.getDate() < 9 ? "0" : ""
			}${todaysDate.getDate() + 1}${todaysDate
				.toISOString()
				.substring(10, 16)}`
		)
	);

	// const handleSubmit: () => void = async () => {
	//   //const fromToCombinedArray = {employeeID: employeeID, bookingFrom: (startDate?.toISOString().substring(0,16)), bookingTo: (endDate?.toISOString().substring(0,16))};
	//   //setBookingSubmit(fromToCombinedArray);

	//   const bookingSubmit: bookingObject = {
	//     employeeID: employeeID,
	//     bookingFrom: startDate?.toISOString().substring(0, 16),
	//     bookingTo: endDate?.toISOString().substring(0, 16),
	//   };
	//   await putBookingWrap(bookingSubmit);
	//   navigate("/");
	// };

	// const putBookingWrap: (
	//   bookingSubmit: bookingObject
	// ) => Promise<void> = async (bookingSubmit: bookingObject) => {
	//   console.log(`Attempting to submit the following object:`, bookingSubmit);
	//   //if (bookingSubmit.hasOwnProperty(employeeID)) {
	//   console.log(`Submitting request`);

	//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
	//   await makeBooking(bookingSubmit);
	// };

	const filterPassedTime = (time: Date) => {
		const selectedDate: Date = new Date(time);
		const startTime: Date = new Date(time);
		const endTime: Date = new Date(time);
		startTime.setHours(8, 30);
		if (endTime.getDay() === 5) {
			endTime.setHours(13, 29);
		} else {
			endTime.setHours(16, 59);
		}

		if (
			startTime.getTime() <= selectedDate.getTime() &&
			selectedDate.getTime() < endTime.getTime()
		) {
			// console.log(`within work hours`);
			if (
				todaysDate.toISOString().substring(0, 10) ===
				selectedDate.toISOString().substring(0, 10)
			) {
				// console.log(`looking at todays date`);
				if (todaysDate.getTime() < selectedDate.getTime()) {
					return true;
				}
			} else {
				// console.log(`looking at diffent date`);
				return true;
			}
		}
		return false;
	};

	return (
		<div className="box">
			<div className="hero">
				<video autoPlay loop muted id="video"></video>
			</div>
			<div className="Second-comp">
				<div className="BookingForm">
					<div className="booking-formTitle">
						<h1>Booking Form</h1>
					</div>
					<div className="available-hours">
						{/* <label> Available Hours: {availableHoliday}</label> */}
					</div>
					<div>
						From:
						<DatePicker
							selected={startDate}
							onChange={(date: Date) => setStartDate(date)}
							showTimeSelect
							minDate={todaysDate}
							filterTime={filterPassedTime}
							//minTime={setHours(setMinutes(new Date(), 0), 17)}
							//maxTime={setHours(setMinutes(new Date(), 30), 20)}
							dateFormat="do MMMM Y HH:mm"
						/>
					</div>
					<div>
						To:
						<DatePicker
							selected={endDate}
							onChange={(date: Date) => setEndDate(date)}
							showTimeSelect
							minDate={startDate ? startDate : todaysDate}
							//minTime={setHours(setMinutes(new Date(), 0), 17)}
							//maxTime={setHours(setMinutes(new Date(), 30), 20)}
							dateFormat="do MMMM Y HH:mm"
						/>
					</div>
					<button
						onClick={() => {
							// handleSubmit();
						}}
					>
						{" "}
						Submit{" "}
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookingForm;
