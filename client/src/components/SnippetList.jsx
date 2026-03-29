import { useState, useEffect } from "react";
import SnippetCard from "./SnippetCard";
import { Loader2, AlertCircle, Inbox } from "lucide-react";
import api from "../../lib/api";

const SnippetList = ({ searchTerm }) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/snippets`);
      setSnippets(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch snippets. Please ensure the server is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      try {
        await api.delete(`/snippets/${id}`);
        setSnippets(snippets.filter((s) => s._id !== id));
      } catch (err) {
        alert("Failed to delete snippet.");
        console.error(err);
      }
    }
  };

  const filteredSnippets = snippets.filter((snippet) => {
    const searchLow = searchTerm.toLowerCase();
    return (
      snippet.title.toLowerCase().includes(searchLow) ||
      (snippet.language && snippet.language.toLowerCase().includes(searchLow)) ||
      (snippet.tags && snippet.tags.some((tag) => tag.toLowerCase().includes(searchLow)))
    );
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-500">
        <Loader2 className="animate-spin mb-6 text-white/20" size={48} />
        <p className="text-sm font-bold uppercase tracking-[0.2em]">Syncing library...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-10 bg-[#0b0f1a] border border-white/10 rounded-3xl text-center shadow-2xl">
        <AlertCircle className="mx-auto mb-6 text-red-500/50" size={48} />
        <p className="text-white font-bold mb-6 tracking-tight">{error}</p>
        <button
          onClick={fetchSnippets}
          className="bg-white text-black px-6 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredSnippets.length === 0) {
    return (
      <div className="text-center mt-5">
        <div className="relative inline-block mb-3">
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full"></div>
            <Inbox className="relative mx-auto text-slate-800" size={80} strokeWidth={1} />
        </div>
        <p className="text-2xl font-semibold text-white mb-2 tracking-tight">
            {searchTerm ? "No matches found" : "Your library is empty"}
        </p>
        <p className="text-slate-500 font-medium max-w-xs mx-auto">
            {searchTerm 
              ? `We couldn't find any snippets matching "${searchTerm}".` 
              : "Start building your personal code collection."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredSnippets.map((snippet) => (
        <SnippetCard key={snippet._id} snippet={snippet} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default SnippetList;
