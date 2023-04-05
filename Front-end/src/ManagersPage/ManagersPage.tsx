import { useState, useEffect } from "react";
import { employeeDataInterface } from "../../../interfaces/employDataInterface";
import { approvePTO, disapprovePTO, getEmployeeData } from "../utils";
import "./ManagersPage.css";
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
		console.log("useEffect");

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
		<div>
			<h2 className="managingTitle">Currently Managing</h2>
			<div className="managingData_C">
				{managedEmpData?.map((empData) => (
					// empData.toApprove?.map((date) => <div>Most TO approve{date}</div>),
					<div className="managingDataEach_C">
						<h3 className="dataTitle" key={empData.Name}>{empData.Name}</h3>
						<h4 key={empData.Remaining}>
							{" "}
							Remaining hours: {empData.Remaining}
						</h4>
						<h4 key={empData.Allowance}>
							{" "}
							Pending Dates:{" "}
							{empData.PendingDates?.map((date) => (
								<div>{date.replace(" # ", " to ")}</div>
							))}
						</h4>
						<h4 key={empData.CarriedOver}>
							{" "}
							To Approve Dates:
							{empData.toApprove?.map((toApproveDate) => (
								<div key={toApproveDate}>
									{toApproveDate.replace(" # ", " to ")}
									<button
										className="approvePTOButton"
										onClick={() => {
											handleApprove(
												toApproveDate,
												empData.Name
											);
										}}
									>
										Approve
									</button>
									<button
										className="denyPTOButton"
										onClick={() => {
											handleDisapprove(
												toApproveDate,
												empData.Name
											);
										}}
									>
										Deny
									</button>
								</div>
							))}
						</h4>
					</div>
				))}
			</div>
		</div>
	);
};

export default ManagersPage;
