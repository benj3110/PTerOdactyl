import React from "react";
import "./Sidebar.css";
import logo from "../Raytheon_Technologies_logo.png";
import { Link } from "react-router-dom";

interface sidebarProps {
  isManager: boolean;
  loggedIn: boolean;
}

const Sidebar: React.FC<sidebarProps> = ({ isManager, loggedIn }) => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="My Company Logo" />
      </div>
      <nav>
        <ul className="NavBar-Links">
          <li>
            <Link to="/bookingForm">Book Time Off</Link>
          </li>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            {isManager == true && <Link to="/managersPage">Manager</Link>}
          </li>
          <li>
            {loggedIn == true ? (
              <Link to="/signIn">Sign Out</Link>
            ) : (
              <Link to="/signIn">Sign In</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
