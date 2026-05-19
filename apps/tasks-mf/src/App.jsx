import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tasks/tasks"
      );

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/tasks/tasks",
        {
          ...formData,
          user_id: 1,
        }
      );

      setFormData({
        title: "",
        description: "",
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/tasks/tasks/${id}`
      );

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/tasks/tasks/${id}`,
        {
          status: "completed",
        }
      );

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Tasks</h1>

      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button onClick={createTask}>
        Create Task
      </button>

      <hr />

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>

          <button
            onClick={() =>
              updateTask(task.id)
            }
          >
            Complete
          </button>

          <button
            onClick={() =>
              deleteTask(task.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}