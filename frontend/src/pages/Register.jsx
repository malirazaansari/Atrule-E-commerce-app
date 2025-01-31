import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post("/auth/signup", formData);
      setSuccess("User registered successfully! You can now log in.");
      console.log(response.data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h1 className="mb-4 font-bold text-2xl">Register</h1>

      {success && <p className="mb-4 text-green-500">{success}</p>}
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="username"
            className="block font-medium"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 py-2 rounded w-full text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
