import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
      <div>
        {/* <h1 className="text-3xl font-bold">Hello</h1> */}
          <Outlet context={{ searchTerm }} />
      </div>
  );
}

export default App;