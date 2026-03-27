import React from "react";
import { Link } from "react-router-dom";
import { Code, Clock, Tag, ChevronRight, Trash2, Edit2 } from "lucide-react";

const SnippetCard = ({ snippet, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="glass glass-hover rounded-xl overflow-hidden p-6 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-accent/20 rounded text-accent">
            <Code size={16} />
          </span>
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
            {snippet.language || "Plain Text"}
          </span>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/edit/${snippet._id}`}
            className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
          >
            <Edit2 size={16} />
          </Link>
          <button
            onClick={() => onDelete(snippet._id)}
            className="p-1.5 hover:bg-danger/20 rounded text-slate-400 hover:text-danger transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
        {snippet.title}
      </h3>
      
      <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
        {snippet.description || "No description provided."}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {snippet.tags && snippet.tags.length > 0 ? (
          snippet.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="text-[10px] text-slate-500 italic">No tags</span>
        )}
      </div>

      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-1.5">
          <Clock size={12} />
          <span>{formatDate(snippet.createdAt)}</span>
        </div>
        <Link
          to={`/snippet/${snippet._id}`}
          className="flex items-center gap-1 text-primary hover:text-blue-400 font-medium transition-colors"
        >
          View Code <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default SnippetCard;
