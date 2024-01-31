const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connection = require("./dbConnection");
const cors = require("cors");

connection();

app.use(express.json());

app.use(cors());

app.use("/data", require("./routes/Information"));

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
