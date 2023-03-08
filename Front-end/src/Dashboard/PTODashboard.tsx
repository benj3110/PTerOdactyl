import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./PTODashboard.css";
import { getEmployeeData } from "../utils";
// import InputBox from '../InputPTO/InputBox';

// interface PTOFormProps {
//   ptoAllowance: number;
//   approvedHours: number;
//   awaitingApprovalHours: number;
//   remainingHours: number;
// }

// const PTOForm: React.FC<PTOFormProps> = ({ ptoAllowance, approvedHours, awaitingApprovalHours, remainingHours }) => {
//   const [currentPTO, setCurrentPTO] = useState(ptoAllowance);
//   const [currentApprovedHours, setCurrentApprovedHours] = useState(approvedHours);
//   const [currentAwaitingApprovalHours, setCurrentAwaitingApprovalHours] = useState(awaitingApprovalHours);
//   const [currentRemainingHours, setCurrentRemainingHours] = useState(remainingHours);
// }

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
	const name: string = "Benito";

	const [employeeData, setEmployeedata] = useState<any>();

	useEffect(() => {
		const employeeDataWrap = async () => {
			setEmployeedata(await getEmployeeData(name));
		};
		employeeDataWrap();
	}, []);

	if (employeeData) {
		allowance = employeeData.Allowance;
		//awaitingApproval = employeeData.Remaining;
	}
	useEffect(() => {
		console.log(employeeData);
	}, [employeeData]);

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

				{/* <div>
      <InputBox label="PTO Allowance" value={currentPTO} onChange={setCurrentPTO} />
      <InputBox label="Approved Hours" value={currentApprovedHours} onChange={setCurrentApprovedHours} />
      <InputBox label="Hours Awaiting Approval" value={currentAwaitingApprovalHours} onChange={setCurrentAwaitingApprovalHours} />
      <InputBox label="Remaining Hours" />
        </div>
         */}

				<h2
					style={{
						backgroundColor: "white",
						fontSize: "30px",
						marginLeft: "25px",
					}}
				>
					You have {percentageRemaining}% of your PTO remaining
				</h2>
			</div>
		</div>
	);
};

export default PTODashboard;
