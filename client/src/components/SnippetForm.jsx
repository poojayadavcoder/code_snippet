import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Code, Tag, AlignLeft, Layout } from "lucide-react";
import api from "../../lib/api";
import Navbar from "./Navbar";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchSnippet = async (id) => {
  const res = await api.get(`/snippets/${id}`);
  return res.data;
};

const SnippetForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    visibility: "public",
    language: "javascript",
    tags: "",
  });

 
  const { data } = useQuery({
    queryKey: ["snippet", id],
    queryFn: () => fetchSnippet(id),
    enabled: isEdit && !!id,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        description: data.description || "",
        code: data.code,
        visibility: data.visibility || "public",
        language: data.language || "javascript",
        tags: data.tags ? data.tags.join(", ") : "",
      });
    }
  }, [data]);

  
  const snippetMutation = useMutation({
    mutationFn: (payload) => {
      if (isEdit) {
        return api.put(`/snippets/${id}`, payload);
      } else {
        return api.post(`/snippets`, payload);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["snippets"]);

      navigate(isEdit ? `/snippet/${id}` : "/dashboard");
    },

    onError: () => {
      alert("Failed to save snippet.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    snippetMutation.mutate(payload);
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
          className="flex items-center gap-2 text-slate-500 hover:text-white bg-black border border-white/30 rounded-[7px] px-3 py-2 mb-8"
        >
          <ChevronLeft size={20} />
          <span className="text-sm font-semibold uppercase text-white">
            Cancel
          </span>
        </button>

        <div className="bg-[#0b0f1a] border border-white/10 rounded-3xl p-8 md:p-12">
          <h1 className="text-3xl font-semibold text-white mb-2">
            {isEdit ? "Edit Snippet" : "New Snippet"}
          </h1>

          <p className="text-slate-500 mb-10">
            {isEdit
              ? "Update your code block details"
              : "Add a fresh piece of code to your library"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* TITLE */}
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full bg-black border border-white/20 text-white px-5 py-3 rounded-2xl"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <select
              name="language"
              className="w-full bg-black border border-white/20 text-white px-5 py-3 rounded-2xl"
              value={formData.language}
              onChange={handleChange}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="bash">Bash</option>
            </select>

            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              className="w-full bg-black border border-white/20 text-white px-5 py-3 rounded-2xl"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

            {/* DESCRIPTION */}
            <textarea
              name="description"
              rows="2"
              placeholder="Description"
              className="w-full bg-black border border-white/20 text-white px-5 py-3 rounded-2xl"
              value={formData.description}
              onChange={handleChange}
            />

            {/* CODE */}
            <textarea
              name="code"
              rows="10"
              placeholder="Code"
              className="w-full bg-black border border-white/20 text-white px-5 py-3 rounded-2xl font-mono"
              value={formData.code}
              onChange={handleChange}
              required
            />

            {/* TAGS */}
            <input
              type="text"
              name="tags"
              placeholder="react, auth, hook"
              className="w-full bg-black border border-white/20 text-white px-5 py-3 rounded-2xl"
              value={formData.tags}
              onChange={handleChange}
            />

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={snippetMutation.isPending}
              className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {snippetMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  {isEdit ? "Update Snippet" : "Save Snippet"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SnippetForm;