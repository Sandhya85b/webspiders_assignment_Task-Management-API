require("dotenv").config();
const express = require("express");
const taskRoute = require("./routes/tasks.routes");
const connectToDb = require("./config/mongo.config");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();
const logStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  {
    flags: "a",
  }
);
app.use(morgan("dev"));
app.use(morgan("combined", { stream: logStream }));

const PORT = Number(process.env.PORT_NUMBER) || 8080;
app.use(express.json());

app.use("/tasks", taskRoute);

connectToDb();
app.listen(PORT, () => {
  console.log(`Connected to server ${PORT}`);
});
