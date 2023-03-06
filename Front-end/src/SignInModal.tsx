/* // import { IEmployee } from "../../Interfaces/EmployeeDInterface";
import { useEffect } from "react";
import { getUser } from "../../utils/FetchRequests";
interface myStates {
  setEmployeeID: React.Dispatch<React.SetStateAction<string>>;
  setSignInModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEmployee: React.Dispatch<React.SetStateAction<IEmployee | undefined>>;
  employeeID: String;
}

const SignInModal = ({
  setEmployeeID,
  setSignInModal,
  setEmployee,
  employeeID,
}: myStates) => {
  let input: string;

  //state
  const employeeIDHandler = () => {
    setEmployeeID(input);
  };

  const handleGetUser = async () => {
    let result = await getUser(employeeID);
    setEmployee(result);
  };

  useEffect(() => {
    handleGetUser();
  }, [employeeID]);
  return (
    <div className="signIn_Modal">
      <div className="login_container">
        <label htmlFor="login">Log in: </label>
        <input
          type="text"
          id="signIn_input"
          placeholder="Enter Employee ID"
          onChange={(e) => {
            input = e.target.value;
          }}
        />
        <button
          onClick={() => {
            employeeIDHandler();
            setSignInModal(false);
          }}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
 */
