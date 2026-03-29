import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard"); // redirect after login
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white w-96 p-8 rounded-xl shadow-lg">
        
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account? 
          <Link to="/signup" className="text-blue-600 cursor-pointer ml-1">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;