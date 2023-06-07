import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./PTODashboard.css";
import { disapprovePTO, getEmployeeData } from "../utils";
import { useLocation } from "react-router-dom";
import InputBox from "./InputBox/InputBox";
import { employeeDataInterface } from "../interfaces/employDataInterface";
import CalendarComp from "./Calendar/Calendar";
import Header from "../Header/Header";
import Box from '@mui/material/Box';
import { AppBar, Button, Card, Grid, StyledEngineProvider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import App from "../App";
import { DragHandleTwoTone } from "@mui/icons-material";




interface PTODashboardProps {
	name: string;
}
//todo change font sizing, booked lists

const PTODashboard: React.FC<PTODashboardProps> = ({ name }) => {
	const [employeeData, setEmployeeData] = useState<employeeDataInterface>();
	const [refresher, setRefresher] = useState<boolean>(true);
	const dashboardTabs: String[] = ["DATA", "BOOKED", "CALENDAR"];
	const [currentTab, setCurrentTab] = useState("DATA");

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
	const handleTabChange: (e: React.MouseEvent<HTMLElement>) => void = (e: React.MouseEvent<HTMLElement>) => {
		setCurrentTab(e.currentTarget.innerText);
	}


	return (
		<>
			<Header title={"Dashboard"} />
			<StyledEngineProvider injectFirst>
				<Box className="Box">
					<AppBar position="static" className="dashboardTabs"> {dashboardTabs.map((tab) => (
						<Button
							className="dashboardTabButtons"
							onClick={handleTabChange}
						>{tab}
						</Button>
					))}
					</AppBar>

					{currentTab === "DATA" && (
						<>
							<Box className="tabDisplayContent">

								<Box className="dashboardPieChart">
									<div style={{ width: "100px", height: "100px" }}>
										<CircularProgressbar
											value={percentageRemaining}
											text={`${percentageRemaining}%`}
										/>
										<span className="ptodashboard-progress-text">
											of your PTO remaining
										</span>
									</div>
								</Box>
								<Card className="dashboardData">
									<div className="dashboardDataItem">
										Remaining:
									</div>
									<div className="dashboardDataItem">
										{employeeData?.Remaining}
									</div>
									<div className="dashboardDataItem">
										Carried Over:
									</div>
									<div className="dashboardDataItem">
										{employeeData?.CarriedOver}
									</div>
									<div className="dashboardDataItem">
										Current Allowance:
									</div>
									<div className="dashboardDataItem">
										{employeeData?.Allowance}
									</div>
								</Card>
							</Box>
							<div className="InputBox_C">
								<InputBox
									name={name}
									refresher={refresher}
									setRefresher={setRefresher}
								/>
							</div>
						</>
					)}
					{currentTab == "BOOKED" && (<Box className="tabDisplayContent">
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Pending Approval</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell>
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
														</div>
													)}
												</div>
											)
										)}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Approved</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{startingPendingDates?.map(
									(date: string | null | undefined, index) => (
										<div>
											{date != "" && (
												<div>
													<h3>
														{date} to{" "}
														{endingPendingDates[index]}
													</h3>
												</div>
											)}
										</div>
									)
								)}

							</TableBody>
						</Table>

					</Box>)}
					{currentTab == "CALENDAR" && (<Box className="tabDisplayContent">
						<div className="calendarDisplay">{startingToBeApprovedDates ?
							<CalendarComp startDates={startingToBeApprovedDates} endDates={endingToBeApprovedDates} /> : null}
							<div className="legend">
								<div className="CircleBankHols">Bank Holidays</div>
								<div className="CircleBookedHols">Booked Holidays</div>
							</div>
						</div>
					</Box>)}

				</Box>

			</StyledEngineProvider >
		</>
	);
};

export default PTODashboard;
