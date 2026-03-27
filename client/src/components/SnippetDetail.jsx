import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Edit2, Trash2, Copy, Check, Terminal, Clock, Tag } from "lucide-react";

const SnippetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/snippets/${id}`);
        setSnippet(response.data);
      } catch (err) {
        setError("Snippet not found.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSnippet();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      try {
        await axios.delete(`${process.env.BASE_URL}/snippets/${id}`);
        navigate("/");
      } catch (err) {
        alert("Failed to delete snippet.");
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-danger">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
        <ArrowLeft size={18} /> Back to Snippets
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">{snippet.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
            <span className="flex items-center gap-1.5 bg-accent/20 text-accent px-2 py-1 rounded">
              <Terminal size={14} /> {snippet.language || "Plain Text"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {new Date(snippet.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/edit/${snippet._id}`}
            className="p-2.5 glass glass-hover rounded-xl text-slate-300 hover:text-primary"
          >
            <Edit2 size={20} />
          </Link>
          <button
            onClick={handleDelete}
            className="p-2.5 glass glass-hover rounded-xl text-slate-300 hover:text-danger"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {snippet.description && (
        <div className="glass rounded-xl p-6">
          <h3 className="text-slate-300 font-semibold mb-2 flex items-center gap-2">
            Description
          </h3>
          <p className="text-slate-400">{snippet.description}</p>
        </div>
      )}

      <div className="relative group">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleCopy}
            className="bg-slate-800/80 hover:bg-primary text-white p-2 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 text-xs font-bold"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
        
        <div className="bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-danger/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-secondary/50"></div>
            </div>
          </div>
          <pre className="p-8 overflow-x-auto font-mono text-sm leading-relaxed text-blue-100/90 whitespace-pre">
            {snippet.code}
          </pre>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {snippet.tags.map((tag, idx) => (
          <span key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700 text-xs">
            <Tag size={12} /> {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SnippetDetail;
