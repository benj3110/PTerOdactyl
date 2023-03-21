import React, { useState, useEffect } from "react";
import { getEmployeeData } from "../utils";
import { useNavigate, NavigateFunction } from "react-router-dom";
interface loginInterface {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isManager: boolean;
  setIsManager: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<loginInterface> = ({
  name,
  setName,
  loggedIn,
  setLoggedIn,
  isManager,
  setIsManager,
}) => {
  const navigate: NavigateFunction = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const empCheck = await getEmployeeData(name);
      if (empCheck) {
        empCheck.Role == "Manager" &&
          (setIsManager(true), navigate("/managersPage"));
        setLoggedIn(true);
        empCheck.Role == "Employee" && navigate("/");
      } else {
        console.log("name doesn't match");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick: (event: any) => void = (event: any) => {
    setLoggedIn(false);
    setIsManager(false);
    setName("");
  };

  return (
    <div>
      {loggedIn == false ? (
        <div className="booking-formTitle">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Sign out</h1>
          <button type="button" onClick={handleClick}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
