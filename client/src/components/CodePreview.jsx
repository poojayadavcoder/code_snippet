import React from "react";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

const bashCode = `#!/bin/bash
# Automated build and deploy sequence

echo "Starting build process..."
npm run build

if [ $? -eq 0 ]; then
  echo "Build successful. Syncing to S3..."
  aws s3 sync ./dist s3://my-production-bucket --delete
  echo "Invalidating CloudFront cache..."
  aws cloudfront create-invalidation --distribution-id E1XXXXXX --paths "/*"
else
  echo "Build failed. Aborting deploy."
  exit 1
fi`;

const CodePreview = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(bashCode);
    alert("Code copied to clipboard!");
  };

  return (
    <section className="py-24 px-6 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0b0f1a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl group">
          <div className="flex items-center justify-between px-6 py-4 bg-[#0d121f]/50 border-b border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                bash
              </span>
              <span className="text-xs font-semibold text-slate-300">
                Deploy Script
              </span>
            </div>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-[11px] bg-white/5 text-slate-300 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors border border-white/5 active:scale-95"
            >
              <Copy size={14} /> Copy
            </button>
          </div>
          <div className="p-8 font-mono text-[13px] leading-relaxed overflow-x-auto selection:bg-primary/30">
            <SyntaxHighlighter
              language="bash"
              style={nightOwl}
              customStyle={{
                background: "transparent",
                margin: 0,
                padding: 0,
                fontSize: "13px",
                lineHeight: "1.7",
              }}
            >
              {bashCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodePreview;
