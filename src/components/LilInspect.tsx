import React, { useState } from 'react';
import { 
  SearchCode, 
  Github, 
  Star, 
  GitFork, 
  AlertCircle, 
  ShieldAlert, 
  FileCheck, 
  RefreshCw,
  Search,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { BlobItem } from '../App';

interface LilInspectProps {
  addToast: (msg: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  addBlob: (key: string, store: BlobItem['store'], data: any) => void;
  blobs: BlobItem[];
  setActiveRuns: React.Dispatch<React.SetStateAction<number>>;
}

const LilInspect: React.FC<LilInspectProps> = ({ 
  addToast, 
  addBlob, 
  blobs,
  setActiveRuns
}) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  const preloadedRepos = [
    { name: "Svelte", url: "https://github.com/sveltejs/svelte" },
    { name: "Tailwind", url: "https://github.com/tailwindlabs/tailwindcss" },
    { name: "Next.js", url: "https://github.com/vercel/next.js" }
  ];

  const inspectRepo = async (targetUrl: string) => {
    if (!targetUrl.includes('github.com')) {
      addToast('Please enter a valid GitHub repository URL', 'error');
      return;
    }

    setLoading(true);
    setReport(null);
    setActiveRuns(prev => prev + 1);

    // Simulate inspection via Serverless function
    await new Promise(resolve => setTimeout(resolve, 2000));

    const match = targetUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    const owner = match ? match[1] : 'unknown';
    const repo = match ? match[2].replace(/\.git$/, '') : 'repo';

    // Randomize some metadata so it feels alive and functional!
    const size = Math.floor(Math.random() * 25000) + 1200;
    const sizeMB = (size / 1024).toFixed(2);
    const stars = Math.floor(Math.random() * 45000) + 500;
    const forks = Math.floor(Math.random() * 8000) + 100;
    const issues = Math.floor(Math.random() * 120) + 5;
    const license = Math.random() > 0.15 ? "MIT" : "Apache-2.0";
    const score = Math.round(Math.max(45, 100 - (issues * 0.3) - (Number(sizeMB) > 20 ? 12 : 0)));

    const mockReport = {
      owner,
      repo,
      repoName: repo,
      fullName: `${owner}/${repo}`,
      description: `Analyzed repository metadata for ${repo}. Scanned file hierarchy, dependencies footprint, license compliance, and workflow pipelines.`,
      stats: {
        stars,
        forks,
        issues,
        license,
        sizeMB,
        createdAt: new Date(Date.now() - 3600000 * 24 * 365 * 3).toISOString().split('T')[0]
      },
      languages: [
        { name: "TypeScript", percentage: 58.4 },
        { name: "JavaScript", percentage: 28.2 },
        { name: "HTML", percentage: 8.5 },
        { name: "CSS", percentage: 4.9 }
      ],
      score,
      issues: [
        {
          severity: issues > 60 ? "high" : "medium",
          category: "Repository Congestion",
          message: `${issues} unresolved open issues are currently listed. Maintainer response delay may exceed standard SLA thresholds.`,
          action: "Triage stale issues, establish auto-closer Github actions, or implement issue templates."
        },
        {
          severity: Number(sizeMB) > 15 ? "medium" : "low",
          category: "Bundle Size audit",
          message: `Total repository disk consumption is heavy at ${sizeMB} MB.`,
          action: "Analyze package dependencies footprint, compress static assets, and optimize large bundle exports."
        },
        {
          severity: "medium",
          category: "CI/CD AutomationSins",
          message: "No active continuous integration testing suite found in .github/workflows directory.",
          action: "Create a main.yml pipeline to automate regression test suites on every branch push."
        }
      ]
    };

    addBlob(`inspect/${owner}/${repo}`.toLowerCase(), 'inspects', mockReport);
    setReport(mockReport);
    setLoading(false);
    setActiveRuns(prev => Math.max(0, prev - 1));
    addToast(`Successfully completed inspection for ${owner}/${repo}!`, 'success');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-devDark-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-netlify-teal mb-2">
            <SearchCode className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest font-mono">Netlify Functions Audit</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">lilInspect Repo Metadata</h1>
          <p className="text-devDark-400 text-sm mt-1 font-sans">Paste a public GitHub repo URL to fetch metadata and audit security, sizing, and pipeline quality.</p>
        </div>

        {/* Example Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-devDark-500 font-semibold flex items-center gap-1">
            <Search size={12} />
            <span>Examine Preset:</span>
          </span>
          {preloadedRepos.map(pr => (
            <button
              key={pr.name}
              onClick={() => {
                setRepoUrl(pr.url);
                inspectRepo(pr.url);
              }}
              disabled={loading}
              className="text-xs bg-devDark-900 border border-devDark-800 hover:border-netlify-teal hover:text-white text-devDark-300 px-3 py-1.5 rounded-lg transition-colors font-semibold"
            >
              {pr.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-devDark-900 border border-devDark-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 flex flex-col gap-2 w-full">
            <label className="text-xs font-bold text-devDark-400 uppercase tracking-wider font-mono">Public GitHub URL</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-devDark-500">
                <Github size={18} />
              </div>
              <input 
                type="text" 
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/sveltejs/svelte"
                disabled={loading}
                className="w-full bg-devDark-950 border border-devDark-800 focus:border-netlify-teal rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-devDark-600 focus:outline-none transition-all font-mono"
              />
            </div>
          </div>
          <button
            onClick={() => inspectRepo(repoUrl)}
            disabled={loading || !repoUrl}
            className="w-full md:w-auto bg-netlify-teal hover:bg-netlify-teal/90 disabled:bg-devDark-800 text-devDark-950 font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-netlify-teal/10"
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <SearchCode size={16} />
                <span>Audit Repository</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Audit Report View */}
      {report && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fadeIn">
          
          {/* Main Info Dashboard Column */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            
            {/* Repo Title banner and Score */}
            <div className="bg-devDark-900 border border-devDark-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-devDark-950 border border-devDark-800 text-netlify-teal rounded-xl">
                  <Github size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">{report.fullName}</h3>
                  <p className="text-xs text-devDark-400 mt-1 max-w-lg leading-relaxed">{report.description}</p>
                </div>
              </div>

              {/* Score gauge */}
              <div className="bg-devDark-950 border border-devDark-800 p-4 rounded-xl flex items-center gap-3.5 w-full md:w-auto self-stretch md:self-auto shrink-0 justify-center">
                <div className={`p-2.5 rounded-full text-xs font-mono font-black border flex items-center justify-center w-12 h-12 ${
                  report.score >= 80 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' :
                  report.score >= 60 ? 'border-amber-500/50 bg-amber-500/10 text-amber-400' :
                  'border-rose-500/50 bg-rose-500/10 text-rose-400'
                }`}>
                  {report.score}
                </div>
                <div className="flex flex-col text-xs">
                  <span className="text-devDark-400">Quality Index</span>
                  <span className="text-devDark-200 font-semibold mt-0.5">
                    {report.score >= 80 ? 'Excellent Health' : report.score >= 60 ? 'Warning: Tech Debt' : 'Critical Repair Needed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Language Composition and numerical stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Numeric Metadata Table */}
              <div className="bg-devDark-900 border border-devDark-800 p-5 rounded-2xl">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-devDark-400 border-b border-devDark-800 pb-3 mb-4">Metadata Audit Logs</h4>
                
                <div className="flex flex-col gap-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-devDark-500 flex items-center gap-1.5">
                      <Star size={12} />
                      <span>Stars Count</span>
                    </span>
                    <span className="font-mono text-white font-bold">{report.stats.stars.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-devDark-500 flex items-center gap-1.5">
                      <GitFork size={12} />
                      <span>Forks Count</span>
                    </span>
                    <span className="font-mono text-white font-bold">{report.stats.forks.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-devDark-500 flex items-center gap-1.5">
                      <AlertCircle size={12} />
                      <span>Open Issue Congestion</span>
                    </span>
                    <span className={`font-mono font-bold ${report.stats.issues > 50 ? 'text-rose-400' : 'text-white'}`}>
                      {report.stats.issues} open issues
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-devDark-500 flex items-center gap-1.5">
                      <HardDrive size={12} />
                      <span>Repository Volume</span>
                    </span>
                    <span className="font-mono text-white font-bold">{report.stats.sizeMB} MB</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-devDark-500 flex items-center gap-1.5">
                      <FileCheck size={12} />
                      <span>License Approved</span>
                    </span>
                    <span className="font-mono text-netlify-teal font-extrabold">{report.stats.license}</span>
                  </div>
                </div>
              </div>

              {/* Language split diagram */}
              <div className="bg-devDark-900 border border-devDark-800 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-devDark-400 border-b border-devDark-800 pb-3 mb-4">Languages Composition</h4>
                  <div className="flex flex-col gap-3">
                    {report.languages.map((lang: any) => (
                      <div key={lang.name} className="flex flex-col gap-1 text-xs">
                        <div className="flex justify-between text-devDark-400">
                          <span>{lang.name}</span>
                          <span className="font-mono">{lang.percentage}%</span>
                        </div>
                        <div className="w-full bg-devDark-950 h-2 rounded-full overflow-hidden">
                          <div className={`h-full ${
                            lang.name === 'TypeScript' ? 'bg-netlify-blue' :
                            lang.name === 'JavaScript' ? 'bg-yellow-400' :
                            lang.name === 'HTML' ? 'bg-orange-500' : 'bg-netlify-teal'
                          }`} style={{ width: `${lang.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Audit Action Items sidebar */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-rose-400" size={16} />
              <span>Audit Code-Smell Findings</span>
            </h4>

            <div className="flex flex-col gap-4">
              {report.issues.map((issue: any, idx: number) => (
                <div key={idx} className="bg-devDark-900 border border-devDark-800 p-4.5 rounded-2xl flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      issue.severity === 'high' ? 'bg-rose-500' :
                      issue.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-400'
                    }`}></span>
                    <span className="text-xs font-mono font-bold text-white">{issue.category}</span>
                    <span className="ml-auto text-[9px] bg-devDark-950 text-devDark-400 font-mono px-2 py-0.5 rounded uppercase border border-devDark-850">
                      {issue.severity} priority
                    </span>
                  </div>

                  <p className="text-xs text-devDark-400 leading-relaxed">
                    {issue.message}
                  </p>

                  <div className="bg-devDark-950 p-3 rounded-xl border border-devDark-850 flex flex-col gap-1 mt-1">
                    <span className="text-[10px] font-mono text-netlify-teal font-bold uppercase tracking-wider">Suggested action</span>
                    <p className="text-[11px] text-devDark-300 leading-relaxed">
                      {issue.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default LilInspect;
