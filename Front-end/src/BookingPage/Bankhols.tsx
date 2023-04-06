import { useEffect, useState } from "react";
import { getBankHols } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./Bankhols.css";

const BankHols = () => {
	const [bankHols, setBankHols] = useState<string[]>([]);

	useEffect(() => {
		const getHols = async () => {
			const data = await getBankHols();
			setBankHols(data.BankHolidays);
		};
		getHols();
	}, []);
	console.log(bankHols);
	const [isOpen, setIsOpen] = useState(false);

	function toggleDropdown() {
		setIsOpen(!isOpen);
	}

	return (
		<div className="bankHolsBox">
			<div className="dropdown">
				<div className="dropdown-toggle" onClick={toggleDropdown}>
					<span>Bank Holidays 2023</span>
					<div className="dropdown-icon">
						<FontAwesomeIcon
							icon={isOpen ? faChevronUp : faChevronDown}
						/>
					</div>
				</div>
				{isOpen && (
					<div className="dropdown-content">
						{bankHols.map((date, index) => (
							<div key={index} className="dropdown-item">
								{date}
							</div>
						))}
					</div>
				)}
			</div>
			{/* <div onClick={toggleDropdown}>Bank Holidays 2023</div>
			<select>
				{bankHols.map((date) => (
					<option>{date}</option>
				))}
			</select> */}
		</div>
	);
};

export default BankHols;
