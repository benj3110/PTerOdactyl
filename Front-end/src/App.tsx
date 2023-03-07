import React from "react";
import { useState } from "react";
import PTODashboard from "./Dashboard/PTODashboard";
import Sidebar from "./Sidebar/Sidebar";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";

function App() {
  const allowance = "";
  const approved = "";
  const awaitingApproval = "";

  return (
    <div className="App">
      <BrowserRouter>
        <Router />
        <Sidebar />
      </BrowserRouter>
    </div>
  );
}

export default App;
