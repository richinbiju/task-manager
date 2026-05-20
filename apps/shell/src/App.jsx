import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { Suspense } from "react";

const AuthApp = React.lazy(() => import("authmf/AuthApp"));
const TasksApp = React.lazy(() => import("tasksmf/TasksApp"));
const DashboardApp = React.lazy(() => import("dashboardmf/DashboardApp"));

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-gray-100">

        {/* NAVBAR */}

        <nav className="bg-black text-white p-4 flex gap-6 items-center">
          <Link to="/">Dashboard</Link>

          <Link to="/tasks">
            Tasks
          </Link>

          <Link to="/auth">
            Auth
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="ml-auto bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </nav>

        {/* REMOTE RENDER AREA */}

        <div className="p-6">

          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">

                <h1 className="text-3xl font-bold">
                  Loading...
                </h1>

              </div>
            }
          >

            <Routes>

              <Route
                path="/"
                element={
                  token ? (
                    <DashboardApp />
                  ) : (
                    <AuthApp />
                  )
                }
              />

              <Route
                path="/tasks"
                element={
                  token ? (
                    <TasksApp />
                  ) : (
                    <AuthApp />
                  )
                }
              />

              <Route
                path="/auth"
                element={<AuthApp />}
              />

            </Routes>

          </Suspense>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;