require("dotenv").config();

const cors = require("cors");

const express = require("express");

const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("Connected to database")
});

// middleware
app.use(cors());
app.use(express.json());
app.listen(8000, () => {
	console.log("Port is listening...");
});
