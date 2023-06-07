import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronUp,
	faChevronDown,
	faChevronRight,
	faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { disapprovePTO, inputPTO } from "../../utils";
import "./InputBox.css";

interface inputBoxProps {
	name: string;
	refresher: boolean;
	setRefresher: React.Dispatch<React.SetStateAction<boolean>>;
}
interface inputPTOSubmitInterface {
	name: string;
	allowance: string;
	carriedOver: string;
	remaining: string;
}

const InputBox: React.FC<inputBoxProps> = ({
	name,
	refresher,
	setRefresher,
}) => {
	const [allowance, setAllowance] = useState<string>("");
	const [carried, setCarried] = useState<string>("");
	const [remaining, setRemaining] = useState<string>("");
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
	const [submitButtonError, setSubmitButtonError] =
		useState<string>("Fill all fields");
	// if (remaining > allowance) {
	// 	setIsButtonDisabled(true);
	// } else {
	// 	setIsButtonDisabled(false);
	// }
	useEffect(() => {
		const checkFieldsValid = () => {
			if (!allowance || !carried || !remaining) {
				setSubmitButtonError("Fill all fields");
				return true;
			} else if (parseFloat(remaining) > parseFloat(allowance)) {
				setSubmitButtonError("Remaining is greater than allowance ");
				return true;
			} else {
				setSubmitButtonError("");
				return false;
			}
		};
		setIsButtonDisabled(checkFieldsValid());
	}, [allowance, carried, remaining]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = event.target.value.replace(/[^0-9.]/g, "");

		if (event.target.id == "allowance") {
			setAllowance(inputValue);
		} else if (event.target.id == "carried") {
			setCarried(inputValue);
		} else if (event.target.id == "remaining") {
			setRemaining(inputValue);
		}
	};

	const handleSubmit: () => Promise<void> = async () => {
		const inputPTOSubmit: inputPTOSubmitInterface = {
			name: name,
			allowance: allowance,
			carriedOver: carried,
			remaining: remaining,
		};
		await inputPTO(inputPTOSubmit);
		setAllowance("");
		setCarried("");
		setRemaining("");
		setRefresher(!refresher);
		//navigate("/bookingForm")
	};
	const [isOpen, setIsOpen] = useState(false);

	function toggleDropdown() {
		setIsOpen(!isOpen);
	}

	return (
		<div>
			<div className="InputBoxes_all">
				<div className="dropdown-toggle" onClick={toggleDropdown}>
					<span>Reset PTO Data</span>
					<div className="dropdown-icon">
						<FontAwesomeIcon
							icon={isOpen ? faChevronUp : faChevronDown}
						/>
					</div>
				</div>
				<div >
					{isOpen && (
						<div className="InputBoxes">
							<form>
								Enter Allowance (hr)
								<input
									type="text"
									id="allowance"
									name="name"
									value={allowance}
									onChange={handleInputChange}
								/>
							</form>
							<form>
								Enter PTO Carried Over (hr)
								<input
									type="text"
									id="carried"
									name="name"
									value={carried}
									onChange={handleInputChange}
								/>
							</form>
							<form>
								Enter Remaining (hr)
								<input
									type="text"
									id="remaining"
									name="name"
									value={remaining}
									onChange={handleInputChange}
								/>
							</form>
							<button
								className="PTOInputButton"
								onClick={handleSubmit}
								disabled={isButtonDisabled}
							>
								{" "}
								Submit PTO Data
							</button>
							{isButtonDisabled == true && (
								<span className="submitError">
									Submit error: {submitButtonError}
								</span>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default InputBox;
