import React, { useCallback, useEffect, useState } from "react";
import api from "../../lib/api";
import LandingNavbar from "./LandingNavbar";
import SnippetCard from "./SnippetCard";
import { Search, Loader2 } from "lucide-react";

const categories = [
  "All",
  "JavaScript",
  "React",
  "TypeScript",
  "Tailwind",
  "Python",
  "Node",
  "CSS",
];

function PublicSnippets() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (searchTerm.length >= 3) {
        params.append("search", searchTerm);
      }

      const activeLang = activeCategory;
      if (activeLang !== "All") {
        params.append("language", activeLang);
      }

      const response = await api.get(`/snippets_public?${params.toString()}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching public snippets:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    if (searchTerm && searchTerm.length < 3 && searchTerm.length > 0) return;

    const delay = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm, activeCategory, fetchData]);

  return (
    <div className="min-h-screen bg-black text-white">
      <LandingNavbar />
      <main className="relative z-10 py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="w-full min-h-[130px] flex justify-between items-center flex-col md:flex-row md:gap-5">
          <h1 className="text-4xl font-semibold mb-8 tracking-tight">Library</h1>

          <div className="flex-1 max-w-xl w-full relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search snippets..."
              className="w-full bg-black border border-white/20 rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 text-slate-200 transition-all placeholder:text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap cursor-pointer px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="text-primary animate-spin" size={48} />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              Loading Snippets...
            </p>
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item) => (
              <SnippetCard key={item._id} snippet={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/5 border border-dashed border-white/10 rounded-3xl">
            <p className="text-slate-500 text-xl font-medium">No snippets found.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default React.memo(PublicSnippets);
