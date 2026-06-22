import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Flame, 
  Code2, 
  SearchCode, 
  Database, 
  Activity, 
  Bell, 
  Menu, 
  X,
  Network,
  Cpu,
  TrendingUp,
  Sliders,
  Sparkles
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import ReadmeRoaster from './components/ReadmeRoaster';
import CodeClash from './components/CodeClash';
import LilInspect from './components/LilInspect';
import NetlifyPrimitivesDocs from './components/NetlifyPrimitivesDocs';

// Mock Interfaces
export interface BlobItem {
  key: string;
  store: 'roasts' | 'clashes' | 'inspects' | 'system';
  data: any;
  savedAt: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Shared simulation state of Netlify Blobs!
  const [blobs, setBlobs] = useState<BlobItem[]>([
    {
      key: "roast/facebook/react",
      store: "roasts",
      savedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      data: {
        owner: "facebook",
        repo: "react",
        roast: `### 🔥 The "What is this even for?" Award\nOh look, React! A tiny library for building user interfaces that somehow spawned an ecosystem larger than the enterprise banking system. Your README tagline says "React is a JavaScript library for building user interfaces." Boring. Sells it like it's a 2013 jQuery replacement. \n\n### 🔌 Dependency Bloat & Setup Sins\n"To run: npm install react react-dom." Simple, right? Until you realize you also need a bundler, a transpiler, a meta-framework, a styling solution, a state manager, and counseling. Your installation instructions hide the mountain of tooling needed to actually render a single 'Hello World' in production.\n\n### 🕵️ Missing Documentation Crimes\nWhere is the big red warning label saying: "Warning: Changing versions will break your entire project"? You've hidden the dark arts of Server Components and Hydration Sins in external docs instead of warning developers upfront.\n\n###  clown **The Buzzword Bingo Verdict**\nIt's a beautiful machine, but it's fueled by the blood of developers trying to understand why a hook re-renders 14 times. You claim "Component-Based," but it feels like "Config-Based suffering."\n\n### 🛡️ Actionable Recovery Plan\n* Add a massive, neon warning about hydration errors.\n* Put a single-command setup guide using Vite in the absolute top of the install section.\n* Acknowledge that people actually use frameworks now, and stop pretending raw react-dom is how apps are built.\n\n### 📊 Calibrated Rating\n**8/10** — It literally runs the web, but your README acts like it's a minor helper library. Show some pride, or some mercy!`,
        readmeLength: 12450
      }
    },
    {
      key: "clash/bubblesort-vs-quicksort",
      store: "clashes",
      savedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      data: {
        id: "clash_1720000000",
        title: "Bubble Sort vs Quick Sort in JS",
        language: "JavaScript",
        codeA: `function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
        codeB: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr[arr.length - 1];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
        evaluation: {
          winner: "B",
          clashSummary: "A classic battle of quadratic sorting O(N^2) against divide-and-conquer O(N log N). Quick Sort dominates, though the pivot selection is naive.",
          scores: {
            "A": { readability: 90, efficiency: 30, security: 80, overall: 67 },
            "B": { readability: 85, efficiency: 90, security: 75, overall: 83 }
          },
          judgement: {
            readabilityAnalysis: "Bubble Sort is highly readable and easy to implement. Quick Sort uses recursion which is clean but slightly harder to trace.",
            efficiencyAnalysis: "Bubble Sort executes in O(N^2) which is extremely bad for larger datasets. Quick Sort runs in O(N log N) on average, performing vastly faster.",
            securityAnalysis: "Quick Sort's naive pivot choice can suffer from stack overflow on sorted datasets (O(N^2) worst case) and out-of-memory. Bubble Sort is stable and safe but slow.",
            verdictDetail: "Snippet B (Quick Sort) is the clear winner due to O(N log N) efficiency, making it the only viable choice for non-trivial datasets. Bubble Sort is purely educational."
          }
        }
      }
    }
  ]);

  // Simulating live visitor traffic and netlify statistics
  const [visitorCount, setVisitorCount] = useState<number>(142);
  const [activeRuns, setActiveRuns] = useState<number>(0);

  useEffect(() => {
    const visitorInterval = setInterval(() => {
      setVisitorCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(120, prev + change);
      });
    }, 5000);
    return () => clearInterval(visitorInterval);
  }, []);

  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addBlob = (key: string, store: BlobItem['store'], data: any) => {
    const newBlob: BlobItem = {
      key,
      store,
      data,
      savedAt: new Date().toISOString()
    };
    setBlobs(prev => {
      // Remove duplicate if key exists
      const filtered = prev.filter(item => item.key !== key);
      return [newBlob, ...filtered];
    });
  };

  const deleteBlob = (key: string) => {
    setBlobs(prev => prev.filter(item => item.key !== key));
    addToast(`Object "${key}" removed from Netlify Blobs`, 'warning');
  };

  return (
    <div className="min-h-screen bg-devDark-950 text-devDark-100 flex flex-col font-sans selection:bg-netlify-teal selection:text-devDark-950">
      
      {/* Toast Notifications */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className={`p-4 rounded-xl shadow-2xl border flex items-center justify-between transition-all duration-300 transform translate-y-0 ${
              t.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100' :
              t.type === 'error' ? 'bg-rose-950/90 border-rose-500/50 text-rose-100' :
              t.type === 'warning' ? 'bg-amber-950/90 border-amber-500/50 text-amber-100' :
              'bg-devDark-900 border-devDark-700 text-devDark-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {t.type === 'success' ? '⚡' : t.type === 'error' ? '❌' : t.type === 'warning' ? '⚠️' : 'ℹ️'}
              </span>
              <p className="text-sm font-medium">{t.message}</p>
            </div>
            <button 
              onClick={() => removeToast(t.id)}
              className="text-devDark-400 hover:text-devDark-100 p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Main Header / Top Navbar */}
      <header className="bg-devDark-900/80 backdrop-blur-md border-b border-devDark-800 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-devDark-800 rounded-lg text-devDark-400 hover:text-devDark-100 transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-netlify-blue to-netlify-teal p-2 rounded-xl text-devDark-950 shadow-lg shadow-netlify-blue/20">
              <Sparkles className="w-5 h-5 fill-current animate-pulse-slow" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-devDark-300 bg-clip-text text-transparent">
                SparkDev <span className="text-netlify-teal font-extrabold">ToolsDock</span>
              </span>
              <span className="ml-2 text-xs bg-netlify-blue/20 text-netlify-teal font-semibold px-2 py-0.5 rounded border border-netlify-teal/20">
                PROD-GATEWAY-V2
              </span>
            </div>
          </div>
        </div>

        {/* Live Netlify System Indicators */}
        <div className="hidden md:flex items-center gap-6 text-xs text-devDark-400">
          <div className="flex items-center gap-2 bg-devDark-950 px-3 py-1.5 rounded-lg border border-devDark-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-netlify-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-netlify-teal"></span>
            </span>
            <span>Netlify Blobs: <span className="text-netlify-teal font-mono">{blobs.length} Keys</span></span>
          </div>

          <div className="flex items-center gap-2 bg-devDark-950 px-3 py-1.5 rounded-lg border border-devDark-800">
            <Network size={14} className="text-netlify-blue" />
            <span>AI Gateway: <span className="text-netlify-blue font-semibold">Idle</span></span>
          </div>

          <div className="flex items-center gap-2 bg-devDark-950 px-3 py-1.5 rounded-lg border border-devDark-800">
            <Cpu size={14} className={activeRuns > 0 ? "text-netlify-accent animate-spin" : "text-devDark-400"} />
            <span>Agent Runners: <span className={activeRuns > 0 ? "text-netlify-accent font-bold" : "font-semibold"}>{activeRuns} Running</span></span>
          </div>

          <div className="flex items-center gap-2 bg-devDark-950 px-3 py-1.5 rounded-lg border border-devDark-800">
            <Activity size={14} className="text-emerald-400 animate-pulse" />
            <span>Live Traffic: <span className="text-emerald-400 font-mono font-semibold">{visitorCount} active</span></span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`${
            sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
          } bg-devDark-900 border-r border-devDark-800 flex flex-col transition-all duration-300 overflow-hidden z-30`}
        >
          {/* Nav Items */}
          <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
            <div className="text-devDark-500 text-xs uppercase font-extrabold tracking-widest px-3 mb-2">Main Navigation</div>
            
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                currentTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-netlify-blue/20 to-devDark-800 border-l-4 border-netlify-blue text-white' 
                  : 'text-devDark-400 hover:text-white hover:bg-devDark-800/50'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard Hub</span>
            </button>

            <div className="text-devDark-500 text-xs uppercase font-extrabold tracking-widest px-3 mt-6 mb-2">The Dev Tools Suite</div>

            <button
              onClick={() => setCurrentTab('roaster')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                currentTab === 'roaster' 
                  ? 'bg-gradient-to-r from-netlify-accent/20 to-devDark-800 border-l-4 border-netlify-accent text-white' 
                  : 'text-devDark-400 hover:text-white hover:bg-devDark-800/50'
              }`}
            >
              <Flame size={18} className={currentTab === 'roaster' ? "text-netlify-accent" : ""} />
              <span>README Roaster</span>
              <span className="ml-auto text-[10px] bg-netlify-accent/20 text-netlify-accent px-1.5 py-0.5 rounded font-mono">HOT</span>
            </button>

            <button
              onClick={() => setCurrentTab('clash')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                currentTab === 'clash' 
                  ? 'bg-gradient-to-r from-netlify-blue/20 to-devDark-800 border-l-4 border-netlify-blue text-white' 
                  : 'text-devDark-400 hover:text-white hover:bg-devDark-800/50'
              }`}
            >
              <Code2 size={18} className={currentTab === 'clash' ? "text-netlify-blue" : ""} />
              <span>Code Clash Arena</span>
            </button>

            <button
              onClick={() => setCurrentTab('inspect')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                currentTab === 'inspect' 
                  ? 'bg-gradient-to-r from-netlify-teal/20 to-devDark-800 border-l-4 border-netlify-teal text-white' 
                  : 'text-devDark-400 hover:text-white hover:bg-devDark-800/50'
              }`}
            >
              <SearchCode size={18} className={currentTab === 'inspect' ? "text-netlify-teal" : ""} />
              <span>lilInspect Metadata</span>
            </button>

            <div className="text-devDark-500 text-xs uppercase font-extrabold tracking-widest px-3 mt-6 mb-2">Netlify Primitives</div>

            <button
              onClick={() => setCurrentTab('netlify')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                currentTab === 'netlify' 
                  ? 'bg-gradient-to-r from-netlify-teal/20 to-devDark-800 border-l-4 border-netlify-teal text-white' 
                  : 'text-devDark-400 hover:text-white hover:bg-devDark-800/50'
              }`}
            >
              <Database size={18} />
              <span>Blobs &amp; Gateway Explorer</span>
              <span className="ml-auto bg-devDark-800 text-devDark-300 text-xs px-2 py-0.5 rounded-full font-mono">{blobs.length}</span>
            </button>
          </nav>

          {/* Sidebar Footer Info */}
          <div className="p-4 border-t border-devDark-800 text-[11px] text-devDark-500 flex flex-col gap-1 bg-devDark-950/40">
            <div>Vite-React-TS Sandbox</div>
            <div className="flex items-center gap-1.5 text-netlify-teal">
              <Sliders size={12} />
              <span>Netlify CLI Emulation</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-devDark-950">
          <div className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
            {currentTab === 'dashboard' && (
              <Dashboard 
                setCurrentTab={setCurrentTab} 
                blobsCount={blobs.length} 
                visitorCount={visitorCount}
                recentBlobs={blobs.slice(0, 4)}
              />
            )}
            
            {currentTab === 'roaster' && (
              <ReadmeRoaster 
                addToast={addToast} 
                addBlob={addBlob} 
                blobs={blobs}
                setActiveRuns={setActiveRuns}
              />
            )}

            {currentTab === 'clash' && (
              <CodeClash 
                addToast={addToast} 
                addBlob={addBlob} 
                blobs={blobs}
                setActiveRuns={setActiveRuns}
              />
            )}

            {currentTab === 'inspect' && (
              <LilInspect 
                addToast={addToast} 
                addBlob={addBlob} 
                blobs={blobs}
                setActiveRuns={setActiveRuns}
              />
            )}

            {currentTab === 'netlify' && (
              <NetlifyPrimitivesDocs 
                blobs={blobs} 
                deleteBlob={deleteBlob} 
                addToast={addToast}
                visitorCount={visitorCount}
              />
            )}
          </div>

          {/* Footer */}
          <footer className="mt-auto py-6 border-t border-devDark-800 px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-devDark-500 gap-4">
            <div>
              &copy; 2026 SparkDev ToolsDock. Built with Vite, React, TypeScript, and Tailwind CSS.
            </div>
            <div className="flex items-center gap-4">
              <a href="#docs" onClick={() => setCurrentTab('netlify')} className="hover:text-devDark-300 transition-colors">Primitives Reference</a>
              <span>&bull;</span>
              <a href="#github" className="hover:text-devDark-300 transition-colors">Vite Template</a>
              <span>&bull;</span>
              <span className="text-netlify-teal">Powered by Netlify Agent Runners &amp; Blobs</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
