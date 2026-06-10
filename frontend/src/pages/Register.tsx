import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Register user
  const handleRegister = async () => {
    try {
      await axios.post(
        "https://project-management-system-fjma.onrender.com/api/auth/register",
        formData
      );

      alert("Account created successfully");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ff] flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow-sm w-[450px]">

        <h1 className="text-4xl font-bold text-purple-600 mb-3 text-center">
          ProjectTracker
        </h1>

        <p className="text-gray-500 text-center mb-10">
          Create a new account
        </p>

        <div className="flex flex-col gap-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-100 p-4 rounded-xl outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-100 p-4 rounded-xl outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-100 p-4 rounded-xl outline-none"
          />

          <button
            onClick={handleRegister}
            className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition"
          >
            Register
          </button>

        </div>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?

          <Link
            to="/login"
            className="text-purple-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;