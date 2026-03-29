import { Link } from "react-router-dom";
import { Terminal } from "lucide-react";
const LandingNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md border-b py-4 px-6 border-white/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-black border border-white/30 rounded-lg transition-colors">
            <Terminal className="text-white" size={20} />
          </div>
          <span className="text-[18px] font-semibold text-white">
            SnippetKit
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-200 hover:underline border border-white/30 px-2 py-1 rounded-[7px]"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium text-gray-200 hover:underline border border-white/30 px-2 py-1 rounded-[7px]"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
