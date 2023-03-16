import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./PTODashboard.css";
import { getEmployeeData } from "../utils";
import { useLocation } from "react-router-dom";
import InputBox from "../InputBox/InputBox";
import { employeeDataInterface } from "../interfaces/employDataInterface";

interface PTODashboardProps {
  name: string;
}

const PTODashboard: React.FC<PTODashboardProps> = ({ name }) => {
  const [employeeData, setEmployeeData] = useState<employeeDataInterface>();

  useEffect(() => {
    const employeeDataWrap = async () => {
      setEmployeeData(await getEmployeeData(name));
    };
    employeeDataWrap();
  }, []);

  const percentageRemaining = Math.round(
    (Number(employeeData?.Remaining) / Number(employeeData?.Allowance)) * 100
  );

  //console.log(employeeData);

  return (
    <div className="ptodashboard-wrapper">
      <h1>Paid Time Off Dashboard</h1>
      <div className="InputBox_C">
        <InputBox name={name} />
      </div>
      <div className="ptodashboard-container">
        <div className="ptodashboard-box">
          <h2>Current Allowance</h2>
          <h3>{employeeData?.Allowance} hours</h3>
        </div>
        <div className="ptodashboard-box">
          <h2>Carried Over From Previous Year</h2>
          <h3>{employeeData?.CarriedOver} hours</h3>
        </div>
        <div className="ptodashboard-box">
          <h2>Pending Dates</h2>
          <h3>
            {employeeData?.PendingDates?.map(
              (date: string | null | undefined) => (
                <h3>{date}</h3>
              )
            )}
          </h3>
        </div>
        <div className="ptodashboard-box">
          <h2>Remaining Hours</h2>
          <h3>{employeeData?.Remaining} hours</h3>
        </div>
      </div>
      <div className="ptodashboard-progress">
        <div style={{ width: "100px", height: "100px" }}>
          <CircularProgressbar
            value={percentageRemaining}
            text={`${percentageRemaining}%`}
          />
        </div>

        <h2
          style={{
            backgroundColor: "white",
            fontSize: "30px",
            marginLeft: "25px",
          }}
        >
          of your PTO remaining
        </h2>
      </div>
    </div>
  );
};

export default PTODashboard;
