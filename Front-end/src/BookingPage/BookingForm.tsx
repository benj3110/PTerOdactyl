import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, NavigateFunction } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { bookPTO } from "../utils";

const BookingForm: React.FC<any> = (props) => {
	const navigate: NavigateFunction = useNavigate();
	const empName:string = props.name


	const todaysDate: Date = new Date();

	console.log(todaysDate.toISOString().substring(0, 16));

	const [startDate, setStartDate] = useState<Date>(todaysDate);

	const [endDate, setEndDate] = useState<Date>(
		new Date(
			`${todaysDate.toISOString().substring(0, 8)}${
				todaysDate.getDate() < 9 ? "0" : ""
			}${todaysDate.getDate() + 1}${todaysDate
				.toISOString()
				.substring(10, 16)}`
		)
	);
	
	console.log(empName);
	

	const handleSubmit: () => void = async () => {
		const bookingSubmit: {
			name: string;
			PendingDates: string;
			startDate: string;
			endDate: string;
		} = {
			name: empName,
			PendingDates: `${startDate
				?.toISOString()
				.substring(0, 16)}-${endDate?.toISOString().substring(0, 16)}`,
			startDate: startDate?.toISOString().substring(0, 16),
			endDate: endDate?.toISOString().substring(0, 16),
		};

		await bookPTO(bookingSubmit);
		navigate("/");
	};

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
			if (
				todaysDate.toISOString().substring(0, 10) ===
				selectedDate.toISOString().substring(0, 10)
			) {
				if (todaysDate.getTime() < selectedDate.getTime()) {
					return true;
				}
			} else {
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
						<h1>Book PTO</h1>
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
							handleSubmit();
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
