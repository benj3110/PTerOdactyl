import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEmployeeData } from "../utils";
import { useNavigate, NavigateFunction } from "react-router-dom";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
	const [name, setName] = useState<string>("");
	let loggedIn: boolean = false;
	const navigate: NavigateFunction = useNavigate();

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const nameCheck = await getEmployeeData(name);
			if (nameCheck) {
				loggedIn = true;
				navigate("/");
			}
			console.log(nameCheck);
		} catch (error) {
			console.error(error);
		}
	};
	// useEffect(() => {
	//   console.log("rerendering")
	// },[loggedIn])

	const handleClick = (event: any) => {
		loggedIn = false;
		console.log(loggedIn);
	};

	return (
		<div>
			{(loggedIn = false) ? (
				<div>
					<h1>Login</h1>
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
						<button type="submit">Submit</button>
					</form>
				</div>
			) : (
				<div>
					<h1>Sign out</h1>
					<button type="button" onClick={handleClick}>
						Sign out
					</button>
				</div>
			)}
		</div>
	);
};

export default LoginPage;
