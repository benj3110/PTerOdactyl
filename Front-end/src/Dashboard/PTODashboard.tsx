import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./PTODashboard.css";
import { getEmployeeData } from "../utils";
import { useLocation } from "react-router-dom";
import InputBox from "../InputBox/InputBox";

// interface PTODashboardProps {
// 	allowance: number;
// 	approved: number;
// 	awaitingApproval: number;
// }

const PTODashboard: React.FC<any> = (props) => {
	// const [remaining, setRemaining] = useState<number>(
	// 	allowance - approved - awaitingApproval
	// );
	const empName = props.name;
	const { state } = useLocation();

	// -----
	// const [allowanceInput, setAllowanceInput] = useState<number>(allowance);
	// const [approvedInput, setApprovedInput] = useState<number>(approved);
	// const [awaitingApprovalInput, setAwaitingApprovalInput] = useState<number>(
	// awaitingApproval
	// );
	//   ^^^^^^^^

	const name: string = empName;
  
	const [employeeData, setEmployeedata] = useState<any>();
  
	useEffect(() => {
    const employeeDataWrap = async () => {
      setEmployeedata(await getEmployeeData(name));
		};
		employeeDataWrap();
	}, []);
  
  const percentageRemaining = Math.round((employeeData?.Remaining / employeeData?.Allowance) * 100);
	// ----------
	// useEffect(() => {
	// 	setRemaining(allowanceInput - approvedInput - awaitingApprovalInput);
	//   }, [allowanceInput, approvedInput, awaitingApprovalInput]);

	//   if (employeeData) {
	// 	setAllowanceInput(employeeData.Allowance);
	// 	// setAwaitingApprovalInput(employeeData.Remaining);
	//   }
	//   ^^^^^^^^

	// if (employeeData) {
	// 	allowance = employeeData.Allowance;
	// 	//awaitingApproval = employeeData.Remaining;
	// }
	useEffect(() => {
		console.log(employeeData);
	}, [employeeData]);

	return (
		<div className="ptodashboard-wrapper">
			<h1>Paid Time Off Dashboard</h1>
			<div className="ptodashboard-container">
				<div className="ptodashboard-box">
					<h2>Current Allowance</h2>
					<h3>{employeeData?.Allowance} hours</h3>
				</div>
				<div className="ptodashboard-box">
					<h2>Carried Over From Previous Year</h2>
					<h3>{employeeData?.CarriedOver} hours</h3>
				</div>
				<div className="ptodashboard-box">
					<h2>Pending Dates</h2>
					<h3>
						{employeeData?.PendingDates.map(
							(date: string | null | undefined) => (
								<h3>{date}</h3>
							)
						)}
					</h3>
				</div>
				<div className="ptodashboard-box">
					<h2>Remaining Hours</h2>
					<h3>{employeeData?.Remaining} hours</h3>
				</div>
			</div>
			<div className="ptodashboard-progress">
				<div style={{ width: "100px", height: "100px" }}>
					<CircularProgressbar
						value={percentageRemaining}
						text={`${percentageRemaining}%`}
					/>
				</div>

				<h2
					style={{
						backgroundColor: "white",
						fontSize: "30px",
						marginLeft: "25px",
					}}
				>
					You have % of your PTO remaining
				</h2>
			</div>
      <div>
          <InputBox name = {empName}/>
      </div>
		</div>
	);
};

export default PTODashboard;
