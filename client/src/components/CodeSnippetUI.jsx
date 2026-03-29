import React, { useState } from "react";
import { Tab, Menu } from "@headlessui/react";
import { MoreVertical, Terminal, ChevronRight, Copy, Code, Tag, Trash2, Edit2, Share2, LayoutGrid, Database, Lock } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeString = `import { sign } from 'jsonwebtoken';

export const generateToken = (user: User) => {
  const payload = {
    id: user.id,
    role: user.role
  };

  return sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};`;

const Collections = [
  { name: "UI Components", icon: LayoutGrid },
  { name: "Database Queries", icon: Database },
  { name: "Authentication", icon: Lock, active: true },
];

const Tags = ["typescript", "nodejs", "react"];

export default function CodeSnippetUI() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-5xl group mx-auto px-4 mt-8">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-fuchsia-500/10 rounded-2xl blur-3xl opacity-50 group-hover:opacity-80 transition duration-1000"></div>

      <div className="relative bg-[#0b0f1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex min-h-[500px]">
        
        {/* Sidebar */}
        <div className="w-60 border-r border-white/5 bg-[#080808]/50 p-5 hidden md:block">
          <div className="flex items-center gap-2 mb-8 opacity-50">
             <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
             </div>
             <ChevronRight size={12} className="ml-1" />
             <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Workspace</span>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-500 mb-4">Collections</h4>
              <div className="space-y-1">
                {Collections.map((col) => (
                  <div
                    key={col.name}
                    className={`flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                      col.active
                        ? "bg-white/10 text-white font-medium"
                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <col.icon size={14} className={col.active ? "text-primary" : "text-slate-600"} />
                    {col.name}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-500 mb-4">Tags</h4>
              <div className="space-y-1">
                {Tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer group/tag"
                  >
                    <span className="text-primary/50 group-hover/tag:text-primary transition-colors">#</span>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#020617]/50">
          
          <Tab.Group>
            {/* Toolbar / Tabs */}
            <div className="flex items-center justify-between pl-4 pr-2 py-2 border-b border-white/5 bg-[#0d121f]/50">
              <Tab.List className="flex gap-1">
                <Tab className={({ selected }) => `
                  px-4 py-2 text-[11px] font-medium transition-all relative outline-none
                  ${selected ? "text-white" : "text-slate-500 hover:text-slate-300"}
                `}>
                  {({ selected }) => (
                    <>
                      <span className="flex items-center gap-2">
                         jwt-auth.ts
                      </span>
                      {selected && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"></div>}
                    </>
                  )}
                </Tab>
                <Tab className={({ selected }) => `
                  px-4 py-2 text-[11px] font-medium transition-all relative outline-none
                  ${selected ? "text-white" : "text-slate-500 hover:text-slate-300"}
                `}>
                  {({ selected }) => (
                    <>
                      <span className="flex items-center gap-2">
                         useAuth.tsx
                      </span>
                      {selected && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"></div>}
                    </>
                  )}
                </Tab>
              </Tab.List>

              <div className="flex items-center gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-semibold text-slate-300 hover:bg-white/10 transition-colors active:scale-95"
                >
                  <Copy size={12} /> {copied ? "Copied!" : "Copy Code"}
                </button>
                
                <Menu as="div" className="relative">
                  <Menu.Button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-slate-500 outline-none">
                    <MoreVertical size={16} />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl p-1.5 z-10 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button className={`${active ? "bg-white/10 text-white" : "text-slate-400"} group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs transition-colors`}>
                            <Share2 size={14} /> Copy snippet
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className={`${active ? "bg-white/10 text-white" : "text-slate-400"} group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs transition-colors`}>
                            <Edit2 size={14} /> Edit details
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className={`${active ? "bg-white/10 text-white" : "text-slate-400"} group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs transition-colors`}>
                             <ChevronRight size={14} className="rotate-90" /> Move to...
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="h-px bg-white/5 my-1 mx-1"></div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button className={`${active ? "bg-red-500/10 text-red-500" : "text-red-500/70"} group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs transition-colors`}>
                            <Trash2 size={14} /> Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            </div>

            {/* Code Body */}
            <Tab.Panels className="flex-1 overflow-auto">
              <Tab.Panel className="p-0 h-full">
                <div className="flex bg-black h-full">
                  <div className="w-12 pt-6 pb-6 text-right pr-4 text-[11px] font-mono text-slate-800 select-none border-r border-white/5 bg-[#020202]">
                    {[...Array(11)].map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <div className="flex-1 p-6 overflow-x-auto selection:bg-primary/30">
                    <SyntaxHighlighter
                      language="typescript"
                      style={nightOwl}
                      customStyle={{
                        background: "transparent",
                        margin: 0,
                        padding: 0,
                        fontSize: "13px",
                        lineHeight: "1.7",
                      }}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel className="p-10 text-center flex items-center justify-center h-full">
                 <p className="text-slate-600 italic text-sm">useAuth.tsx preview content...</p>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}