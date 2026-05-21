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
        `${import.meta.env.VITE_API_URL}/api/tasks/tasks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
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

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">
            Total Tasks
          </h2>

          <p className="text-4xl mt-4 text-blue-600">
            {tasks.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">
            Completed
          </h2>

          <p className="text-4xl mt-4 text-green-600">
            {completedTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">
            Pending
          </h2>

          <p className="text-4xl mt-4 text-red-600">
            {pendingTasks}
          </p>
        </div>

      </div>

    </div>
  );
}