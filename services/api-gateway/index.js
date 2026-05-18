require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
  createProxyMiddleware,
} = require("http-proxy-middleware");

const app = express();

app.use(cors());

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "",
    },
  })
);

app.use(
  "/api/tasks",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/api/tasks": "",
    },
  })
);

app.listen(process.env.PORT, () => {
  console.log(`API Gateway running on ${process.env.PORT}`);
});