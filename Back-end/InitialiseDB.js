require("dotenv").config();

const cors = require("cors");

const express = require("express");

const mongoose = require("mongoose");

const Employee = require("./models/Employee");
const Dates = require("./models/Dates");

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

mongoose.connect(process.env.MONGO_URI, { tlsCAFile: `rds-combined-ca-bundle.pem` }).then(() => {
    console.log("Connected to database");
});

const initDB = async () => {

    const makingEmployee = new Employee({
        "Role": "Employee",
        "Name": "name",
        "Allowance": "100",
        "CarriedOver": "0",
        "PendingDates": ["25/04/2023, 09:00:00 # 26/04/2023, 10:00:00"],
        "Remaining": "24",
        "UsedDates": "21:12:2020-23:12:2020",
        "Manager": "name",
        "toApprove": ["24/04/2023, 09:00:00 # 27/04/2023, 01:00:00"],
        "ManagingNames": [""]
    });

    try {
        const savedUser = await makingEmployee.save();
        console.log('User saved to DocumentDB!', savedUser);
    } catch (error) {
        console.error('Failed to save user to DocumentDB:', error);
    }
}

initDB()