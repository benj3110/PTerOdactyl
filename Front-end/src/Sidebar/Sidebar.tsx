import React from "react";
import "./Sidebar.css";
import logo from "../Raytheon_Technologies_logo.png";
import { Link } from "react-router-dom";

interface sidebarProps {
	isManager: boolean;
	loggedIn: boolean;
	name: string;
}

const Sidebar: React.FC<sidebarProps> = ({ isManager, loggedIn, name }) => {
	return (
		<div className="sidebar">
			<div className="logo">
				<img src={logo} alt="My Company Logo" />
			</div>
			<nav>
				<ul >
					<li className="NavBar-Links">
						<Link to="/bookingForm"> Book Time Off</Link>
					</li>
					<li className="NavBar-Links">
						<Link to="/">Dashboard</Link>
					</li>
					<li className="NavBar-Links">
						{isManager == true && (
							<Link to="/managersPage"> Manager </Link>
						)}
					</li>
					<li className="NavBar-Links">
						{loggedIn == true ? (
							<div>
								<Link to="/signIn"> Sign Out {name}</Link>
							</div>
						) : (
							<Link to="/signIn"> Sign In</Link>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
