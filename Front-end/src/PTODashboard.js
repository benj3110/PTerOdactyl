import React, { Component } from "react";

class PTODashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowance: 80, // current allowance in hours
      approved: 40, // hours already approved
      awaitingApproval: 10, // hours awaiting approval
    };
  }

  render() {
    const { allowance, approved, awaitingApproval } = this.state;
    const remaining = allowance - approved - awaitingApproval;
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
  }
}

export default PTODashboard;
