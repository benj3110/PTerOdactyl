import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { inputPTO } from "../utils";
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

const InputBox: React.FC<inputBoxProps> = ({ name, refresher, setRefresher }) => {
	const [allowance, setAllowance] = useState<string>("");
	const [carried, setCarried] = useState<string>("");
	const [remaining, setRemaining] = useState<string>("");
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.id == "allowance") {
			setAllowance(event.target.value);
		} else if (event.target.id == "carried") {
			setCarried(event.target.value);
		} else if (event.target.id == "remaining") {
			setRemaining(event.target.value);
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
		setRefresher(!refresher)
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
			<button className="PTOInputButton" onClick={handleSubmit}>
				{" "}
				Submit PTO Data
			</button>
		</div>
	);
};

export default InputBox;
