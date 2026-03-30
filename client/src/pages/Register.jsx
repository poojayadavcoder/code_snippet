import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LandingNavbar from '../components/LandingNavbar';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, register, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      <LandingNavbar />
      
      {/* Background Glow */}
      <div className="hero-glow opacity-50"></div>
      
      <div className="flex-1 flex items-center justify-center px-6 py-12 mt-12">
        <div className="w-full max-w-md">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-[#0b0f1a] border border-white/10 rounded-2xl shadow-2xl py-5 px-3 sm:p-8 md:p-10">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-2 tracking-tight">Create account</h2>
                <p className="text-slate-400 text-sm">Start organizing your snippets today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-black border border-white/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full bg-black border border-white/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-black border border-white/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black cursor-pointer text-white border border-white/30 py-3.5 rounded-xl font-semibold transition-all shadow-xl shadow-white/5 mt-4"
                >
                  Create Account
                </button>
              </form>

              <div className="mt-10 text-center">
                <p className="text-sm text-slate-400">
                  Already have an account? 
                  <Link to="/login" className="text-white font-semibold hover:underline ml-1.5 transition-all">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center text-[10px] text-slate-600 border-t border-white/5 relative z-10">
        © {new Date().getFullYear()} SnippetKit. All rights reserved.
      </footer>
    </div>
  );
}

export default Register;