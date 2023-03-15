import React from "react";
import "./Sidebar.css";
import logo from "../Raytheon_Technologies_logo.png";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
	return (
		<div className="sidebar">
			<div className="logo">
				<img src={logo} alt="My Company Logo" />
			</div>
			<nav>
				<ul className="NavBar-Links">
					<li>
						<Link to="/bookingForm"> Book Time Off</Link>
					</li>
					<li>
						<Link to="/">Dashboard</Link>
					</li>
					<li>
						<Link to="/signIn"> Sign In</Link>
					</li>
				</ul>
		
			</nav>
		</div>
	);
};

export default Sidebar;
