import LandingNavbar from "./LandingNavbar";
import { Check,Search,Lock,List,} from "lucide-react";
import CodeSnippetUI from "./CodeSnippetUI";
import CodePreview from "./CodePreview";
import LandingFooter from "./LandingFooter";
import FeatureCard from "./FeatureCard";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-slate-100">
      <LandingNavbar />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="hero-glow"></div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8 flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-1.5 px-4 rounded-full text-xs font-semibold hover:border-white/20 transition-all cursor-default">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              A simple tool for developers
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold mb-6 max-w-4xl tracking-tight leading-tight">
            Save and organize
            <span className="gradient-text block mt-1">
              {" "}
              your code snippets easily.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed mx-auto">
            A simple tool that helps developers save, organize, and quickly find
            useful code snippets whenever they need them.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center">
            <a
              href="/signup"
              className="bg-black text-white border border-white/30 px-8 py-3.5 rounded-xl font-semibold transition-all text-center shadow-xl shadow-white/5 hover:bg-white/5 hover:border-white/50"
            >
              Start Saving Snippets
            </a>
          </div>

          <CodeSnippetUI />
        </div>
      </section>

      <section className="py-12 px-6 bg-[#020202]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Built for developers.</h2>
            <p className="text-slate-400">
              Save, organize, and instantly access your most useful code
              snippets in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon={Check}
              title="Syntax Highlighting"
              description="Clean and readable code with syntax highlighting powered by Prism.js. Supports many popular programming languages."
              tags={["javascript", "python", "java", "c++"]}
            />

            <FeatureCard
              icon={Search}
              title="Quick Search"
              description="Find your snippets instantly by searching titles, tags, or code content."
            />

            <FeatureCard
              icon={Lock}
              title="Secure Authentication"
              description="User authentication with protected routes ensures only you can access your saved snippets."
            />

            <FeatureCard
              icon={List}
              title="Organized Snippets"
              description="Create, edit, and manage your snippets easily with tags and descriptions."
            >
              <div className="mt-4 flex gap-2">
                <div className="h-2 w-12 bg-white/10 rounded"></div>
                <div className="h-2 w-8 bg-white/5 rounded"></div>
              </div>
            </FeatureCard>
          </div>
        </div>
      </section>

      <CodePreview />

      <LandingFooter />
    </div>
  );
};

export default Landing;
