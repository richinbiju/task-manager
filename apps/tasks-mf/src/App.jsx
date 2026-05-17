const tasks = [
  "Finish frontend architecture",
  "Connect backend API",
  "Setup PostgreSQL",
  "Deploy shell app",
];

export default function App() {
  return (
    <div className="min-h-screen bg-blue-950 text-white p-10">

      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-4xl font-bold">
            Tasks
          </h1>

          <button className="bg-blue-500 px-5 py-2 rounded-lg">
            Add Task
          </button>

        </div>

        <div className="space-y-4">

          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-blue-900 p-5 rounded-xl flex items-center justify-between"
            >
              <span>{task}</span>

              <button className="text-red-300">
                Delete
              </button>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}