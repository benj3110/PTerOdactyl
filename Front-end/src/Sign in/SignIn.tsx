import React, { useState, useEffect } from "react";
import "./SignIn.css";
import { getEmployeeData } from "../utils";
import { useNavigate, NavigateFunction } from "react-router-dom";
interface loginInterface {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	loggedIn: boolean;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	isManager: boolean;
	setIsManager: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<loginInterface> = ({
	name,
	setName,
	loggedIn,
	setLoggedIn,
	isManager,
	setIsManager,
}) => {
	const navigate: NavigateFunction = useNavigate();
	const [userError, setUserError] = useState("");

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setName(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const empCheck = await getEmployeeData(name);
			if (empCheck) {
				setUserError("");
				empCheck.Role == "Manager" &&
					(setIsManager(true), navigate("/managersPage"));
				setLoggedIn(true);
				empCheck.Role == "Employee" && navigate("/");
			} else {
				setUserError("User not in database");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleClick: (event: any) => void = (event: any) => {
		setLoggedIn(false);
		setIsManager(false);
		setName("");
	};

	return (
		<div className="signingBox">
			{loggedIn == false ? (
				<div>
					<h1 className="loginTitle">Login</h1>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								value={name}
								onChange={handleNameChange}
							/>
						</div>
						<button className="signinButton" type="submit">Submit</button>
					</form>
					{userError && (
						<span className="userError">{userError}</span>
					)}
				</div>
			) : (
				<div>
					<h1 className="loginTitle">Sign out</h1>
					<button className="signinButton" type="button" onClick={handleClick}>
						Sign out
					</button>
				</div>
			)}
		</div>
	);
};

export default LoginPage;
