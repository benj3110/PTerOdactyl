import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, NavigateFunction } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { bookPTO, calcPTO } from "../utils";
import "./BookingForm.css";
import BankHols from "./Bankhols";
import Header from "../Header/Header";
import { Box } from "@mui/material";
interface bookingProps {
	name: string;
}
interface PTOcalcData {
	newCarried: string;
	newRemaining: number;
	PTOHours: number;
}

const BookingForm: React.FC<bookingProps> = ({ name }) => {
	const navigate: NavigateFunction = useNavigate();

	const todaysDate: Date = new Date();
	const nextYear = new Date(todaysDate.getFullYear() + 1, todaysDate.getMonth(), todaysDate.getDate());
	console.log(nextYear);

	const [newRemaining, setNewRemaining] = useState<PTOcalcData>();
	const [buttonErr, setButtonErr] = useState<string>("");

	//console.log(todaysDate.toISOString().substring(0, 16));

	const mins: number = todaysDate.getMinutes();

	if (mins < 29) {
		todaysDate.setMinutes(29);
	} else {
		todaysDate.setMinutes(59);
	}

	const [startDate, setStartDate] = useState<Date>(todaysDate);

	const [endDate, setEndDate] = useState<Date | undefined>();

	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
	const [bookingError, setBookingError] = useState<string>("");

	useEffect(() => {
		const calcHrs = async () => {
			const bookingSubmit: {
				name: string;
				startDate: string;
				endDate: string | undefined;
			} = {
				name: name,
				startDate: startDate?.toLocaleString(),
				endDate: endDate?.toLocaleString(),
			};

			const calcdPTO = await calcPTO(bookingSubmit);
			const datesValid = await checkDatesValid();
			setNewRemaining(calcdPTO);

			if (calcdPTO?.newRemaining && calcdPTO?.newRemaining <= 0) {
				setIsButtonDisabled(true);
				setButtonErr("Not enough remaining PTO");
			} else if (datesValid == false) {
				setIsButtonDisabled(true);
				setButtonErr("Dates are not valid");
			} else {
				setIsButtonDisabled(false);
				setButtonErr("");
			}
		};

		const checkDatesValid = async () => {
			if (endDate && endDate.getTime() <= startDate.getTime()) {
				return false;
			} else if (endDate == undefined) {
				return false;
			} else {
				return true;
			}
		};

		calcHrs();
	}, [startDate, endDate]);

	const isWeekday = (date: Date) => {
		const day = date.getDay();
		return day !== 0 && day !== 6;
	};


	// console.log(name);

	const handleSubmit: () => void = async () => {
		const bookingSubmit: {
			name: string;
			toApprove: string;
			startDate: string;
			endDate: string | undefined;
		} = {
			name: name,
			toApprove: `${startDate?.toLocaleString()} # ${endDate?.toLocaleString()}`,
			startDate: startDate?.toLocaleString(),
			endDate: endDate?.toLocaleString(),
		};

		const bookingRes = await bookPTO(bookingSubmit);
		if (bookingRes.data == null) {
			setBookingError("Dates already booked");
		} else {
			setBookingError("");
			navigate("/");
		}
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
		<>
			<Header title={"Book PTO"} />
			<Box className='Box'>

				<div className="Second-comp">
					<div className="BookingForm">
						<div>
							From:
							<DatePicker
								className="datePicker"
								selected={startDate}
								onChange={(date: Date) => setStartDate(date)}
								showTimeSelect
								minDate={todaysDate}
								filterTime={filterPassedTime}
								filterDate={isWeekday}
								dateFormat="do MMMM Y HH:mm"
								popperPlacement="top"
								maxDate={nextYear}
							/>
						</div>
						<div>
							To:
							<DatePicker
								className="datePicker"
								selected={endDate}
								onChange={(date: Date) => setEndDate(date)}
								showTimeSelect
								maxDate={nextYear}
								minDate={startDate ? startDate : todaysDate}
								filterDate={isWeekday}
								dateFormat="do MMMM Y HH:mm"
								popperPlacement="top"

							/>
						</div>
						<div className="error">
							{isButtonDisabled == true && (
								<>Cannot Submit: {buttonErr}</>
							)}
						</div>
						<div className="error">
							{bookingError != "" && (
								<>Cannot Submit: {bookingError}</>
							)}
						</div>
						<button
							className="bookPTOButton"
							type="button"
							onClick={() => {
								handleSubmit();
							}}
							disabled={isButtonDisabled}
						>
							{" "}
							Submit{" "}
						</button>
					</div>
				</div>
				<div className="PTOdatainBooking">
					New remaining hours: {newRemaining?.newRemaining}
				</div>
				<div className="PTOdatainBooking">
					New carried over hours: {newRemaining?.newCarried}
				</div>
				<div className="PTOdatainBooking">
					Hours of PTO you're booking: {newRemaining?.PTOHours}
				</div>
				<BankHols />
			</Box>
		</>
	);
};

export default BookingForm;
