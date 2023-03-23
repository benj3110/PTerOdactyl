import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./PTODashboard.css";
import { getEmployeeData } from "../utils";
import { useLocation } from "react-router-dom";
import InputBox from "../InputBox/InputBox";
import { employeeDataInterface } from "../interfaces/employDataInterface";

interface PTODashboardProps {
	name: string;
}

const PTODashboard: React.FC<PTODashboardProps> = ({ name }) => {
	const [employeeData, setEmployeeData] = useState<employeeDataInterface>();
	const [refresher, setRefresher] = useState<boolean>(true);

	useEffect(() => {
		const employeeDataWrap = async () => {
			setEmployeeData(await getEmployeeData(name));
		};
		employeeDataWrap();
	}, [refresher]);

	const percentageRemaining = Math.round(
		(Number(employeeData?.Remaining) / Number(employeeData?.Allowance)) *
			100
	);

	let startingPendingDates = [""];
	let endingPendingDates = [""];
	let startingToBeApprovedDates = [""];
	let endingToBeApprovedDates = [""];

	employeeData?.PendingDates?.forEach(
		(date: string | null | undefined, index) => {
			if (date) {
				let [startDateStr, endDateStr] = date.split(" # ");
				let startDatedate = new Date(startDateStr);
				let endDatedate = new Date(endDateStr);
				startingPendingDates[index] = startDatedate
					.toLocaleString()
					.substring(0, 17);
				endingPendingDates[index] = endDatedate
					.toLocaleString()
					.substring(0, 17);
			}
		}
	);

	employeeData?.toApprove?.forEach(
		(date: string | null | undefined, index) => {
			if (date) {
				let [startDateStr, endDateStr] = date.split(" # ");
				let startDatedate = new Date(startDateStr);
				let endDatedate = new Date(endDateStr);
				startingToBeApprovedDates[index] = startDatedate
					.toLocaleString()
					.substring(0, 17);
				endingToBeApprovedDates[index] = endDatedate
					.toLocaleString()
					.substring(0, 17);
			}
		}
	);

	//console.log(employeeData);

	return (
		<div className="ptodashboard-wrapper">
			<h1>Paid Time Off Dashboard</h1>
			<div className="InputBox_C">
				<InputBox
					name={name}
					refresher={refresher}
					setRefresher={setRefresher}
				/>
			</div>
			<div className="dashboard-numbers">
				<div className="ptodashboard-box-numbers">
					<h2>Current Allowance</h2>
					<h3>{employeeData?.Allowance} hours</h3>
				</div>
				<div className="ptodashboard-box-numbers">
					<h2>Carried Over From Previous Year</h2>
					<h3>{employeeData?.CarriedOver} hours</h3>
				</div>
				<div className="ptodashboard-box-numbers">
					<h2>Remaining Hours</h2>
					<h3>{employeeData?.Remaining} hours</h3>
				</div>
			</div>
			<div className="ptodashboard-container">
				<div className="ptodashboard-box">
					<h2>Pending PTO</h2>
					<h3>
						{startingPendingDates?.map(
							(date: string | null | undefined, index) => (
								<div>
									<h3>
										{date} to {endingPendingDates[index]}
									</h3>
									<>......................</>
								</div>
							)
						)}
					</h3>
				</div>
				<div className="ptodashboard-box">
					<h2>To Be Approved PTO</h2>
					<h3>
						{startingToBeApprovedDates?.map(
							(date: string | null | undefined, index) => (
								<div>
									<h3>
										{date} to{" "}
										{endingToBeApprovedDates[index]}
									</h3>
									<>......................</>
								</div>
							)
						)}
					</h3>
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
					of your PTO remaining
				</h2>
			</div>
		</div>
	);
};

export default PTODashboard;
