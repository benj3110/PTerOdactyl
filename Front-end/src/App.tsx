import React from "react";
import { useState } from "react";
import PTODashboard from "./PTODashboard";
import Sidebar from "./Sidebar";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

function App() {
  const [count, setCount] = useState(0);
  const allowance = 70;
  const approved = 40;
  const awaitingApproval = 10;

  return (
    <div className="App">
      <PTODashboard
        allowance={allowance}
        approved={approved}
        awaitingApproval={awaitingApproval}
      />
      <BrowserRouter>
        <Router />
        <Sidebar />
      </BrowserRouter>
    </div>
  );
}

export default App;
