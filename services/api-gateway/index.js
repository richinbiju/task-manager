const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API Gateway Running");
});

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});