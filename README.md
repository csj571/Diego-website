# SparkDev ToolsDock ⚡

An advanced, highly-polished Developer Diagnostics and Diagnostic Platform inspired by modern dev-utility applications. Paste public repository URLs or submit algorithms to evaluate and roast documentation, code execution, and dependency sizing.

## 🚀 The Pitch
SparkDev ToolsDock is a focused developer suite designed to help engineering teams analyze, inspect, and optimize their open-source assets. It packages multiple diagnostic tools under one cohesive, responsive interface:
- **README Roaster**: Paste any public GitHub URL and let our containerized AI agent critique its documentation layout, buzzwords, and installation sins, providing a constructive recovery plan.
- **Code Clash Arena**: Side-by-side comparative code evaluation. Submit two alternative algorithms or utility functions and get speed, readability, and security assessments.
- **lilInspect Repo Auditor**: Audit GitHub repository sizing, languages percentages, licensing compatibility, and open issue fatigue.
- **Netlify Primitives Center**: A direct portal containing interactive Blobs Explorer, Form capturing ledger, and real-time serverless Analytics.

---

## 🏗️ Architecture & Integrations
This application is designed specifically to run on Netlify and leverage its high-performance serverless features with zero-configuration overhead.

### 1. Netlify Blobs (Persistent Key-Value Storage)
We use **Netlify Blobs** to cache compiled diagnostic results (e.g. roasted README files, code clash evaluations, and repository audits). This ensures that repeat visits load instantly from global edge CDNs instead of triggering cold AI queries.
- Namespace: `sparkdev-roasts`, `sparkdev-clashes`, `sparkdev-inspects`
- Consistency Model: Read-After-Write (last write wins)

### 2. Netlify Agent Runners (Asynchronous Background AI Workers)
For heavy operations such as cloning a larger repository and auditing its file layout, we leverage **Agent Runners** to spin up sandboxed Node/TS container instances that run in the background and commit analysis logs directly to the persistent Blobs database.

### 3. Netlify Functions (API v2 Syntax)
Written in modern TypeScript using path routing and Context parameters.
- Endpoint handlers are default-exported: `export default async (req: Request, context: Context) => { ... }`
- Automatic routing config declarations: `export const config = { path: "/api/roast" }`

### 4. Netlify AI Gateway (Zero-Key LLM Proxying)
Proxy all OpenAI/Anthropic SDK operations straight through Netlify's AI Gateway.
- Eliminates the need to manage API keys, rota, or credentials on the client.
- Configures automated edge caching and rate-limiting per visitor IP.

### 5. Netlify Forms (Zero-Code Forms Capturing)
Captures and parses user feedback forms with simple declarative attributes on standard HTML forms. No API controllers or databases required.
- Integration: `<form name="feedback" data-netlify="true">`

### 6. Netlify Analytics (GDPR-Compliant Edge Metrics)
Server-side analytics parsed from edge node routing logs. Displays active visitor statistics, monthly views, and network bandwidth footprints without client cookies or trackers.

---

## 🛠️ Project Directory Layout
```text
sparkdev-toolsdock/
├── netlify/
│   └── functions/
│       ├── roast.ts      # README Roaster Function using AI Gateway & Blobs
│       ├── clash.ts      # Code Clash judge using AI Gateway
│       └── inspect.ts    # Repo Metadata Inspector
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Dashboard.tsx               # Primary analytics hub
│   │   ├── ReadmeRoaster.tsx           # Sarcastic docs critiquer
│   │   ├── CodeClash.tsx               # Multi-metric comparator
│   │   ├── LilInspect.tsx              # Metadata gauge and smells list
│   │   └── NetlifyPrimitivesDocs.tsx   # Interactive Blobs & Forms manager
│   ├── App.tsx           # Layout coordinate state router
│   ├── index.css         # Global Tailwind design tokens
│   └── main.tsx          # React Virtual DOM bootstrap
├── index.html            # Single-Page entry point
├── netlify.toml          # Netlify global redirects & rate limiter config
├── package.json          # Node dependencies list
├── tailwind.config.js    # Design system presets
├── tsconfig.json         # TypeScript compiler configurations
└── README.md             # This structural manual
```

---

## 📦 Local Development Setup

To run SparkDev ToolsDock locally:

1. **Extract the codebase** and open the directory:
   ```bash
   cd sparkdev-toolsdock
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite client dev server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the client-side simulators.

4. **Start the Netlify Serverless environment (Requires Netlify CLI)**:
   ```bash
   npm install -g netlify-cli
   netlify dev
   ```
   This spins up the Vite frontend together with local Netlify Serverless Functions, mock Blobs database emulation, and AI Gateway proxies.

---

## 🌐 Deploy to Netlify

To deploy the app live:

1. **Initialize a Netlify Project**:
   ```bash
   netlify init
   ```
   Follow the prompts to link your GitHub repository.

2. **Deploy to production**:
   ```bash
   netlify deploy --prod
   ```
   Netlify will automatically build the React assets, bundle the TypeScript serverless functions, configure global rate limiters, and set up the active Forms catching endpoints.
