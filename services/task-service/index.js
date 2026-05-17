const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Service Running");
});

app.listen(3002, () => {
  console.log("Task Service running on port 3002");
});