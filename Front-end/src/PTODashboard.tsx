import React, { useState } from "react";

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
  const [remaining, setRemaining] = useState(
    allowance - approved - awaitingApproval
  );

  return (
    <div>
      <h1>Paid Time Off Dashboard</h1>
      <div>
        <h2>Current Allowance: {allowance} hours</h2>
      </div>
      <div>
        <h2>Approved Hours: {approved} hours</h2>
      </div>
      <div>
        <h2>Awaiting Approval: {awaitingApproval} hours</h2>
      </div>
      <div>
        <h2>Remaining Hours: {remaining} hours</h2>
      </div>
    </div>
  );
};

export default PTODashboard;
type JSXElements = JSX.IntrinsicElements;
