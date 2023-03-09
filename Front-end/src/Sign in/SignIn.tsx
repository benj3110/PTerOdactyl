import React, { useState, useEffect } from "react";
import { getEmployeeData } from "../utils";
import { useNavigate, NavigateFunction } from "react-router-dom";



const LoginPage: React.FC<any> = (props) => {
	//const [name, setName] = useState<string>("");
  const empName = props.name
  const setEmpName = props.setName
	const loggedIn = props.loggedIn 
  const setLoggedIn = props.setLoggedIn

	const navigate: NavigateFunction = useNavigate();

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmpName(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const nameCheck = await getEmployeeData(empName);
			if (nameCheck) {
				setLoggedIn(true);
				//navigate("/", {state: {name: empName}});
			}else {
        console.log("name doesn't match")
      }
			console.log(nameCheck);
		} catch (error) {
			console.error(error);
		}
	};

	const handleClick = (event: any) => {
		setLoggedIn(false)
    setEmpName("")
		console.log(loggedIn.valueOf);
	};
  console.log(loggedIn)
  let x = false

	return (
		<div>
			{(loggedIn == false) ? (
				<div>
					<h1>Login</h1>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								value={empName}
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
