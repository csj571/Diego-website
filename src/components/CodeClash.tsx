import React, { useState } from 'react';
import { 
  Code2, 
  HelpCircle, 
  Play, 
  RefreshCw, 
  Trophy, 
  ShieldCheck, 
  Sparkles, 
  Database,
  UserCheck,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { BlobItem } from '../App';

interface CodeClashProps {
  addToast: (msg: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  addBlob: (key: string, store: BlobItem['store'], data: any) => void;
  blobs: BlobItem[];
  setActiveRuns: React.Dispatch<React.SetStateAction<number>>;
}

const CodeClash: React.FC<CodeClashProps> = ({ 
  addToast, 
  addBlob, 
  blobs,
  setActiveRuns
}) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('TypeScript');
  const [codeA, setCodeA] = useState('');
  const [codeB, setCodeB] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  const preloadedClashes = [
    {
      title: "Fibonacci Iterative vs Recursive",
      language: "TypeScript",
      codeA: `// Option A: Recursive with Memoization
const memo: Record<number, number> = {};
function fibMemo(n: number): number {
  if (n <= 1) return n;
  if (n in memo) return memo[n];
  memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
  return memo[n];
}`,
      codeB: `// Option B: Pure Loop Iterative (DP)
function fibIter(n: number): number {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}`
    },
    {
      title: "JSON Deep Clone Options",
      language: "JavaScript",
      codeA: `// Option A: JSON Parse Serialize Hack
function cloneJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}`,
      codeB: `// Option B: HTML5 structuredClone standard
function cloneStructured(obj) {
  return structuredClone(obj);
}`
    }
  ];

  const loadPreset = (preset: typeof preloadedClashes[0]) => {
    setTitle(preset.title);
    setLanguage(preset.language);
    setCodeA(preset.codeA);
    setCodeB(preset.codeB);
    setEvaluation(null);
  };

  const executeClash = async () => {
    if (!codeA || !codeB) {
      addToast('Please input code into both Snippet A and Snippet B editors.', 'error');
      return;
    }

    setLoading(true);
    setEvaluation(null);
    setActiveRuns(prev => prev + 1);

    // Simulate AI model calculation via Netlify AI Gateway
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Dynamic mock report scoring based on heuristics
    const scoreA = codeA.includes('for') || codeA.includes('while') ? 92 : 78;
    const scoreB = codeB.includes('structuredClone') ? 95 : 82;

    const mockReport = {
      winner: scoreB > scoreA ? "B" : "A",
      clashSummary: `An optimization battle comparing language-standard modern features against legacy algorithms. Snippet ${scoreB > scoreA ? "B" : "A"} provides superior resource utilization.`,
      scores: {
        "A": { readability: 88, efficiency: scoreA, security: 85, overall: Math.round((88 + scoreA + 85) / 3) },
        "B": { readability: 92, efficiency: scoreB, security: 90, overall: Math.round((92 + scoreB + 90) / 3) }
      },
      judgement: {
        readabilityAnalysis: "Snippet B uses modern, clean keyword spacing and descriptive naming conventions. Snippet A is highly compact but sacrifices a small amount of context.",
        efficiencyAnalysis: `Snippet B executes with improved memory management and reduced call-stack depth compared to Snippet A. Efficiency index registers a robust ${scoreB} points.`,
        securityAnalysis: "Both options avoid prototype pollution vectors, but Snippet B mitigates potential maximum callstack limits on extreme input sizes, which makes it safer.",
        verdictDetail: `After rigorous analysis by the Code Clash Engine, Snippet ${scoreB > scoreA ? "B" : "A"} is declared the winner. It leverages superior modern design patterns that reduce CPU utilization and scale elegantly.`
      }
    };

    const payload = {
      id: `clash_${Date.now()}`,
      title: title || "Algorithmic Duel",
      language,
      codeA,
      codeB,
      evaluation: mockReport,
      clashedAt: new Date().toISOString()
    };

    addBlob(`clash/${(title || "clash").replace(/\s+/g, "-").toLowerCase()}`, 'clashes', payload);
    setEvaluation(mockReport);
    setLoading(false);
    setActiveRuns(prev => Math.max(0, prev - 1));
    addToast(`Clash evaluation completed. Snippet ${mockReport.winner} wins!`, 'success');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-devDark-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-netlify-blue mb-2">
            <Code2 className="w-5 h-5 animate-pulse-slow" />
            <span className="text-xs font-bold uppercase tracking-widest font-mono">Netlify AI Gateway Diagnostics</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Code Clash Arena</h1>
          <p className="text-devDark-400 text-sm mt-1">Submit two code implementations solving the same task. AI evaluates the performance winner.</p>
        </div>

        {/* Presets Grid */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-devDark-500 font-semibold flex items-center gap-1">
            <Award size={12} />
            <span>Select a Preset:</span>
          </span>
          {preloadedClashes.map(preset => (
            <button
              key={preset.title}
              onClick={() => loadPreset(preset)}
              className="text-xs bg-devDark-900 border border-devDark-800 hover:border-netlify-blue hover:text-white text-devDark-300 px-3 py-1.5 rounded-lg transition-colors font-semibold"
            >
              {preset.title.split(' ')[0]} Duel
            </button>
          ))}
        </div>
      </div>

      {/* Editor Controls */}
      <div className="bg-devDark-900 border border-devDark-800 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-devDark-400 uppercase tracking-wider font-mono">Battle Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Recursion vs Iterative Loops"
              className="w-full bg-devDark-950 border border-devDark-800 focus:border-netlify-blue rounded-xl py-2 px-4 text-sm text-white focus:outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-devDark-400 uppercase tracking-wider font-mono">Syntax Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-devDark-950 border border-devDark-800 focus:border-netlify-blue rounded-xl py-2 px-4 text-sm text-white focus:outline-none transition-all cursor-pointer"
            >
              <option value="TypeScript">TypeScript</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Go">Go (Golang)</option>
            </select>
          </div>
        </div>

        <button
          onClick={executeClash}
          disabled={loading || !codeA || !codeB}
          className="w-full md:w-auto bg-netlify-blue hover:bg-netlify-blue/90 disabled:bg-devDark-800 text-white font-bold py-3.5 px-10 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-netlify-blue/15 self-end"
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              <span>Analyzing snippets...</span>
            </>
          ) : (
            <>
              <Play size={16} fill="currentColor" />
              <span>Clash Snippets</span>
            </>
          )}
        </button>
      </div>

      {/* Side by side code editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor A */}
        <div className="bg-devDark-900 border border-devDark-800 rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-devDark-400 bg-devDark-950 px-2.5 py-1 rounded border border-devDark-800">
              [SNIPPET A]
            </span>
            <span className="text-xs text-devDark-500">Option A Code implementation</span>
          </div>
          <textarea
            value={codeA}
            onChange={(e) => setCodeA(e.target.value)}
            placeholder="// Paste your Code implementation A here..."
            className="w-full h-64 bg-devDark-950 border border-devDark-800 focus:border-netlify-blue rounded-xl p-4 font-mono text-xs text-white placeholder-devDark-600 focus:outline-none transition-all resize-y"
          />
        </div>

        {/* Editor B */}
        <div className="bg-devDark-900 border border-devDark-800 rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-devDark-400 bg-devDark-950 px-2.5 py-1 rounded border border-devDark-800">
              [SNIPPET B]
            </span>
            <span className="text-xs text-devDark-500">Option B Code implementation</span>
          </div>
          <textarea
            value={codeB}
            onChange={(e) => setCodeB(e.target.value)}
            placeholder="// Paste your Code implementation B here..."
            className="w-full h-64 bg-devDark-950 border border-devDark-800 focus:border-netlify-blue rounded-xl p-4 font-mono text-xs text-white placeholder-devDark-600 focus:outline-none transition-all resize-y"
          />
        </div>
      </div>

      {/* Clash Winner Analysis Dashboard */}
      {evaluation && (
        <div className="bg-devDark-900 border border-devDark-800 rounded-3xl p-6 md:p-8 flex flex-col gap-6 animate-fadeIn">
          
          {/* Winner Trophy Banner */}
          <div className="bg-gradient-to-tr from-devDark-950 via-devDark-900 to-netlify-blue/5 border border-devDark-850 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-2xl shadow-xl shadow-yellow-500/5">
                <Trophy size={32} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-netlify-blue uppercase tracking-wider">Judgement Result</span>
                <h3 className="text-xl font-extrabold text-white">
                  Snippet {evaluation.winner} Wins the Clash!
                </h3>
                <p className="text-xs text-devDark-400 max-w-xl mt-1 leading-relaxed">
                  {evaluation.clashSummary}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-devDark-950 p-4 rounded-xl border border-devDark-800">
              <Award className="text-yellow-500" />
              <div className="flex flex-col text-xs">
                <span className="text-devDark-400">Winning Score</span>
                <span className="text-lg font-mono font-black text-white">
                  {evaluation.scores[evaluation.winner].overall}/100
                </span>
              </div>
            </div>
          </div>

          {/* Scores Matrix Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Snippet A Metrics */}
            <div className={`p-5 rounded-2xl border ${evaluation.winner === 'A' ? 'border-netlify-blue bg-netlify-blue/5' : 'border-devDark-800 bg-devDark-950/40'}`}>
              <h4 className="font-bold text-white mb-4 flex items-center justify-between text-sm">
                <span>Snippet A Performance Metrics</span>
                {evaluation.winner === 'A' && <span className="text-xs font-mono text-netlify-blue font-bold uppercase bg-netlify-blue/10 px-2 py-0.5 rounded border border-netlify-blue/20">WINNER</span>}
              </h4>
              <div className="flex flex-col gap-4">
                {Object.entries(evaluation.scores.A).map(([metric, val]: any) => (
                  <div key={metric} className="flex flex-col gap-1 text-xs">
                    <div className="flex justify-between text-devDark-400 font-medium">
                      <span className="capitalize">{metric} score</span>
                      <span className="font-mono font-bold text-white">{val}</span>
                    </div>
                    <div className="w-full bg-devDark-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-netlify-blue h-full" style={{ width: `${val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Snippet B Metrics */}
            <div className={`p-5 rounded-2xl border ${evaluation.winner === 'B' ? 'border-netlify-blue bg-netlify-blue/5' : 'border-devDark-800 bg-devDark-950/40'}`}>
              <h4 className="font-bold text-white mb-4 flex items-center justify-between text-sm">
                <span>Snippet B Performance Metrics</span>
                {evaluation.winner === 'B' && <span className="text-xs font-mono text-netlify-blue font-bold uppercase bg-netlify-blue/10 px-2 py-0.5 rounded border border-netlify-blue/20">WINNER</span>}
              </h4>
              <div className="flex flex-col gap-4">
                {Object.entries(evaluation.scores.B).map(([metric, val]: any) => (
                  <div key={metric} className="flex flex-col gap-1 text-xs">
                    <div className="flex justify-between text-devDark-400 font-medium">
                      <span className="capitalize">{metric} score</span>
                      <span className="font-mono font-bold text-white">{val}</span>
                    </div>
                    <div className="w-full bg-devDark-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-netlify-teal h-full" style={{ width: `${val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Judges Detailed breakdown report */}
          <div className="flex flex-col gap-4 border-t border-devDark-800 pt-6">
            <h4 className="font-bold text-white text-sm">Detailed Judges Reports</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-devDark-950 p-4 rounded-xl border border-devDark-850">
                <span className="text-xs font-mono text-netlify-blue font-semibold uppercase flex items-center gap-1.5 mb-2">
                  <UserCheck size={12} />
                  <span>Readability Audit</span>
                </span>
                <p className="text-xs text-devDark-400 leading-relaxed">
                  {evaluation.judgement.readabilityAnalysis}
                </p>
              </div>

              <div className="bg-devDark-950 p-4 rounded-xl border border-devDark-850">
                <span className="text-xs font-mono text-netlify-teal font-semibold uppercase flex items-center gap-1.5 mb-2">
                  <TrendingUp size={12} />
                  <span>Efficiency &amp; Speed</span>
                </span>
                <p className="text-xs text-devDark-400 leading-relaxed">
                  {evaluation.judgement.efficiencyAnalysis}
                </p>
              </div>

              <div className="bg-devDark-950 p-4 rounded-xl border border-devDark-850">
                <span className="text-xs font-mono text-red-400 font-semibold uppercase flex items-center gap-1.5 mb-2">
                  <ShieldCheck size={12} />
                  <span>Security &amp; Errors</span>
                </span>
                <p className="text-xs text-devDark-400 leading-relaxed">
                  {evaluation.judgement.securityAnalysis}
                </p>
              </div>
            </div>

            <div className="bg-devDark-950 p-4 rounded-xl border border-devDark-850 mt-2">
              <span className="text-xs font-bold text-white uppercase font-mono block mb-2">Technical Verdict Detail</span>
              <p className="text-xs text-devDark-300 leading-relaxed">
                {evaluation.judgement.verdictDetail}
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default CodeClash;
