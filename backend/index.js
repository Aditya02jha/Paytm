const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken")

const routes = require("./routes/route.js");

const app = express();
require("dotenv").config();



app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routes);



// Use the MONGO_CONNECTION_STRING from .env
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

if (!MONGO_CONNECTION_STRING) {
  console.error(
    "MONGO_CONNECTION_STRING is not defined. Please check your .env file."
  );
  process.exit(1);
}
async function mongoConnect() {
  await mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
}
mongoConnect();
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
