import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./PTODashboard.css";

interface PTODashboardProps {
  allowance: number;
  approved: number;
  awaitingApproval: number;
}

const PTODashboard: React.FC<PTODashboardProps> = ({
  allowance,
  approved,
  awaitingApproval,
}) => {
  const [remaining, setRemaining] = useState<number>(
    allowance - approved - awaitingApproval
  );

  const percentageRemaining = Math.round((remaining / allowance) * 100);

  return (
    <div className="ptodashboard-wrapper">
      <h1>Paid Time Off Dashboard</h1>
      <div className="ptodashboard-container">
        <div className="ptodashboard-box">
          <h2>Current Allowance</h2>
          <h3>{allowance} hours</h3>
        </div>
        <div className="ptodashboard-box">
          <h2>Approved Hours</h2>
          <h3>{approved} hours</h3>
        </div>
        <div className="ptodashboard-box">
          <h2>Awaiting Approval</h2>
          <h3>{awaitingApproval} hours</h3>
        </div>
        <div className="ptodashboard-box">
          <h2>Remaining Hours</h2>
          <h3>{remaining} hours</h3>
        </div>
      </div>
      <div className="ptodashboard-progress">
        <div style={{ width: "100px", height: "100px" }}>
          <CircularProgressbar
            value={percentageRemaining}
            text={`${percentageRemaining}%`}
          />
        </div>
        <h2 style={{ backgroundColor: "white" }}>
          You have {percentageRemaining}% of your PTO remaining
        </h2>
      </div>
    </div>
  );
};

export default PTODashboard;
