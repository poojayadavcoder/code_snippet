import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="hero-glow opacity-30 fixed inset-0 pointer-events-none"></div>
      <div className="relative z-10">
        <Outlet context={{ searchTerm, setSearchTerm }} />
      </div>
    </div>
  );
}

export default App;