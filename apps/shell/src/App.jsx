import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { Suspense } from "react";

const AuthApp = React.lazy(() => import("authmf/AuthApp"));
const TasksApp = React.lazy(() => import("tasksmf/TasksApp"));
const DashboardApp = React.lazy(() => import("dashboardmf/DashboardApp"));

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-zinc-950 text-white">

        {/* NAVBAR */}

        <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">

          <h1 className="text-2xl font-bold">
            AI Task Manager
          </h1>

          <div className="flex gap-6 text-lg">

            <Link
              to="/"
              className="hover:text-blue-400"
            >
              Dashboard
            </Link>

            <Link
              to="/tasks"
              className="hover:text-blue-400"
            >
              Tasks
            </Link>

            <Link
              to="/auth"
              className="hover:text-blue-400"
            >
              Auth
            </Link>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </button>

          </div>

        </nav>

        {/* REMOTE RENDER AREA */}

        <div className="min-h-[calc(100vh-80px)]">

          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">

                <h1 className="text-3xl font-bold">
                  Loading Microfrontend...
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