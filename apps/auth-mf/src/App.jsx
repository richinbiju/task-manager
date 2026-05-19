import { useState } from "react";
import axios from "axios";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

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

    try {
      const endpoint = isLogin
        ? "login"
        : "signup";

      const response = await axios.post(
        `http://localhost:3000/api/auth/${endpoint}`,
        formData
      );

      console.log(response.data);

      alert(
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
      }
    } catch (error) {
      console.error(error);

      alert("Authentication failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>
        {isLogin ? "Login" : "Signup"}
      </h1>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
        )}

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <br />

      <button
        onClick={() =>
          setIsLogin(!isLogin)
        }
      >
        Switch to{" "}
        {isLogin ? "Signup" : "Login"}
      </button>
    </div>
  );
}