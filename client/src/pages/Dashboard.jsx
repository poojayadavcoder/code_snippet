import { useOutletContext, Link } from 'react-router-dom';
import SnippetList from '../components/SnippetList';
import Navbar from '../components/Navbar';

function Dashboard() {
  const { searchTerm, setSearchTerm } = useOutletContext();

  return (
    <div className="min-h-screen bg-black">
      <Navbar onSearch={setSearchTerm} />
      
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <SnippetList searchTerm={searchTerm || ""} />
      </main>
    </div>
  );
}

export default Dashboard;