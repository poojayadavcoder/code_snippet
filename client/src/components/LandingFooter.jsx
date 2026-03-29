import React from "react";
import { Terminal } from "lucide-react";

const LandingFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <Terminal className="text-white" size={20} />
          <span className="text-sm font-semibold text-white tracking-wider">
            SnippetKit
          </span>
        </div>

        <p className="text-[10px] text-slate-600">
          © {year} SnippetKit ❤️ .
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
