import { useState } from "react";
import { api, setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;
      setAuthToken(token);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 font-bold text-2xl">Login</h1>
      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 py-2 rounded w-full text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
