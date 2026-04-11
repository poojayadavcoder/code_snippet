import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Clock, ChevronLeft, Copy, Edit2, Trash2 } from "lucide-react";
import api from "../../lib/api";
import Navbar from "./Navbar";
import { useAuth } from "../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchSnippet = async (id) => {
  const res = await api.get(`/snippets/${id}`);
  return res.data;
};

const SnippetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  const [copied, setCopied] = useState(false);

  const {
    data: snippet,
    isLoading,
  } = useQuery({
    queryKey: ["snippet", id],
    queryFn: () => fetchSnippet(id),
    enabled: !!id,
  });


  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/snippets/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries(["snippets"]);
      navigate("/dashboard");
    },
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this snippet?")) {
      deleteMutation.mutate();
    }
  };

  const isOwner =
    currentUser &&
    (snippet?.user?._id === currentUser._id ||
      snippet?.user === currentUser._id);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!snippet)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Snippet not found.
      </div>
    );

  
  return (
    <>
      <Navbar onSearch={() => {}} />

      <div className="max-w-5xl mx-auto px-2 sm:px-6 py-12">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-slate-500 hover:text-white"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        <div className="bg-[#0b0f1a] border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs uppercase text-slate-400">
                    {snippet.language}
                  </span>
                  <span className="text-xs text-slate-600 flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(snippet.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h1 className="text-4xl text-white">{snippet.title}</h1>
              </div>

              {isOwner && (
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/edit/${snippet._id}`)}
                  >
                    <Edit2 />
                  </button>

                  <button onClick={handleDelete}>
                    <Trash2 />
                  </button>
                </div>
              )}
            </div>

            <p className="text-slate-400 mt-4">{snippet.description}</p>

            <div className="flex gap-2 mt-4">
              {snippet.tags.map((tag, i) => (
                <span key={i} className="text-xs text-slate-500">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative p-8 bg-[#020617]">
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 text-xs text-white"
            >
              {copied ? "COPIED" : "COPY"}
            </button>

            <SyntaxHighlighter
              language={snippet.language.toLowerCase()}
              style={nightOwl}
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </>
  );
};

export default SnippetDetail;