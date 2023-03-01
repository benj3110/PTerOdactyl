const cors = require("cors");

const express = require("express");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});