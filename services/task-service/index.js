require("dotenv").config();

const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const pool = require("./db");

const app = express();

const authMiddleware = require(
  "./middleware/authMiddleware"
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description:
        "Task Manager Microservices API",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./index.js"]
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

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */
app.get(
  "/tasks",
  authMiddleware,
  async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`, [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Task created
 */
app.post(
  "/tasks",
  authMiddleware,
  async (req, res) => {
  try {
    const { title, description, user_id } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks(title, description, user_id)
       VALUES($1, $2, $3)
       RETURNING *`,
      [title, description, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task status
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task updated
 */
app.put(
  "/tasks/:id",
  authMiddleware,
  async (req, res) => {
  try {
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET status = $1
       WHERE id = $2
       AND user_id = $3
       RETURNING *`,
      [status, req.params.id, req.user.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted
 */
app.delete(
  "/tasks/:id",
  authMiddleware,
  async (req, res) => {
  try {
    await pool.query(
      `DELETE FROM tasks WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.user.id]
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