import { useEffect, useState } from "react";

import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <div>
        <h2>Total Tasks: {tasks.length}</h2>

        <h2>
          Completed Tasks: {completedTasks}
        </h2>

        <h2>
          Pending Tasks: {pendingTasks}
        </h2>
      </div>
    </div>
  );
}