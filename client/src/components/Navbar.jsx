import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Terminal, LayoutGrid, Code, Tag } from "lucide-react";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 py-4 px-6 mb-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Terminal className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold gradient-text">SnippetHub</span>
        </Link>

        <div className="flex-1 max-w-2xl w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search snippets by title, language, or tags..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-200 transition-all"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/create"
            className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Add Snippet
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
