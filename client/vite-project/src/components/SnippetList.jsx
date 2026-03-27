import React, { useState, useEffect } from "react";
import axios from "axios";
import SnippetCard from "./SnippetCard";
import { Loader2, AlertCircle, Inbox } from "lucide-react";

const SnippetList = ({ searchTerm }) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(import.meta.env.BASE_URL);
  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/snippets`);
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
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/snippets/${id}`);
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
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="text-lg font-medium">Loading your snippets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 glass border-danger/30 rounded-xl text-center">
        <AlertCircle className="mx-auto mb-4 text-danger" size={40} />
        <p className="text-white font-medium mb-4">{error}</p>
        <button
          onClick={fetchSnippets}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredSnippets.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <Inbox className="mx-auto mb-4 opacity-20" size={64} />
        <p className="text-xl">No snippets found.</p>
        {searchTerm && <p className="mt-2 outline-none">Try a different search term.</p>}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSnippets.map((snippet) => (
        <SnippetCard key={snippet._id} snippet={snippet} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default SnippetList;
