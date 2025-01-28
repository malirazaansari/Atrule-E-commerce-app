import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // For displaying error messages
  const [success, setSuccess] = useState(null); // For displaying success messages
  const navigate = useNavigate(); // For redirecting after successful registration

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post("/auth/signup", formData); // Send data to the backend
      setSuccess("User registered successfully! You can now log in.");
      console.log(response.data);
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (err) {
      setError(err.response?.data || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h1 className="mb-4 font-bold text-2xl">Register</h1>

      {/* Display Success or Error Messages */}
      {success && <p className="mb-4 text-green-500">{success}</p>}
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Username Field */}
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

        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Submit Button */}
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
