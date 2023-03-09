import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PTODashboard from "../Dashboard/PTODashboard";
import BookingForm from "../BookingPage/BookingForm";
import LoginPage from "../Sign in/SignIn";

const Router: () => JSX.Element = () => {
	const [name, setName] = useState("");
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	return (
		<div>
			<Routes>
				<Route
					path="/signIn"
					element={
						<LoginPage
							name={name}
							setName={setName}
							loggedIn={loggedIn}
							setLoggedIn={setLoggedIn}
						/>
					}
				/>
				<Route path="/" element={<PTODashboard name={name} />} />
				<Route
					path="/bookingForm"
					element={<BookingForm name={name} />}
				/>
				<Route path="*" element={<div>404 Page Not Found!</div>} />
			</Routes>
		</div>
	);
};

export default Router;
