const Employee = require("../models/employee")

const getEmployeeData = (req, res, next) => {
	const employeeData = Employee.find();
	res.json(employeeData);
};

module.exports = { getEmployeeData };
