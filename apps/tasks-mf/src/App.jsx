import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks/tasks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );  

      setTasks(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks/tasks`,
        {
          ...formData,
          user_id: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFormData({
        title: "",
        description: "",
      });

      fetchTasks();

      toast.success("Task created");
    } catch (error) {
      console.error(error);

      toast.error("Operation failed");
    }
    finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/tasks/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchTasks();

      toast.success("Task deleted");
    } catch (error) {
      console.error(error);

      toast.error("Operation failed");
    }
  };

  const updateTask = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/tasks/${id}`,
        {
          status: "completed",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchTasks();

      toast.success("Task completed");
    } catch (error) {
      console.error(error);

      toast.error("Operation failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Tasks</h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
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
          className="w-full border p-3 rounded"
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
          className="w-full border p-3 rounded"
        />

        <br />
        <br />

        <button onClick={createTask} disabled={loading}
        className="bg-black text-white px-4 py-2 rounded">
          {loading ? "Creating..." : "Create Task"}
        </button>
      </div>

      <hr />

      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-xl shadow-md p-5 mb-4"
        >
          <h3 className="text-2xl font-bold mb-2">{task.title}</h3>

          <p className="text-gray-700 mb-2">{task.description}</p>

          <p className="mb-4 font-medium">Status: {task.status}</p>

          <button
            onClick={() =>
              updateTask(task.id)
            }
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            Complete
          </button>

          <button
            onClick={() =>
              deleteTask(task.id)
            }
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}