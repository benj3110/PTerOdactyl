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
	console.log(`Port ${process.env.PORT} is listening...`);
});

// mongoose.connect(process.env.MONGO_URI,{tlsCAFile: `rds-combined-ca-bundle.pem`}).then(() => {
// 	console.log("Connected to database");
// }); 
//todo this is for aws documentDB connection ^

mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log("Connected to database");
});

const employeeDataRoute = require("./routes/employeeData");
app.use("/", employeeDataRoute);

// const registrationRoute = require("./routes/registration");
// app.use("/", registrationRoute);

const requestPTORoute = require("./routes/bookPTO");
app.use("/", requestPTORoute);

const inputPTORoute = require("./routes/inputPTO");
app.use("/", inputPTORoute);

const calcPTO = require("./routes/calcPTO");
app.use("/", calcPTO);

const approvePTO = require("./routes/approvePTO");
app.use("/", approvePTO);

const disapprovePTO = require("./routes/disapprovePTO");
app.use("/", disapprovePTO);

const getAutoHolidays = require("./routes/getAutoHolidays");
app.use("/", getAutoHolidays);

const employeeDataSearchRoute = require("./routes/employeeDataSearch");
app.use("/", employeeDataSearchRoute);
