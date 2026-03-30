import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, Terminal } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ onSearch }) => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 py-4 px-2 sm:px-6 mb-8">
      <div className="max-w-7xl bg-red-800 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
         <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-black border border-white/30 rounded-lg transition-colors">
            <Terminal className="text-white" size={20} />
          </div>
          <span className="text-[18px] font-semibold text-white">
            SnippetKit
          </span>
        </Link>

        <div className="flex-1 max-w-xl w-full relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search snippets..."
            className="w-full bg-black border border-white/20 rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 text-slate-200 transition-all placeholder:text-slate-600"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/create"
            className="flex items-center gap-2 bg-black text-white border border-white/30 hover:bg-white/5 px-5 py-2 rounded-xl font-medium transition-all"
          >
            <Plus size={18} />
            <span>New Snippet</span>
          </Link>
          
          <button 
            onClick={logout} 
            className="text-xs font-semibold bg-red-400 px-3 py-3 rounded-[7px] text-black cursor-pointer hover:bg-red-300 transition-colors uppercase"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
