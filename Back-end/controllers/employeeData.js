const Employee = require("../models/Employee");

const getPTOdata = async (req, res) => {
	const PTOData = await Employee.find({}, (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result);
		}
	});
};

module.export = {
	getPTOdata,
};
