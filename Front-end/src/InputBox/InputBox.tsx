import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { disapprovePTO, inputPTO } from "../utils";
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

	return (
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
	);
};

export default InputBox;
