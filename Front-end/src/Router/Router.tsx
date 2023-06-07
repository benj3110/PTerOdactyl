import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PTODashboard from "../DashboardPage/PTODashboard";
import BookingForm from "../BookingPage/BookingForm";
import LoginPage from "../Sign in/SignIn";
import ManagersPage from "../ManagersPage/ManagersPage";
import SearchPage from "../SearchPage/SearchPage";

interface routerProps {
	isManager: boolean;
	setIsManager: React.Dispatch<React.SetStateAction<boolean>>;
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	loggedIn: boolean;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Router: React.FC<routerProps> = ({
	isManager,
	setIsManager,
	name,
	setName,
	loggedIn,
	setLoggedIn,
}) => {
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
							isManager={isManager}
							setIsManager={setIsManager}
						/>
					}
				/>
				<Route path="/" element={<PTODashboard name={name} />} />
				<Route
					path="/bookingForm"
					element={<BookingForm name={name} />}
				/>
				{isManager == true && (
					<Route
						path="/managersPage"
						element={<ManagersPage name={name} />}
					/>
				)}
				<Route
					path="/searchUsers"
					element={<SearchPage />}
				/>

				<Route path="*" element={<div>404 Page Not Found!</div>} />
			</Routes>
		</div>
	);
};

export default Router;
