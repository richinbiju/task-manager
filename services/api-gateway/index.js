require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
  createProxyMiddleware,
} = require("http-proxy-middleware");

const app = express();

const PORT =
  process.env.PORT || 3000;

app.listen(PORT);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "",
    },
  })
);

app.use(
  "/api/tasks",
  createProxyMiddleware({
    target: process.env.TASK_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/tasks": "",
    },
  })
);

app.listen(process.env.PORT, () => {
  console.log(`API Gateway running on ${process.env.PORT}`);
});