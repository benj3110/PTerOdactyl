const Employee = require("../models/employee")
const asyncHandler = require("express-async-handler")  //used instead of try catch blocks and handling errors, wrapping the async func 

const getEmployeeData = asyncHandler(async (req, res, next) => {
	const employeeData = await Employee.find();
	res.status(200).json(employeeData);
}) ;

module.exports = { getEmployeeData };
