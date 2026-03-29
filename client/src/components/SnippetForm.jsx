import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Code, Tag, AlignLeft, Layout } from "lucide-react";
import api from "../../lib/api";
import Navbar from "./Navbar";

const SnippetForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript",
    tags: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const fetchSnippet = async () => {
        try {
          const response = await api.get(`/snippets/${id}`);
          const snippet = response.data;
          setFormData({
            title: snippet.title,
            description: snippet.description || "",
            code: snippet.code,
            language: snippet.language || "javascript",
            tags: snippet.tags ? snippet.tags.join(", ") : "",
          });
        } catch (err) {
          console.error(err);
        }
      };
      fetchSnippet();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      };

      if (isEdit) {
        await api.put(`/snippets/${id}`, payload);
      } else {
        await api.post(`/snippets`, payload);
      }
      navigate(isEdit ? `/snippet/${id}` : "/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save snippet.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar onSearch={() => {}} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-white bg-black border border-white/30 rounded-[7px] px-3 py-2 mb-8 transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold uppercase text-white">Cancel</span>
        </button>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-violet-500/10 rounded-3xl blur-2xl opacity-50"></div>
          
          <div className="relative bg-[#0b0f1a] border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="mb-10">
              <h1 className="text-3xl font-semibold text-white mb-2 tracking-tight">
                {isEdit ? "Edit Snippet" : "New Snippet"}
              </h1>
              <p className="text-slate-500 font-medium">
                {isEdit ? "Update your code block details" : "Add a fresh piece of code to your library"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-100/90 tracking-wider ml-1">
                    <Layout size={14} /> Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="E.g. Auth Login Hook"
                    className="w-full bg-black border border-white/20 text-white px-5 py-3.5 rounded-2xl focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all placeholder:text-slate-700"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-100/90 tracking-wider ml-1">
                    <Code size={14} /> Language
                  </label>
                  <select
                    name="language"
                    className="w-full bg-black border border-white/20 text-white px-5 py-3.5 rounded-2xl focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all appearance-none cursor-pointer"
                    value={formData.language}
                    onChange={handleChange}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="bash">Bash</option>
                    <option value="rust">Rust</option>
                    <option value="go">Go</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-100/90 tracking-wider ml-1">
                  <AlignLeft size={14} /> Description
                </label>
                <textarea
                  name="description"
                  rows="2"
                  placeholder="What does this code do?"
                  className="w-full bg-black border border-white/20 text-white px-5 py-3.5 rounded-2xl focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all placeholder:text-slate-700 resize-none"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-100/90 tracking-wider ml-1">
                  <Code size={14} /> Code Snippet
                </label>
                <textarea
                  name="code"
                  required
                  rows="10"
                  placeholder="Paste your code here..."
                  className="w-full bg-black border border-white/20 text-white px-6 py-5 rounded-2xl focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all font-mono text-sm placeholder:text-slate-700"
                  value={formData.code}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-100/90 tracking-wider ml-1">
                  <Tag size={14} /> Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  placeholder="react, auth, hook (comma separated)"
                  className="w-full bg-black border border-white/20 text-white px-5 py-3.5 rounded-2xl focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all placeholder:text-slate-700"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black cursor-pointer py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save size={20} />
                    <span>{isEdit ? "Update Snippet" : "Save Snippet"}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SnippetForm;
