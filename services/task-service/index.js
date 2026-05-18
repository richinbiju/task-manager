require("dotenv").config();

const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const pool = require("./db");

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Service API",
      version: "1.0.0",
    },
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Service Running");
});

app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM tasks ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, description, user_id } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks(title, description, user_id)
       VALUES($1, $2, $3)
       RETURNING *`,
      [title, description, user_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await pool.query(
      `DELETE FROM tasks WHERE id = $1`,
      [req.params.id]
    );

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Task Service running on ${process.env.PORT}`);
});