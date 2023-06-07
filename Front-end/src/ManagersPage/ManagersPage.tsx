import { useState, useEffect } from "react";
import { employeeDataInterface } from "../interfaces/employDataInterface";
import { approvePTO, disapprovePTO, getEmployeeData } from "../utils";
import "./ManagersPage.css";
import Header from "../Header/Header";
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
interface managersProps {
	name: string;
}

const ManagersPage: React.FC<managersProps> = ({ name }) => {
	const [employeeData, setEmployeeData] = useState<employeeDataInterface>();
	const [managedEmpData, setManagedEmpData] = useState<
		Array<employeeDataInterface>
	>([]);
	const [refresher, setRefresher] = useState<boolean>(true);

	useEffect(() => {
		let isMounted = true;

		const employeeDataWrap = async () => {
			if (isMounted) {
				const empData: employeeDataInterface = await getEmployeeData(
					name
				);
				setEmployeeData(empData);

				if (empData?.ManagingNames) {
					const tempData: Array<employeeDataInterface> =
						await Promise.all(
							empData.ManagingNames.map(
								async (empName: string) => {
									const manEmpData: employeeDataInterface =
										await getEmployeeData(empName);
									return manEmpData;
								}
							)
						);
					console.log(tempData);
					setManagedEmpData(tempData);
				}
			}
		};

		employeeDataWrap();

		return () => {
			isMounted = false;
		};
	}, [name, refresher]);

	const handleApprove = async (
		toApproveDates: string,
		managedName: string | undefined
	) => {
		const approveSubmit = {
			name: managedName,
			toBePendingDates: toApproveDates,
		};
		await approvePTO(approveSubmit);
		setRefresher(!refresher);
	};

	const handleDisapprove = async (
		toApproveDates: string,
		managedName: string | undefined
	) => {
		let [startDateStr, endDateStr] = toApproveDates.split(" # ");

		const disapproveSubmit = {
			name: managedName,
			disapprovedDates: toApproveDates,
			startDate: startDateStr,
			endDate: endDateStr,
		};
		//console.log(disapproveSubmit);
		await disapprovePTO(disapproveSubmit);
		setRefresher(!refresher);
	};

	return (
		<>
			<Header title={"Managing"} />
			<Box className="Box">
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								Name
							</TableCell>
							<TableCell>
								Remaining
							</TableCell>
							<TableCell>
								Pending Approval
							</TableCell>
							<TableCell>
								Approved
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{managedEmpData?.map((user) => (
							<TableRow key={user.Name}>
								<TableCell>{user.Name}</TableCell>
								<TableCell>{user.Remaining}</TableCell>
								<TableCell>
									{user.toApprove?.map((date) => (
										<TableRow key={date}><TableCell>{date.replace(" # ", " to ")}
											<button
												className="approvePTOButton"
												onClick={() => {
													handleApprove(
														date,
														user.Name
													);
												}}
											>
												Approve
											</button>
											<button
												className="denyPTOButton"
												onClick={() => {
													handleDisapprove(
														date,
														user.Name
													);
												}}
											>
												Deny
											</button></TableCell></TableRow>
									))}
								</TableCell>
								<TableCell>{user.PendingDates?.map((date) => (
									<TableRow key={date}><TableCell>{date.replace(" # ", " to ")}</TableCell></TableRow>
								))}</TableCell>
							</TableRow>
						))}
					</TableBody>


				</Table>
			</Box>
		</>
	);
};

export default ManagersPage;
