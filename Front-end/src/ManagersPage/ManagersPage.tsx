import { useState, useEffect } from "react";
import { employeeDataInterface } from "../interfaces/employDataInterface";
import { getEmployeeData } from "../utils";
interface managersProps {
  name: string;
}

const ManagersPage: React.FC<managersProps> = ({ name }) => {
  const [employeeData, setEmployeeData] = useState<employeeDataInterface>();
  const [managedEmpData, setManagedEmpData] =
    useState<[employeeDataInterface]>();

  useEffect(() => {
    const employeeDataWrap = async () => {
      setEmployeeData(await getEmployeeData(name));
      //     if ()
      //     {setManagedEmpData(await getEmployeeData(employeeData?.ManagingNames[0]))}
    };
    employeeDataWrap();
  }, []);

  return (
    <div>
      <h2>Currently Managing</h2>
      <div className="ManagingEmployees_C">
        {employeeData?.ManagingNames?.map((emp) => (
          <h3>{emp}</h3>
        ))}
      </div>
    </div>
  );
};

export default ManagersPage;
