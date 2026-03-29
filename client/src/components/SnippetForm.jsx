import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Save, X, Type, Code, Tag, AlignLeft, Info } from "lucide-react";

const SnippetForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    language: "",
    code: "",
    tags: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && id) {
      const fetchSnippet = async () => {
        try {
          const response = await api.get(`/snippets/${id}`);
          const { title, language, code, tags, description } = response.data;
          setFormData({
            title: title || "",
            language: language || "",
            code: code || "",
            tags: tags ? tags.join(", ") : "",
            description: description || "",
          });
        } catch (err) {
          setError("Failed to fetch snippet data.");
          console.error(err);
        }
      };
      fetchSnippet();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
    };

    try {
      if (isEdit) {
        await api.put(`/snippets/${id}`, payload);
      } else {
        await api.post(`/snippets`, payload);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-primary/10 px-8 py-6 border-b border-white/5">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            {isEdit ? "Update Snippet" : "Create New Snippet"}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Fill in the details below to save your code snippet.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Type size={16} className="text-primary" /> Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white"
                placeholder="My Awesome Script"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Code size={16} className="text-accent" /> Language
              </label>
              <input
                type="text"
                name="language"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white"
                placeholder="e.g. JavaScript, Python"
                value={formData.language}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Info size={16} className="text-secondary" /> Description
            </label>
            <textarea
              name="description"
              rows="2"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white resize-none"
              placeholder="What does this snippet do?"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Code size={16} className="text-slate-400" /> Code Snippet
            </label>
            <textarea
              name="code"
              required
              rows="10"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white font-mono text-sm"
              placeholder="Paste your code here..."
              value={formData.code}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Tag size={16} className="text-yellow-500" /> Tags
            </label>
            <input
              type="text"
              name="tags"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white"
              placeholder="react, hooks, util (comma separated)"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-blue-600 disabled:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  {isEdit ? "Update Snippet" : "Save Snippet"}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <X size={20} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SnippetForm;
