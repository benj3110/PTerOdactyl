// const Employee = require("../models/Employee");
// const asyncHandler = require("express-async-handler"); //used instead of try catch blocks and handling errors, wrapping the async func

// const makeEmployee = asyncHandler(async (req, res, next) => {
// 	console.log(req.body)
// 	const makingEmployee = await Employee.create(req.body);
// 	res.status(200).json({ message: "database updated...." });
// });

// module.exports = { makeEmployee };
