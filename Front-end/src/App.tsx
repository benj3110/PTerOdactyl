import React from "react";
import { useState } from "react";
import PTODashboard from "./PTODashboard";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <PTODashboard />
    </div>
  );
}

export default App;
