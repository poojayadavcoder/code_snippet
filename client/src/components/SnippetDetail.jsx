import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Terminal, Clock, Tag, ChevronLeft, Copy, Edit2, Trash2 } from 'lucide-react';
import api from '../../lib/api';
import Navbar from './Navbar';

const SnippetDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [snippet, setSnippet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await api.get(`/snippets/${id}`);
                setSnippet(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSnippet();
    }, [id]);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = async () => {
        if (window.confirm("Delete this snippet?")) {
            try {
                await api.delete(`/snippets/${id}`);
                navigate('/dashboard');
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!snippet) return (
        <div className="min-h-screen flex items-center justify-center text-slate-400">
            Snippet not found.
        </div>
    );

    return (
        <>
            <Navbar onSearch={() => {}} />
            <div className="max-w-5xl mx-auto px-6 py-12">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-white bg-black border border-white/30 rounded-[7px] px-3 py-2 mb-8 transition-colors group"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-white">Back</span>
                </button>

                <div className="bg-gradient-to-t from-[#0b0f1a] via-[#111729]/50 to-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-8">
                    <div className="p-8 md:p-12 border-b border-white/5">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{snippet.language}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                        <Clock size={12} />
                                        <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">{snippet.title}</h1>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate(`/edit/${snippet._id}`)}
                                    className="p-3 bg-white/5 cursor-pointer hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl border border-white/10 transition-all active:scale-95"
                                >
                                    <Edit2 size={20} />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="p-3 bg-white/5 cursor-pointer hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-2xl border border-white/10 transition-all active:scale-95"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        <p className="text-slate-400 text-lg leading-relaxed max-w-3xl font-medium">{snippet.description}</p>

                        <div className="flex flex-wrap gap-2 mt-8">
                           {snippet.tags.map((tag, i) => (
                               <span key={i} className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-white/5 text-slate-500 rounded-lg border border-white/5">
                                   #{tag}
                               </span>
                           ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute top-6 right-6 z-10">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-black/50 backdrop-blur-md border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-black/80 transition-all active:scale-95"
                            >
                                <Copy size={16} />
                                {copied ? "COPIED" : "COPY CODE"}
                            </button>
                        </div>
                        <div className="bg-[#020617] p-8 md:p-12 font-mono text-[14px]">
                            <SyntaxHighlighter
                                language={snippet.language.toLowerCase()}
                                style={nightOwl}
                                customStyle={{
                                    background: 'transparent',
                                    margin: 0,
                                    padding: 0,
                                    lineHeight: '1.8'
                                }}
                            >
                                {snippet.code}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SnippetDetail;
