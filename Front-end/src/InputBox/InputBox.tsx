import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { inputPTO } from "../utils";
import "./InputBox.css"

const InputBox: React.FC<any> = (props) => {
	//const navigate = useNavigate();
	const empName = props.name;
	const [allowance, setAllowance] = useState("");
	const [carried, setCarried] = useState("");
	const [remaining, setRemaining] = useState("");
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.id == "allowance") {
			setAllowance(event.target.value);
		} else if (event.target.id == "carried") {
			setCarried(event.target.value);
		} else if (event.target.id == "remaining") {
			setRemaining(event.target.value);
		}
	};
	const handleSubmit = async () => {
		const inputPTOSubmit: {
			name: string;
			allowance: string;
			carriedOver: string;
			remaining: string;
		} = {
			name: empName,
			allowance: allowance,
			carriedOver: carried,
			remaining: remaining,
		};
		await inputPTO(inputPTOSubmit);
        setAllowance("")
        setCarried("")
        setRemaining("")
		//navigate("/bookingForm")
	};
	//console.log(`${allowance},${carried},${remaining}`);

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
			<button className="PTOInputButton" onClick={handleSubmit}> Submit PTO Data</button>
		</div>
	);
};

export default InputBox;
