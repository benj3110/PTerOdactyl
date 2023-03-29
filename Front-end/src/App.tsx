import React from "react";
import { useState } from "react";
import PTODashboard from "./Dashboard/PTODashboard";
import Sidebar from "./Sidebar/Sidebar";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";

function App(): JSX.Element {
	const [isManager, setIsManager] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	return (
		<div className="App">
			<BrowserRouter>
				<Router
					isManager={isManager}
					setIsManager={setIsManager}
					name={name}
					setName={setName}
					loggedIn={loggedIn}
					setLoggedIn={setLoggedIn}
				/>
				<Sidebar isManager={isManager} loggedIn={loggedIn} name={name} />
			</BrowserRouter>
		</div>
	);
}

export default App;
