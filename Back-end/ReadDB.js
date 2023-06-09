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

const readDB = async () => {
    try {
        const readAll = await Dates.find();
        console.log(readAll);
    } catch (err) {
        console.error("Read error"), err;
    }
}

readDB()