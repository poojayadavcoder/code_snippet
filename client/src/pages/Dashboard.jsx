import { useOutletContext } from 'react-router-dom';
import SnippetList from '../components/SnippetList';
import Navbar from '../components/Navbar';

function Dashboard() {
  const { searchTerm } = useOutletContext();

  return (
    <>
    <Navbar/>
    <div className="space-y-8 px-4">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Snippets</h1>
          <p className="text-slate-400 mt-1">Manage and organize your code collection</p>
        </div>
      </div>
      <SnippetList searchTerm={searchTerm || ""} />
    </div>
    </>
  )
}

export default Dashboard