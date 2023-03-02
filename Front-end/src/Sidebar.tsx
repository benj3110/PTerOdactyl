import React from "react";
import "./Sidebar.css";
import logo from "./Raytheon_Technologies_logo.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="My Company Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">
              <i className="icon fas fa-user"></i>
              <span>Sign in</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="icon fas fa-calendar-plus"></i>
              <span>Request time off</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="icon fas fa-clock"></i>
              <span>PTO dashboard</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
