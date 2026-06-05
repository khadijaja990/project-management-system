import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login user
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login successful");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ff] flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-sm w-[450px]">
        <h1 className="text-4xl font-bold text-purple-600 mb-3 text-center">
            ProjectTracker        </h1>

        <p className="text-gray-500 text-center mb-10">
          Login to your account
        </p>

        <div className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-100 p-4 rounded-xl outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-gray-100 p-4 rounded-xl outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?

          <Link
            to="/register"
            className="text-purple-600 ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;