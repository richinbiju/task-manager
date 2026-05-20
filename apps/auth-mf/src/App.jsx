import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin
        ? "login"
        : "signup";

      const response = await axios.post(
        `http://localhost:3000/api/auth/${endpoint}`,
        formData
      );

      console.log(response.data);

      toast.success(
        isLogin
          ? "Login successful"
          : "Signup successful"
      );

      if (isLogin) {
        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
        window.location.href = "http://localhost:5000";
      }
    } catch (error) {
      console.error(error);

      toast.error("Authentication failed");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded disabled:opacity-50" disabled={loading}
          >
            {loading
              ? "Loading..."
              : isLogin
                ? "Login"
                : "Signup"}
          </button>

        </form>

        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="mt-4 text-blue-600"
        >
          Switch to{" "}
          {isLogin ? "Signup" : "Login"}
        </button>

      </div>

    </div>
  );
}