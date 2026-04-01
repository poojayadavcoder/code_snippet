import { Outlet } from "react-router-dom";
import { useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { useAuth } from "../context/AuthContext";
import { Loader } from "lucide-react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
     const { loading } = useAuth();

  if (loading) {
    return (
      <div >
        <Loader/>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white relative">
      <ScrollToTop />
      <div className=" opacity-30 fixed inset-0 pointer-events-none"></div>
      <div className="relative z-10">
        <Outlet context={{ searchTerm, setSearchTerm }} />
      </div>
    </div>
  );
}

export default App;