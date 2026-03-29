import React from "react";
import { Link } from "react-router-dom";
import { Code, Clock, ChevronRight, Trash2, Edit2 } from "lucide-react";

const SnippetCard = ({ snippet, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric"
    });
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-violet-500/20 to-fuchsia-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative bg-gradient-to-t from-[#0b0f1a] via-[#111729]/50 to-[#050505] border border-white/10 rounded-2xl p-6 flex flex-col h-full hover:border-white/30 transition-all duration-300 shadow-2xl">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:bg-white/10 transition-colors">
              <Code size={16} className="text-white" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 tracking-[0.15em] uppercase">
              {snippet.language || "Plain Text"}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Link
              to={`/edit/${snippet._id}`}
              className="p-1.5 hover:bg-white/5 rounded-lg text-slate-600 hover:text-white transition-all active:scale-95"
            >
              <Edit2 size={14} />
            </Link>
            <button
              onClick={() => onDelete(snippet._id)}
              className="p-1.5 cursor-pointer hover:bg-red-500/10 rounded-lg text-slate-600 hover:text-red-500 transition-all active:scale-95"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 tracking-tight group-hover:text-primary transition-colors">
          {snippet.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow font-medium">
          {snippet.description || "No description provided."}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {snippet.tags && snippet.tags.length > 0 ? (
            snippet.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 bg-white/5 text-slate-400 rounded-md border border-white/5 group-hover:border-white/10 transition-colors uppercase font-bold tracking-wider"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-[10px] text-slate-700 italic tracking-wide"># no-tags</span>
          )}
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
            <Clock size={12} />
            <span>{formatDate(snippet.createdAt)}</span>
          </div>
          <Link
            to={`/snippet/${snippet._id}`}
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest bg-black px-2 py-2 rounded-[7px] text-white/50 hover:text-white transition-all"
          >
            Open <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
