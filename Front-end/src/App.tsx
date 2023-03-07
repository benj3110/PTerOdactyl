import React from "react";
import { useState } from "react";
import PTODashboard from "./Dashboard/PTODashboard";
import Sidebar from "./Sidebar/Sidebar";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";

function App() {
  const [count, setCount] = useState(0);
  const allowance = 70;
  const approved = 40;
  const awaitingApproval = 10;

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
