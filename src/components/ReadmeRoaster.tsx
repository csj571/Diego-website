import React, { useState } from 'react';
import { 
  Flame, 
  Terminal, 
  Github, 
  HelpCircle, 
  AlertCircle,
  Copy, 
  Sparkles,
  RefreshCw,
  Clock,
  User,
  HeartCrack
} from 'lucide-react';
import { BlobItem } from '../App';

interface ReadmeRoasterProps {
  addToast: (msg: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  addBlob: (key: string, store: BlobItem['store'], data: any) => void;
  blobs: BlobItem[];
  setActiveRuns: React.Dispatch<React.SetStateAction<number>>;
}

const ReadmeRoaster: React.FC<ReadmeRoasterProps> = ({ 
  addToast, 
  addBlob, 
  blobs,
  setActiveRuns
}) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [currentRoast, setCurrentRoast] = useState<any>(null);

  // Pre-loaded roasted examples
  const exampleRepos = [
    { name: "React", url: "https://github.com/facebook/react" },
    { name: "Vue CLI", url: "https://github.com/vuejs/vue-cli" },
    { name: "TensorFlow", url: "https://github.com/tensorflow/tensorflow" }
  ];

  const runRoast = async (targetUrl: string) => {
    if (!targetUrl.includes('github.com')) {
      addToast('Please enter a valid GitHub repository URL', 'error');
      return;
    }

    setLoading(true);
    setCurrentRoast(null);
    setLogs([]);
    setActiveRuns(prev => prev + 1);

    const match = targetUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    const owner = match ? match[1] : 'unknown';
    const repo = match ? match[2].replace(/\.git$/, '') : 'repo';

    // Sequence of mock logs mimicking Netlify Agent Runner + functions + Blobs
    const logSequence = [
      `[Agent Runner] 🚀 Initiating container execution environment (Runner ID: netlify-ar-${Math.floor(Math.random()*9000)+1000})`,
      `[Agent Runner] 📂 Pulling git repository reference: ${owner}/${repo}`,
      `[Agent Runner] 🔍 Fetching README.md file structure...`,
      `[Agent Runner] 📄 README.md fetched successfully (${Math.floor(Math.random()*8000)+2000} bytes found)`,
      `[Serverless Function] 🔑 Requesting Netlify AI Gateway v1 proxy to Anthropic/Claude (Zero-API-Key Config)...`,
      `[AI Gateway] 🧠 Prompt successfully compiled. Waiting for model inference (gpt-4o / Claude 3.5 Sonnet parallel)...`,
      `[AI Gateway] 💬 Processing tokens... (Analyzing tags, setup instructions, badges, and marketing buzzwords)`,
      `[Serverless Function] 💾 AI payload generated. Writing output to Netlify Blobs [Key: "roast/${owner}/${repo}"]...`,
      `[Netlify Blobs] ✅ Key set successfully. Consistency model checked (last write wins).`,
      `[Agent Runner] 🎉 Task completed successfully in 3.42s. Container decommissioned.`
    ];

    // Simulating console log streaming
    for (let i = 0; i < logSequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));
      setLogs(prev => [...prev, logSequence[i]]);
      setActiveStep(i);
    }

    // Roast Markdown Mock generator if API is not locally running
    const mockRoast = `### 🔥 The "What is this even for?" Award
Oh, **${repo}**! Yet another piece of software that claims to "revolutionize developer workflows." Your README tagline sells this repo as a "frictionless, highly-extensible paradigm shift." Translation: you wrote a 100-line wrapper around an NPM package that already had 50 million downloads. We still don't know what it actually does.

### 🔌 Dependency Bloat & Setup Sins
"Getting started is easy! Just run five different global installations, configure a YAML file, set up three environment variables, sign up for a third-party token, and pray." If your installation guide is longer than a CVS receipt, it is not "frictionless." Your setup section is an open invitation to dependency hell.

### 🕵️ Missing Documentation Crimes
Where are the production guidelines? You've got 40 shiny SVG shields/badges indicating your build is "passing" (on your machine), but no troubleshooting guide or reference API layout. If a developer runs into an unhandled exception, their only hope is searching through closed issues from 2023.

### 🤡 The Buzzword Bingo Verdict
Your README uses "lightweight," "performant," and "AI-powered" so many times it reads like a tech venture pitch deck. You chose TypeScript but have "any" types sprinkled like confetti. The buzzwords are doing heavy lifting to hide architectural debt.

### 🛡️ Actionable Recovery Plan
* **Trash the marketing jargon:** Rewrite your tagline in one sentence explaining *exactly* what problem this solves.
* **Streamline installation:** Provide a single \`npx\` or \`npm run install\` command that sets up sensible defaults.
* **Document actual APIs:** Remove the badge wallpaper and add a clear "API Reference" section with expected inputs and outputs.
* **Add a quickstart example:** Include a 5-line code snippet showing immediate usage.

### 📊 Calibrated Rating
**4/10** — It has potential, but right now the documentation is a maze of inflated promises. Put down the buzzword dictionary, clean up the setup guide, and give us some real examples!`;

    const payload = {
      owner,
      repo,
      roast: mockRoast,
      roastedAt: new Date().toISOString(),
      readmeLength: Math.floor(Math.random() * 12000) + 1500
    };

    // Save in shared Blobs store
    addBlob(`roast/${owner}/${repo}`.toLowerCase(), 'roasts', payload);
    setCurrentRoast(payload);
    setLoading(false);
    setActiveRuns(prev => Math.max(0, prev - 1));
    addToast(`Successfully roasted ${owner}/${repo}! Stored in Blobs.`, 'success');
  };

  const copyRoast = () => {
    if (currentRoast) {
      navigator.clipboard.writeText(currentRoast.roast);
      addToast('Roast markdown copied to clipboard!', 'success');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-devDark-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-netlify-accent mb-2">
            <Flame className="w-5 h-5 fill-current animate-bounce-slow" />
            <span className="text-xs font-bold uppercase tracking-widest font-mono">Netlify AI Agent Runner Demo</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">README Roaster</h1>
          <p className="text-devDark-400 text-sm mt-1">Paste a public GitHub repo URL and let the Agent Runner grill its documentation.</p>
        </div>

        {/* Example Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-devDark-500 font-semibold flex items-center gap-1">
            <HelpCircle size={12} />
            <span>Try an example:</span>
          </span>
          {exampleRepos.map(ex => (
            <button
              key={ex.name}
              onClick={() => {
                setRepoUrl(ex.url);
                runRoast(ex.url);
              }}
              disabled={loading}
              className="text-xs bg-devDark-900 border border-devDark-800 hover:border-netlify-accent hover:text-white text-devDark-300 px-3 py-1.5 rounded-lg transition-colors font-semibold"
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-devDark-900 border border-devDark-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 flex flex-col gap-2 w-full">
            <label className="text-xs font-bold text-devDark-400 uppercase tracking-wider font-mono">Public GitHub Repository URL</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-devDark-500">
                <Github size={18} />
              </div>
              <input 
                type="text" 
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/owner/repository"
                disabled={loading}
                className="w-full bg-devDark-950 border border-devDark-800 focus:border-netlify-accent rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-devDark-600 focus:outline-none transition-all font-mono"
              />
            </div>
          </div>
          <button
            onClick={() => runRoast(repoUrl)}
            disabled={loading || !repoUrl}
            className="w-full md:w-auto bg-netlify-accent hover:bg-netlify-accent/90 disabled:bg-devDark-800 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-netlify-accent/15"
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Roasting...</span>
              </>
            ) : (
              <>
                <Flame size={16} className="fill-current" />
                <span>Roast README</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main split: Runner Terminal and Markdown Roast Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Terminal log panel */}
        <div className="bg-devDark-900 border border-devDark-800 rounded-2xl overflow-hidden shadow-2xl h-[450px] flex flex-col">
          <div className="bg-devDark-950 px-4 py-3 border-b border-devDark-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-netlify-teal" />
              <span className="text-xs font-bold text-devDark-300 font-mono">Agent Runner Stream logs</span>
            </div>
            <span className="text-[10px] text-devDark-500 font-mono uppercase bg-devDark-900 px-2 py-0.5 rounded">Container: Ubuntu-Node20</span>
          </div>
          
          <div className="flex-1 p-5 font-mono text-xs overflow-y-auto flex flex-col gap-2.5 bg-devDark-950 text-devDark-300">
            {logs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-devDark-600 border border-dashed border-devDark-900 rounded-xl">
                <Terminal size={32} className="mb-2 opacity-30" />
                <p>Console is silent. Enter a GitHub repo URL and click Roast to initialize the Netlify Agent container runner.</p>
              </div>
            ) : (
              <>
                {logs.map((log, index) => {
                  let logClass = "text-devDark-400";
                  if (log.includes('[Agent Runner]')) logClass = "text-netlify-teal font-semibold";
                  if (log.includes('[AI Gateway]')) logClass = "text-netlify-blue font-semibold";
                  if (log.includes('[Serverless Function]')) logClass = "text-purple-400";
                  if (log.includes('✅') || log.includes('🎉')) logClass = "text-emerald-400 font-semibold";
                  
                  return (
                    <div 
                      key={index} 
                      className={`leading-relaxed border-l-2 pl-3 ${logClass} ${
                        index === activeStep ? 'border-netlify-teal animate-pulse' : 'border-devDark-800'
                      }`}
                    >
                      <span className="text-devDark-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                      {log}
                    </div>
                  );
                })}
                {loading && (
                  <div className="flex items-center gap-2 text-netlify-accent animate-pulse pl-3 border-l-2 border-netlify-accent">
                    <span className="text-devDark-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    <span>Working...</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Roasted Markdown result */}
        <div className="bg-devDark-900 border border-devDark-800 rounded-2xl overflow-hidden shadow-2xl h-[450px] flex flex-col">
          <div className="bg-devDark-950 px-5 py-3 border-b border-devDark-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame size={14} className="text-netlify-accent" />
              <span className="text-xs font-bold text-devDark-300 font-mono">Roast Output Markdown</span>
            </div>
            {currentRoast && (
              <button 
                onClick={copyRoast}
                className="text-xs text-devDark-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Copy size={12} />
                <span>Copy markdown</span>
              </button>
            )}
          </div>

          <div className="flex-1 p-6 overflow-y-auto prose prose-invert max-w-none text-sm leading-relaxed text-devDark-200">
            {!currentRoast ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-devDark-500 border border-dashed border-devDark-800 rounded-xl bg-devDark-950/20 p-6">
                <HeartCrack size={32} className="text-devDark-600 mb-2" />
                <p>No roast document loaded. Trigger a roast above or load an existing repo to read the critique.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-devDark-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Github size={14} className="text-devDark-400" />
                    <span className="font-semibold text-white text-xs font-mono">{currentRoast.owner}/{currentRoast.repo}</span>
                  </div>
                  <span className="text-[10px] bg-netlify-teal/10 text-netlify-teal px-2 py-0.5 rounded border border-netlify-teal/20 font-mono">
                    Fetched from Blobs
                  </span>
                </div>

                {/* Render Roasted markdown segments */}
                <div className="flex flex-col gap-6" dangerouslySetInnerHTML={{
                  __html: currentRoast.roast
                    .replace(/### (.*?)\n/g, '<h3 class="text-white font-bold text-base border-l-2 border-netlify-teal pl-3 mt-4 mb-2">$1</h3>')
                    .replace(/\*\* (.*?)\n/g, '<span class="text-white font-black text-sm">$1</span>')
                    .replace(/\* (.*?)\n/g, '<li class="list-disc ml-5 text-devDark-300 mt-1">$1</li>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                }}>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReadmeRoaster;
