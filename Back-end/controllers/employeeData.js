const Employee = require("../models/employee");
const asyncHandler = require("express-async-handler"); //used instead of try catch blocks and handling errors, wrapping the async func

const getEmployeeData = asyncHandler(async (req, res) => {
  const name = req.params.name;
  //console.log(name);
  const employeeData = await Employee.findOne({ Name: name });
  res.status(200).json(employeeData);
});

// const getManagedEmpData = asyncHandler(async (req, res) => {
//   const names = req.params.name;
//   //console.log(name);
//   const employeeData = await Employee.findOne({ Name: name });
//   res.status(200).json(employeeData);
// });

module.exports = { getEmployeeData};
