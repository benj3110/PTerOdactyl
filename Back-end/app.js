require("dotenv").config();

const cors = require("cors");

const express = require("express");

const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 8000;

// middleware 
//app.use means that every http request goes through this code. 
//if youre gonna use a a function in it then use req, res, next. next to continue the code after the function
app.use(cors());
app.use(express.json());

app.listen(port, () => {
	console.log("Port is listening...");
});

mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log("Connected to database");
});

const employeeDataRoute = require("./routes/employeeData");
app.use("/getEmployeeData", employeeDataRoute);


const registrationRoute = require("./routes/registration")
app.use("/makeEmployee", registrationRoute)

const requestPTORoute = require("./routes/PTO")
app.use("/requestPTO", requestPTORoute)


