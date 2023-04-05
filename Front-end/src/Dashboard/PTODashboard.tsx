import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./PTODashboard.css";
import { disapprovePTO, getEmployeeData } from "../utils";
import { useLocation } from "react-router-dom";
import InputBox from "../InputBox/InputBox";
import { employeeDataInterface } from "../../../interfaces/employDataInterface";

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

	const handleDisapprove = async (
		date: string | null | undefined,
		endingToBeApprovedDate: string,
		name: string,
		toBeApprovedDates: string
	) => {
		const disapproveSubmit = {
			name: name,
			disapprovedDates: toBeApprovedDates,
			startDate: date,
			endDate: endingToBeApprovedDate,
		};
		//console.log(disapproveSubmit);
		await disapprovePTO(disapproveSubmit);
		setRefresher(!refresher);
	};

	let startingPendingDates = [""];
	let endingPendingDates = [""];
	let startingToBeApprovedDates = [""];
	let endingToBeApprovedDates = [""];
	let toBeApprovedDates = [""];

	employeeData?.PendingDates?.forEach(
		(date: string | null | undefined, index) => {
			if (date) {
				let [startDateStr, endDateStr] = date.split(" # ");
				startingPendingDates[index] = startDateStr;
				endingPendingDates[index] = endDateStr;
			}
		}
	);

	employeeData?.toApprove?.forEach(
		(date: string | null | undefined, index) => {
			if (date) {
				toBeApprovedDates[index] = date;
				let [startDateStr, endDateStr] = date.split(" # ");
				startingToBeApprovedDates[index] = startDateStr;
				endingToBeApprovedDates[index] = endDateStr;
			}
		}
	);

	//console.log(employeeData);

	return (
		<div className="ptodashboard-wrapper">
			<h1 className="dashboardTitle">Paid Time Off Dashboard</h1>
			<div className="InputBox_C">
				<InputBox
					name={name}
					refresher={refresher}
					setRefresher={setRefresher}
				/>
			</div>
			<div className="dashboard-numbers">
				<div className="ptodashboard-box-numbers">
					<h2 className="dataTitle">Current Allowance</h2>
					<h3>{employeeData?.Allowance} hours</h3>
				</div>
				<div className="ptodashboard-box-numbers">
					<h2 className="dataTitle">Carried Over From Previous Year</h2>
					<h3>{employeeData?.CarriedOver} hours</h3>
				</div>
				<div className="ptodashboard-box-numbers">
					<h2 className="dataTitle">Remaining Hours</h2>
					<h3>{employeeData?.Remaining} hours</h3>
				</div>
			</div>
			<div className="ptodashboard-progress">
				<div style={{ width: "75px", height: "100px" }}>
					<CircularProgressbar
						value={percentageRemaining}
						text={`${percentageRemaining}%`}
					/>
				</div>

				<h2
					style={{
						backgroundColor: "white",
						fontSize: "20px",
						marginLeft: "25px",
					}}
				>
					of your PTO remaining
				</h2>
			</div>
			<div className="ptodashboard-container">
				<div className="ptodashboard-box">
					<h2 className="dataTitle">Pending PTO</h2>
					<h3>
						{startingPendingDates?.map(
							(date: string | null | undefined, index) => (
								<div>
									{date != "" && (
										<div>
											<h3>
												{date} to{" "}
												{endingPendingDates[index]}
											</h3>
											<>......................</>
										</div>
									)}
								</div>
							)
						)}
					</h3>
				</div>
				<div className="ptodashboard-box">
					<h2 className="dataTitle">To Be Approved PTO</h2>
					<h3>
						{startingToBeApprovedDates?.map(
							(date: string | null | undefined, index) => (
								<div>
									{date != "" && (
										<div>
											<h3>
												{date} to{" "}
												{endingToBeApprovedDates[index]}
											</h3>
											<button
												className="cancelPTOButton"
												onClick={() => {
													handleDisapprove(
														date,
														endingToBeApprovedDates[
															index
														],
														name,
														toBeApprovedDates[index]
													);
												}}
											>
												Cancel
											</button>
											<br></br>
											<>......................</>
										</div>
									)}
								</div>
							)
						)}
					</h3>
				</div>
			</div>
		</div>
	);
};

export default PTODashboard;
