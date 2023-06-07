import React from "react";
import "./Sidebar.css";
import logo from "./Raytheon_Technologies_logo.png";
import { Link } from "react-router-dom";

interface sidebarProps {
	isManager: boolean;
	loggedIn: boolean;
	name: string;
}

//todo make the ul div a link, make rtx logo link 

const Sidebar: React.FC<sidebarProps> = ({ isManager, loggedIn, name }) => {
	return (
		<div className="sidebar">
			<div className="logo">
				<img src={logo} alt="My Company Logo" />
			</div>
			<nav className="navbar">
				<ul className="navbar-links">
					<Link to="/bookingForm" className={"navbar-links-link"} > Book PTO</Link>
				</ul>
				<ul className="navbar-links">
					<Link to="/" className={"navbar-links-link"}>Dashboard</Link>
				</ul>
				<ul className={`${isManager ? "navbar-links" : "display-nothing"}`}>
					{isManager == true && (
						<Link to="/managersPage" className={"navbar-links-link"} > Manager </Link>
					)}
				</ul>
				<ul className="navbar-links">
					<Link to="/searchUsers" className={"navbar-links-link"}>Search Users</Link>
				</ul>
				<ul className="navbar-links">
					{loggedIn == true ? (

						<Link to="/signIn" className={"navbar-links-link"}> Sign Out {name}</Link>

					) : (
						<Link to="/signIn" className={"navbar-links-link"}> Sign In</Link>
					)}
				</ul>

			</nav>
		</div>
	);
};

export default Sidebar;
