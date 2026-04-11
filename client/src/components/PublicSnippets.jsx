import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import LandingNavbar from "./LandingNavbar";
import SnippetCard from "./SnippetCard";
import { Search, Loader2 } from "lucide-react";

import { useQuery } from "@tanstack/react-query";

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


// ✅ Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}


function PublicSnippets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // ✅ Debounced search
  const debouncedSearch = useDebounce(searchTerm, 500);

  // ✅ API function
  const fetchSnippets = async () => {
    const params = new URLSearchParams();

    if (debouncedSearch.length >= 3) {
      params.append("search", debouncedSearch);
    }

    if (activeCategory !== "All") {
      params.append("language", activeCategory);
    }

    const response = await api.get(
      `/snippets_public?${params.toString()}`
    );

    return response.data;
  };

  // ✅ React Query (cache + fetching + state management)
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["snippets", debouncedSearch, activeCategory],
    queryFn: fetchSnippets,

    staleTime: 60 * 1000, // data fresh for 1 min
    keepPreviousData: true, // smooth UI while switching filters
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <LandingNavbar />

      <main className="relative z-10 py-20 px-6 sm:px-12 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <h1 className="text-4xl font-semibold">Library</h1>

          {/* SEARCH */}
          <div className="relative w-full max-w-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search snippets..."
              className="w-full bg-black border border-white/20 rounded-xl py-2.5 pl-11 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex gap-3 mt-10 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full border transition ${
                activeCategory === category
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-white/10 text-slate-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin" size={40} />
            <p className="text-slate-400 mt-4">Loading...</p>
          </div>
        ) : data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {data.map((item) => (
              <SnippetCard key={item._id} snippet={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 text-slate-500">
            No snippets found.
          </div>
        )}

      </main>
    </div>
  );
}

export default React.memo(PublicSnippets);