import React from 'react';
import { 
  Flame, 
  Code2, 
  SearchCode, 
  ArrowUpRight, 
  Database, 
  Server, 
  Compass, 
  Zap, 
  Clock, 
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { BlobItem } from '../App';

interface DashboardProps {
  setCurrentTab: (tab: string) => void;
  blobsCount: number;
  visitorCount: number;
  recentBlobs: BlobItem[];
}

const Dashboard: React.FC<DashboardProps> = ({ 
  setCurrentTab, 
  blobsCount, 
  visitorCount, 
  recentBlobs 
}) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome / Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-netlify-dark via-devDark-900 to-devDark-950 p-8 md:p-10 border border-devDark-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-netlify-blue/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-netlify-teal/5 blur-3xl"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-netlify-teal/10 border border-netlify-teal/20 text-netlify-teal text-xs font-semibold uppercase tracking-wider mb-4 animate-pulse">
            <Zap size={12} />
            <span>Summer Dev Tools Launch</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            The Ultimate Developer <br />
            <span className="bg-gradient-to-r from-netlify-teal via-netlify-blue to-violet-400 bg-clip-text text-transparent">
              Platform &amp; Diagnostics Dock
            </span>
          </h1>

          <p className="text-devDark-400 text-sm md:text-base leading-relaxed mb-6">
            Welcome to <span className="text-white font-semibold">SparkDev ToolsDock</span>, a fully-featured suite of developer utilities designed to critique, evaluate, and inspect your codebases. Inspired by Gerrit's README Roaster, Monteiro's Code Clash, and Kimball's lilInspect, and built on top of high-performance Netlify Primitives.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setCurrentTab('roaster')}
              className="px-5 py-3 rounded-xl bg-netlify-accent hover:bg-netlify-accent/90 text-white text-sm font-semibold shadow-lg shadow-netlify-accent/15 flex items-center gap-2 transition-all"
            >
              <Flame size={16} />
              <span>Roast a README</span>
            </button>
            <button
              onClick={() => setCurrentTab('netlify')}
              className="px-5 py-3 rounded-xl bg-devDark-800 hover:bg-devDark-700 text-devDark-200 hover:text-white text-sm font-semibold border border-devDark-700 flex items-center gap-2 transition-all"
            >
              <Database size={16} />
              <span>Inspect Netlify Blobs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Numerical Stats Dashboard Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-devDark-900 border border-devDark-800 p-5 rounded-2xl flex flex-col gap-1 relative overflow-hidden">
          <div className="absolute right-4 top-4 text-netlify-teal/10">
            <Flame size={40} className="fill-current" />
          </div>
          <span className="text-devDark-500 text-xs font-medium uppercase tracking-widest">Total Roasted READMEs</span>
          <span className="text-2xl md:text-3xl font-bold font-mono text-white mt-1">1,418</span>
          <span className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
            <ArrowUpRight size={12} />
            <span>+12.4% this week</span>
          </span>
        </div>

        <div className="bg-devDark-900 border border-devDark-800 p-5 rounded-2xl flex flex-col gap-1 relative overflow-hidden">
          <div className="absolute right-4 top-4 text-netlify-blue/10">
            <Code2 size={40} />
          </div>
          <span className="text-devDark-500 text-xs font-medium uppercase tracking-widest">Code Clashes Solved</span>
          <span className="text-2xl md:text-3xl font-bold font-mono text-white mt-1">824</span>
          <span className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
            <ArrowUpRight size={12} />
            <span>+8.2% this week</span>
          </span>
        </div>

        <div className="bg-devDark-900 border border-devDark-800 p-5 rounded-2xl flex flex-col gap-1 relative overflow-hidden">
          <div className="absolute right-4 top-4 text-emerald-400/10">
            <SearchCode size={40} />
          </div>
          <span className="text-devDark-500 text-xs font-medium uppercase tracking-widest">Repositories Inspected</span>
          <span className="text-2xl md:text-3xl font-bold font-mono text-white mt-1">2,109</span>
          <span className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
            <ArrowUpRight size={12} />
            <span>+18.7% this week</span>
          </span>
        </div>

        <div className="bg-devDark-900 border border-devDark-800 p-5 rounded-2xl flex flex-col gap-1 relative overflow-hidden">
          <div className="absolute right-4 top-4 text-netlify-teal/10">
            <Database size={40} />
          </div>
          <span className="text-devDark-500 text-xs font-medium uppercase tracking-widest">Netlify Blobs Count</span>
          <span className="text-2xl md:text-3xl font-bold font-mono text-netlify-teal mt-1">{blobsCount}</span>
          <span className="text-xs text-devDark-500 flex items-center gap-1 mt-2">
            <Server size={12} />
            <span>Live site persistent store</span>
          </span>
        </div>
      </div>

      {/* Main Suite Showcase and Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Core Suite Showcase column */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="text-netlify-teal" size={18} />
            <span>Explore Developer Suite Tools</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* README Roaster Card */}
            <div className="bg-devDark-900 border border-devDark-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-netlify-accent/40 hover:glow-teal transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-netlify-accent/10 text-netlify-accent flex items-center justify-center mb-4 font-bold text-lg border border-netlify-accent/20">
                  🔥
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-netlify-accent transition-colors mb-2">README Roaster</h3>
                <p className="text-devDark-400 text-xs leading-relaxed">
                  Paste any public GitHub URL and receive a highly witty, sarcastic critique of its documentation structure and wording, along with a bulleted, constructive recovery plan.
                </p>
              </div>
              <button 
                onClick={() => setCurrentTab('roaster')}
                className="mt-6 text-xs text-netlify-accent font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Launch Roaster</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            {/* Code Clash Card */}
            <div className="bg-devDark-900 border border-devDark-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-netlify-blue/40 hover:glow-blue transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-netlify-blue/10 text-netlify-blue flex items-center justify-center mb-4 border border-netlify-blue/20">
                  <Code2 size={20} />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-netlify-blue transition-colors mb-2">Code Clash Arena</h3>
                <p className="text-devDark-400 text-xs leading-relaxed">
                  Compare two alternative code implementations. Our AI Judge determines overall winner and scores them across readability, speed performance, and security flaws.
                </p>
              </div>
              <button 
                onClick={() => setCurrentTab('clash')}
                className="mt-6 text-xs text-netlify-blue font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Enter Arena</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            {/* lilInspect Card */}
            <div className="bg-devDark-900 border border-devDark-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-netlify-teal/40 hover:glow-teal transition-all duration-300 md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                <div className="w-10 h-10 rounded-xl bg-netlify-teal/10 text-netlify-teal flex items-center justify-center mb-4 md:mb-0 border border-netlify-teal/20 shrink-0">
                  <SearchCode size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-netlify-teal transition-colors mb-2">lilInspect Repo Metadata</h3>
                  <p className="text-devDark-400 text-xs leading-relaxed">
                    Examine GitHub repo metadata inside a visual diagnostic dashboard. Audit repo size, license compliance, open issue fatigue, and get lists of severe code-smell action items.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentTab('inspect')}
                className="mt-6 text-xs text-netlify-teal font-semibold flex items-center gap-1 self-start group-hover:translate-x-1 transition-transform"
              >
                <span>Inspect Repository</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* Recent Activity / Netlify Blobs Ledger */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Database className="text-netlify-blue" size={18} />
              <span>Netlify Blobs Ledger</span>
            </span>
            <span className="text-[10px] bg-devDark-800 text-devDark-400 px-2 py-0.5 rounded font-mono uppercase">Read Store</span>
          </h2>

          <div className="bg-devDark-900 border border-devDark-800 rounded-2xl p-4 flex-1 flex flex-col gap-3 min-h-[350px]">
            {recentBlobs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-devDark-850 rounded-xl">
                <p className="text-devDark-500 text-xs">No keys stored in Blobs yet. Run README Roaster or Code Clash to save diagnostic records.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {recentBlobs.map(blob => (
                  <div 
                    key={blob.key} 
                    className="p-3.5 bg-devDark-950 rounded-xl border border-devDark-800 flex items-center justify-between group hover:border-devDark-700 transition-colors cursor-pointer"
                    onClick={() => {
                      if (blob.store === 'roasts') setCurrentTab('roaster');
                      if (blob.store === 'clashes') setCurrentTab('clash');
                      if (blob.store === 'inspects') setCurrentTab('inspect');
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg text-sm ${
                        blob.store === 'roasts' ? 'bg-netlify-accent/10 text-netlify-accent border border-netlify-accent/10' :
                        blob.store === 'clashes' ? 'bg-netlify-blue/10 text-netlify-blue border border-netlify-blue/10' :
                        'bg-netlify-teal/10 text-netlify-teal border border-netlify-teal/10'
                      }`}>
                        {blob.store === 'roasts' ? '🔥' : blob.store === 'clashes' ? '⚔️' : '🕵️'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-semibold text-white group-hover:text-netlify-teal transition-colors truncate max-w-[160px] md:max-w-xs xl:max-w-[160px]">
                          {blob.key}
                        </span>
                        <span className="text-[10px] text-devDark-500 flex items-center gap-1 mt-0.5">
                          <Clock size={10} />
                          <span>{new Date(blob.savedAt).toLocaleTimeString()}</span>
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-devDark-500 group-hover:text-white transition-colors" />
                  </div>
                ))}

                <button 
                  onClick={() => setCurrentTab('netlify')}
                  className="mt-2 py-2.5 rounded-xl bg-devDark-800/40 hover:bg-devDark-800 text-center text-xs text-devDark-400 hover:text-white transition-all border border-devDark-850"
                >
                  View Full Blobs Database
                </button>
              </div>
            )}
            
            {/* System Performance Emulation Card */}
            <div className="mt-auto bg-devDark-950 p-4 rounded-xl border border-devDark-850 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-devDark-400">Diag Gateway Ping</span>
                <span className="text-emerald-400 font-mono">14ms (Healthy)</span>
              </div>
              <div className="w-full bg-devDark-850 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[94%]"></div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-devDark-500">
                <span>99.98% SLA</span>
                <span>Active Region: US-East</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
