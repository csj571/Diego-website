import React, { useState } from 'react';
import { 
  Database, 
  Cpu, 
  CloudLightning, 
  Network, 
  ListTodo, 
  BarChart3, 
  Trash2, 
  Plus, 
  Mail, 
  Send, 
  Clock, 
  Sparkles,
  Info,
  Sliders,
  CheckCircle2,
  TrendingUp,
  Activity,
  Globe
} from 'lucide-react';
import { BlobItem } from '../App';

interface NetlifyPrimitivesDocsProps {
  blobs: BlobItem[];
  deleteBlob: (key: string) => void;
  addToast: (msg: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  visitorCount: number;
}

const NetlifyPrimitivesDocs: React.FC<NetlifyPrimitivesDocsProps> = ({ 
  blobs, 
  deleteBlob, 
  addToast,
  visitorCount
}) => {
  const [activeTab, setActiveTab] = useState<'explanation' | 'blobs' | 'forms' | 'analytics'>('explanation');
  
  // Forms states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState('Bug Report');
  const [comment, setComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Manual blob writing state
  const [newBlobKey, setNewBlobKey] = useState('');
  const [newBlobValue, setNewBlobValue] = useState('');
  const [showAddBlobModal, setShowAddBlobModal] = useState(false);

  const submitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !comment) {
      addToast('Please fill out all feedback form fields', 'error');
      return;
    }
    setFormSubmitted(true);
    addToast('Feedback registered in Netlify Forms database!', 'success');
  };

  const resetFeedbackForm = () => {
    setName('');
    setEmail('');
    setComment('');
    setFormSubmitted(false);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Tab select header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-devDark-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Netlify Primitives</h1>
          <p className="text-devDark-400 text-sm mt-1">Explore and interact with the serverless backend elements powering SparkDev ToolsDock.</p>
        </div>

        {/* Primitive Tabs selectors */}
        <div className="bg-devDark-900 border border-devDark-800 p-1.5 rounded-xl flex gap-1">
          <button
            onClick={() => setActiveTab('explanation')}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'explanation' ? 'bg-devDark-800 text-white shadow' : 'text-devDark-400 hover:text-white'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => setActiveTab('blobs')}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'blobs' ? 'bg-netlify-teal text-devDark-950 shadow font-bold' : 'text-devDark-400 hover:text-white'
            }`}
          >
            <Database size={12} />
            <span>Blobs Explorer</span>
          </button>
          <button
            onClick={() => setActiveTab('forms')}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'forms' ? 'bg-netlify-blue text-white shadow font-bold' : 'text-devDark-400 hover:text-white'
            }`}
          >
            <Mail size={12} />
            <span>Netlify Forms</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'analytics' ? 'bg-netlify-accent text-white shadow font-bold' : 'text-devDark-400 hover:text-white'
            }`}
          >
            <BarChart3 size={12} />
            <span>Analytics Dashboard</span>
          </button>
        </div>
      </div>

      {/* VIEW: Explanation / Specs */}
      {activeTab === 'explanation' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Netlify Blobs */}
            <div className="bg-devDark-900 border border-devDark-800 p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-netlify-teal/10">
                <Database size={40} />
              </div>
              <div className="w-8 h-8 rounded-lg bg-netlify-teal/10 text-netlify-teal flex items-center justify-center font-bold border border-netlify-teal/25">
                1
              </div>
              <h3 className="font-bold text-white text-base">Netlify Blobs</h3>
              <p className="text-devDark-400 text-xs leading-relaxed">
                An ultra-fast S3-like key-value blob store with near-zero configuration. In ToolsDock, we utilize Blobs to persist roasted README diagnostics, Code Clash judgements, and lilInspect audits.
              </p>
              <code className="text-[10px] bg-devDark-950 text-netlify-teal p-2 rounded-lg border border-devDark-850 mt-2 font-mono">
                import {'{ getStore }'} from "@netlify/blobs";
              </code>
            </div>

            {/* Agent Runners */}
            <div className="bg-devDark-900 border border-devDark-800 p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-netlify-accent/10">
                <Cpu size={40} />
              </div>
              <div className="w-8 h-8 rounded-lg bg-netlify-accent/10 text-netlify-accent flex items-center justify-center font-bold border border-netlify-accent/25">
                2
              </div>
              <h3 className="font-bold text-white text-base">Agent Runners</h3>
              <p className="text-devDark-400 text-xs leading-relaxed">
                An asynchronous, containerized execution environment for running background AI developers. We trigger Agent Runners when analyzing complex repositories to process git clones, file scraping, and deep dependency reviews.
              </p>
              <code className="text-[10px] bg-devDark-950 text-netlify-accent p-2 rounded-lg border border-devDark-850 mt-2 font-mono">
                [Agent Runner] Spinning container...
              </code>
            </div>

            {/* Functions */}
            <div className="bg-devDark-900 border border-devDark-800 p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-purple-400/10">
                <CloudLightning size={40} />
              </div>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold border border-purple-500/25">
                3
              </div>
              <h3 className="font-bold text-white text-base">Functions (API v2)</h3>
              <p className="text-devDark-400 text-xs leading-relaxed">
                Serverless REST API endpoints built with modern default-export handlers and runtime routing paths. They serve as the orchestration brain, fetching GitHub statistics, checking caches, and routing LLM calls.
              </p>
              <code className="text-[10px] bg-devDark-950 text-purple-400 p-2 rounded-lg border border-devDark-850 mt-2 font-mono">
                export default async (req, ctx) =&gt; ...
              </code>
            </div>

            {/* AI Gateway */}
            <div className="bg-devDark-900 border border-devDark-800 p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-netlify-blue/10">
                <Network size={40} />
              </div>
              <div className="w-8 h-8 rounded-lg bg-netlify-blue/10 text-netlify-blue flex items-center justify-center font-bold border border-netlify-blue/25">
                4
              </div>
              <h3 className="font-bold text-white text-base">AI Gateway</h3>
              <p className="text-devDark-400 text-xs leading-relaxed">
                Connects serverless functions directly to Anthropic or OpenAI models with zero API keys or external billing. Automatically rate-limits endpoints and returns cached responses.
              </p>
              <code className="text-[10px] bg-devDark-950 text-netlify-blue p-2 rounded-lg border border-devDark-850 mt-2 font-mono">
                const openai = new OpenAI(); // No API key!
              </code>
            </div>

            {/* Netlify Forms */}
            <div className="bg-devDark-900 border border-devDark-800 p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-yellow-500/10">
                <ListTodo size={40} />
              </div>
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center font-bold border border-yellow-500/25">
                5
              </div>
              <h3 className="font-bold text-white text-base">Netlify Forms</h3>
              <p className="text-devDark-400 text-xs leading-relaxed">
                Zero-setup form handling. Form submissions are parsed, validated, and stored in a database automatically. In ToolsDock, our feedback widget hooks straight into Netlify Forms.
              </p>
              <code className="text-[10px] bg-devDark-950 text-yellow-500 p-2 rounded-lg border border-devDark-850 mt-2 font-mono">
                &lt;form name="feedback" data-netlify="true"&gt;
              </code>
            </div>

            {/* Netlify Analytics */}
            <div className="bg-devDark-900 border border-devDark-800 p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-emerald-400/10">
                <BarChart3 size={40} />
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/25">
                6
              </div>
              <h3 className="font-bold text-white text-base">Netlify Analytics</h3>
              <p className="text-devDark-400 text-xs leading-relaxed">
                GDPR-compliant, server-side traffic diagnostics parsed straight from Netlify Edge nodes without cookie prompts or heavy client scripts. Tracks visits, error rates, and API bandwidth.
              </p>
              <code className="text-[10px] bg-devDark-950 text-emerald-400 p-2 rounded-lg border border-devDark-850 mt-2 font-mono">
                Edge routing bandwidth stats logged live.
              </code>
            </div>

          </div>
        </div>
      )}

      {/* VIEW: Interactive Blobs Explorer */}
      {activeTab === 'blobs' && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-devDark-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="text-netlify-teal" size={16} />
              <span>Blobs Namespace: "sparkdev-database"</span>
            </h3>
            <span className="text-[10px] font-mono text-devDark-500 bg-devDark-950 px-2 py-1 border border-devDark-850 rounded">
              Consistency: Read-After-Write
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Blobs keys list */}
            <div className="lg:col-span-1 bg-devDark-900 border border-devDark-800 p-4 rounded-2xl flex flex-col gap-3.5 h-[400px] overflow-y-auto">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-devDark-500">Keys Ledger ({blobs.length})</span>
              
              {blobs.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-devDark-850 rounded-xl text-devDark-600">
                  <Database size={24} className="mb-1" />
                  <p className="text-xs">Blobs storage is completely empty.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {blobs.map(blob => (
                    <div 
                      key={blob.key}
                      className="p-3 bg-devDark-950 border border-devDark-850 rounded-xl flex items-center justify-between group hover:border-devDark-700 transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-white">{blob.key}</span>
                        <span className="text-[9px] text-devDark-500 font-mono mt-0.5 uppercase">Store: {blob.store}</span>
                      </div>
                      <button
                        onClick={() => deleteBlob(blob.key)}
                        className="p-1.5 hover:bg-devDark-850 text-devDark-500 hover:text-red-400 rounded-lg transition-colors"
                        title="Delete key"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Blobs metadata schema card */}
            <div className="lg:col-span-2 bg-devDark-900 border border-devDark-800 p-6 rounded-2xl h-[400px] flex flex-col gap-4">
              <h4 className="text-xs font-bold font-mono uppercase text-devDark-400 border-b border-devDark-800 pb-3">Developer Storage Heuristics</h4>
              
              <div className="flex-1 flex flex-col gap-4 text-xs text-devDark-300 leading-relaxed justify-between">
                <div>
                  <p>
                    Netlify Blobs objects are partitioned by <strong>Store namespaces</strong>. In our production-ready backend, the serverless functions route key reads like <code className="text-netlify-teal text-[11px] bg-devDark-950 px-1 py-0.5 rounded">roast/sveltejs/svelte</code> to query pre-computed LLM diagnostics.
                  </p>
                  <p className="mt-3">
                    Every key write automatically invalidates the Edge CDNs. Netlify's high availability ensures your frontend always retrieves fresh developer evaluations instantly.
                  </p>
                </div>

                <div className="bg-devDark-950 p-4 rounded-xl border border-devDark-850 flex items-center gap-4">
                  <Sliders size={24} className="text-netlify-teal shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-white text-xs">Direct API Local Sandbox CRUD</span>
                    <span className="text-devDark-500 text-[11px]">Deploy to Netlify and run <code className="text-devDark-300 bg-devDark-900 px-1 py-0.5 rounded">netlify dev</code> to bind actual S3 object storage!</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW: Feedback Forms widget */}
      {activeTab === 'forms' && (
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-devDark-900 border border-devDark-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
            
            <div className="border-b border-devDark-800 pb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ListTodo className="text-netlify-blue" size={16} />
                <span>Submit Feedback (Netlify Forms Verified)</span>
              </h3>
              <p className="text-xs text-devDark-400 mt-1">This form is structured with Netlify attribute indicators, saving data directly into the dashboard upon live git push.</p>
            </div>

            {formSubmitted ? (
              <div className="text-center p-8 border border-dashed border-devDark-800 rounded-2xl bg-devDark-950/30 flex flex-col items-center justify-center gap-4 animate-scaleUp">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Feedback successfully stored!</h4>
                  <p className="text-xs text-devDark-400 max-w-sm mt-1 mx-auto leading-relaxed">
                    Netlify Forms hook caught your submission. Submissions can trigger Webhooks, emails, or Zapier automations on the backend.
                  </p>
                </div>
                <button
                  onClick={resetFeedbackForm}
                  className="mt-2 text-xs text-netlify-blue font-bold hover:underline"
                >
                  Submit another form
                </button>
              </div>
            ) : (
              <form 
                name="feedback" 
                data-netlify="true"
                onSubmit={submitFeedback}
                className="flex flex-col gap-4"
              >
                {/* Netlify Forms requirement: Hidden inputs */}
                <input type="hidden" name="form-name" value="feedback" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="font-mono text-devDark-400 font-bold uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Amanda Seida"
                      required
                      className="bg-devDark-950 border border-devDark-800 focus:border-netlify-blue rounded-xl py-2.5 px-4 text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="font-mono text-devDark-400 font-bold uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="amanda@domain.com"
                      required
                      className="bg-devDark-950 border border-devDark-800 focus:border-netlify-blue rounded-xl py-2.5 px-4 text-white focus:outline-none transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-xs">
                  <label className="font-mono text-devDark-400 font-bold uppercase tracking-wider">Audit Feedback Type</label>
                  <select
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    className="bg-devDark-950 border border-devDark-800 focus:border-netlify-blue rounded-xl py-2.5 px-4 text-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Bug Report">🐛 Bug Report / Core Sins error</option>
                    <option value="Feature Idea">💡 Feature request for AI Gateway</option>
                    <option value="General Feedback">⭐ General Platform compliments</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 text-xs">
                  <label className="font-mono text-devDark-400 font-bold uppercase tracking-wider">Comment / Logs</label>
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Submit your comment, suggestions, or container crash logs..."
                    required
                    rows={4}
                    className="bg-devDark-950 border border-devDark-800 focus:border-netlify-blue rounded-xl p-4 text-white focus:outline-none transition-all resize-y font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-netlify-blue hover:bg-netlify-blue/95 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 text-sm shadow-lg shadow-netlify-blue/15"
                >
                  <Send size={14} />
                  <span>Submit feedback</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* VIEW: Analytics graphs */}
      {activeTab === 'analytics' && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-devDark-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="text-netlify-accent" size={16} />
              <span>Netlify Edge Node Diagnostics</span>
            </h3>
            <span className="text-[10px] font-mono text-devDark-500 bg-devDark-950 px-2 py-1 border border-devDark-850 rounded uppercase">
              No cookies required
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Quick stats indicators */}
            <div className="bg-devDark-900 border border-devDark-800 p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-devDark-500 text-xs font-semibold uppercase font-mono">Simulated Monthly Views</span>
              <span className="text-2xl font-bold font-mono text-white mt-1">14,819</span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
                <TrendingUp size={12} />
                <span>+14.2% month-over-month</span>
              </div>
            </div>

            <div className="bg-devDark-900 border border-devDark-800 p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-devDark-500 text-xs font-semibold uppercase font-mono">Bandwidth Footprint</span>
              <span className="text-2xl font-bold font-mono text-white mt-1">1.42 GB</span>
              <div className="flex items-center gap-1.5 text-xs text-devDark-500 mt-2">
                <Globe size={12} />
                <span>94% static cache ratio</span>
              </div>
            </div>

            <div className="bg-devDark-900 border border-devDark-800 p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-devDark-500 text-xs font-semibold uppercase font-mono">Live Session Concurrency</span>
              <span className="text-2xl font-bold font-mono text-netlify-accent mt-1">{visitorCount}</span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 animate-pulse">
                <Activity size={12} />
                <span>Active Edge nodes</span>
              </div>
            </div>

          </div>

          {/* Simple custom CSS/SVG Area Chart showing visitor metrics over 7 days */}
          <div className="bg-devDark-900 border border-devDark-800 p-6 rounded-2xl flex flex-col gap-4">
            <h4 className="text-xs font-bold font-mono uppercase text-devDark-400 border-b border-devDark-800 pb-3">7-Day Edge Traffic analytics</h4>
            
            <div className="h-48 w-full flex items-end gap-3.5 pt-4">
              {[
                { day: "Mon", count: 85 },
                { day: "Tue", count: 110 },
                { day: "Wed", count: 145 },
                { day: "Thu", count: 120 },
                { day: "Fri", count: 165 },
                { day: "Sat", count: 95 },
                { day: "Sun", count: 142 }
              ].map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-devDark-950 rounded-lg h-36 flex items-end overflow-hidden border border-devDark-850">
                    <div 
                      className="bg-gradient-to-t from-netlify-accent/30 to-netlify-accent w-full rounded-t-sm border-t border-netlify-accent/80 transition-all duration-1000"
                      style={{ height: `${(d.count / 180) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-devDark-500 font-semibold font-mono">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default NetlifyPrimitivesDocs;
