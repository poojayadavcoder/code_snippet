import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SnippetList from "./components/SnippetList";
import SnippetForm from "./components/SnippetForm";
import SnippetDetail from "./components/SnippetDetail";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <div className="min-h-screen bg-dark-950 text-slate-100">
        <Navbar onSearch={setSearchTerm} />
        <main className="max-w-7xl mx-auto px-6 pb-20">
          <Routes>
            <Route path="/" element={<SnippetList searchTerm={searchTerm} />} />
            <Route path="/create" element={<SnippetForm />} />
            <Route path="/edit/:id" element={<SnippetForm isEdit={true} />} />
            <Route path="/snippet/:id" element={<SnippetDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;