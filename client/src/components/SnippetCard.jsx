import { Link, useNavigate } from "react-router-dom";
import { Code, Clock, ChevronRight, Trash2, Edit2, User, Heart, LogInIcon } from "lucide-react";
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from "react";
import socket from "../socket.js"

const SnippetCard = ({ snippet, onDelete }) => {
  const navigate=useNavigate()
  const { user: currentUser } = useAuth();
  const [like, setLike] = useState(
    currentUser && snippet.likes?.includes(currentUser._id)
  );
  const [likeCount, setLikeCount] = useState(snippet.likes?.length || 0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isOwner =
    currentUser &&
    (snippet.user?._id === currentUser._id || snippet.user === currentUser._id);

  const handleLike = async () => {
    if (!currentUser) {
      setShowLoginPopup(true);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/snippet_likes/${snippet._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        setLike(data.liked);
        setLikeCount(data.likeCount);
      }
    } catch (error) {
      console.error("Error liking snippet:", error);
    }
  };


 useEffect(() => {
  socket.on("likeUpdated", (data) => {

    if (data.snippetId === snippet._id) {
      setLikeCount(data.likeCount);
    }

  });

  return () => socket.off("likeUpdated");

}, []);

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-violet-500/20 to-fuchsia-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

      <div className="relative bg-gradient-to-t from-[#0b0f1a] via-[#111729]/50 to-[#050505] border border-white/10 rounded-2xl p-6 flex flex-col h-full hover:border-white/30 transition-all duration-300 shadow-2xl">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:bg-white/10 transition-colors">
              <Code size={16} className="text-primary" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 tracking-[0.15em] uppercase">
              {snippet.language || "Plain Text"}
            </span>
          </div>


          <div className="flex gap-2 items-center">
            <button className={`cursor-pointer flex items-center gap-1`} onClick={handleLike}>
              <Heart className={`${like ? "text-red-400 fill-red-400" : "text-white"}`} size={20} />
              <span className="text-xs text-slate-400">{likeCount}</span>
            </button>
            {isOwner && (
              <>
              <button className="text-gray-700 capitalize">{snippet.visibility}</button>
                <Link
                  to={`/edit/${snippet._id}`}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-600 hover:text-white transition-all active:scale-95"
                >
                  <Edit2 size={14} />
                </Link>
                {onDelete && (
                  <button
                    onClick={() => onDelete(snippet._id)}
                    className="p-1.5 cursor-pointer hover:bg-red-500/10 rounded-lg text-slate-600 hover:text-red-500 transition-all active:scale-95"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </>
            )}
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
                className="text-[10px] px-2 py-0.5 bg-white/5 text-slate-400 rounded-md border border-white/10 transition-colors uppercase font-bold tracking-wider"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-[10px] text-slate-700 italic tracking-wide">
              # no-tags
            </span>
          )}
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
              <Clock size={12} />
              <span>{formatDate(snippet.createdAt)}</span>
            </div>
            {snippet.user?.name && (
              <div className="flex items-center gap-1 text-slate-500 text-[10px] font-medium">
                <User size={10} />
                <span>{snippet.user.name}</span>
              </div>
            )}
          </div>
          <Link
            to={`/snippet/${snippet._id}`}
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest bg-black px-3 py-2 rounded-lg text-white/50 hover:text-white transition-all border border-white/5"
          >
            Open <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {showLoginPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="bg-[#0b0f1a] border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl transform animate-in zoom-in-95 duration-300 relative overflow-hidden"
          >

            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                <span className="text-3xl"><LogInIcon className="text-white"/></span>
              </div>
              
              <h4 className="text-xl font-bold text-white mb-2">Login Required</h4>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Please login first to like and save your favorite snippets!
              </p>
              
              <div className="flex flex-col w-full gap-3">
                <Link
                  to="/login"
                  className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Go to Login
                </Link>
                <button
                  onClick={() => setShowLoginPopup(false)}
                  className="w-full bg-white/5 text-slate-400 font-medium py-3 rounded-xl hover:bg-white/10 hover:text-white transition-all active:scale-95"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnippetCard;
