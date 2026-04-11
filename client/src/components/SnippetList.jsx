import { AlertCircle, Inbox, Loader } from "lucide-react";
import SnippetCard from "./SnippetCard";
import api from "../../lib/api";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchSnippets = async () => {
  const res = await api.get("/snippets");
  return res.data;
};

const SnippetList = ({ searchTerm }) => {
  const queryClient = useQueryClient();

  const deleteSnippetMutation = useMutation({
  mutationFn: (id) => api.delete(`/snippets/${id}`),

  onSuccess: (_, id) => {
    queryClient.setQueryData(["snippets"], (old = []) =>
      old.filter((s) => s._id !== id)
    );
  },

  onError: () => {
    alert("Failed to delete snippet.");
  },
});

  const {
    data: snippets = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["snippets"],
    queryFn: fetchSnippets,
    staleTime: 60 * 1000, 
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      deleteSnippetMutation.mutate(id);
    }
  }
  const filteredSnippets = snippets.filter((snippet) => {
    const searchLow = searchTerm.toLowerCase();

    return (
      snippet.title.toLowerCase().includes(searchLow) ||
      (snippet.language &&
        snippet.language.toLowerCase().includes(searchLow)) ||
      (snippet.tags &&
        snippet.tags.some((tag) =>
          tag.toLowerCase().includes(searchLow)
        ))
    );
  });


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-500">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-10 bg-[#0b0f1a] border border-white/10 rounded-3xl text-center shadow-2xl">
        <AlertCircle className="mx-auto mb-6 text-red-500/50" size={48} />
        <p className="text-white font-bold mb-6">
          Failed to fetch snippets
        </p>

        <button
          onClick={refetch}
          className="bg-white text-black px-6 py-2.5 rounded-xl font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredSnippets.length === 0) {
    return (
      <div className="text-center mt-5">
        <Inbox className="mx-auto text-slate-800" size={80} />

        <p className="text-2xl font-semibold text-white mb-2">
          {searchTerm ? "No matches found" : "Your library is empty"}
        </p>

        <p className="text-slate-500 max-w-xs mx-auto">
          {searchTerm
            ? `No snippets found for "${searchTerm}"`
            : "Start building your personal code collection."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredSnippets.map((snippet) => (
        <SnippetCard
          key={snippet._id}
          snippet={snippet}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default SnippetList;