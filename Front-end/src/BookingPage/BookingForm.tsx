import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, NavigateFunction } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { bookPTO } from "../utils";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingForm.css";
interface bookingProps{
	name: string
}

const BookingForm: React.FC<bookingProps> = ({name}) => {
	const navigate: NavigateFunction = useNavigate();


	const todaysDate: Date = new Date();

	console.log(todaysDate.toISOString().substring(0, 16));

	const mins:number = todaysDate.getMinutes();

	if (mins < 29) {
		todaysDate.setMinutes(29);
	} else {
		todaysDate.setMinutes(59);

		//todaysDate.setHours(todaysDate.getHours() + 1);
		//todaysDate.setMilliseconds(0);
	}

	console.log(todaysDate);

	const [startDate, setStartDate] = useState<Date>(todaysDate);

	const [endDate, setEndDate] = useState<Date | undefined>();

	console.log(name);

	const handleSubmit: () => void = async () => {
		const bookingSubmit: {
			name: string;
			PendingDates: string;
			startDate: string;
			endDate: string | undefined;
		} = {
			name: name,
			PendingDates: `${startDate
				?.toISOString()
				.substring(0, 16)} # ${endDate
				?.toISOString()
				.substring(0, 16)}`,
			startDate: startDate?.toISOString().substring(0, 16),
			endDate: endDate?.toISOString().substring(0, 16),
		};

		await bookPTO(bookingSubmit);
		navigate("/");
	};

	const filterPassedTime: (time: Date) => boolean = (time: Date) => {
		const selectedDate: Date = new Date(time);
		const startTime: Date = new Date(time);
		const endTime: Date = new Date(time);
		startTime.setHours(9);
		if (endTime.getDay() === 5) {
			endTime.setHours(14);
		} else {
			endTime.setHours(17);
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
							fixedHeight
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
							fixedHeight
						/>
					</div>
					<button
						className="bookPTOButton"
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
