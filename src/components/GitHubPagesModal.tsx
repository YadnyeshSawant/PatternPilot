import React, { useState } from 'react';
import { X, Copy, Check, Github, ExternalLink, Download, Rocket, Code2, Terminal } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const packageJsonScript = `"scripts": {
  "build": "vite build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}`;

  const viteConfigCode = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Replace 'dsa-mindmap' with your exact GitHub repository name
export default defineConfig({
  base: '/dsa-mindmap/',
  plugins: [react(), tailwindcss()],
});`;

  const githubActionYml = `name: Deploy DSA Mind Map to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        run: npm install

      - name: Build Project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl shadow-sm">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Deploy to GitHub Pages
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Share your interactive DSA Mind Map repository with the world for free
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300 text-sm">
          {/* Quick Method 1 */}
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-semibold mb-1">
              <Rocket className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Option A: Automatic Deployment via GitHub Actions (Recommended)</span>
            </div>
            <p className="text-xs text-indigo-700 dark:text-indigo-300 mb-3">
              Push your code to GitHub and let Actions build and host your app on every commit automatically!
            </p>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
                <span>.github/workflows/deploy.yml</span>
                <button
                  onClick={() => copyToClipboard(githubActionYml, 'action')}
                  className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copiedSection === 'action' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSection === 'action' ? 'Copied!' : 'Copy Workflow File'}
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg text-xs overflow-x-auto font-mono leading-relaxed">
                {githubActionYml}
              </pre>
            </div>
          </div>

          {/* Option B: CLI Deployment */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              Option B: Deploy via <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs">gh-pages</code> CLI
            </h3>

            <div className="space-y-3 pl-2 border-l-2 border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <span className="font-medium text-slate-900 dark:text-slate-100 text-xs">Step 1: Install gh-pages package</span>
                <div className="flex items-center justify-between p-2.5 bg-slate-900 text-emerald-400 font-mono rounded-lg text-xs">
                  <code>npm install --save-dev gh-pages</code>
                  <button onClick={() => copyToClipboard('npm install --save-dev gh-pages', 'step1')}>
                    {copiedSection === 'step1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400 hover:text-white" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-medium text-slate-900 dark:text-slate-100 text-xs">Step 2: Add deploy scripts to package.json</span>
                <div className="relative">
                  <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto">
                    {packageJsonScript}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(packageJsonScript, 'step2')}
                    className="absolute top-2 right-2 text-slate-400 hover:text-white"
                  >
                    {copiedSection === 'step2' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-medium text-slate-900 dark:text-slate-100 text-xs">Step 3: Set repository base path in vite.config.ts</span>
                <div className="relative">
                  <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto">
                    {viteConfigCode}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(viteConfigCode, 'step3')}
                    className="absolute top-2 right-2 text-slate-400 hover:text-white"
                  >
                    {copiedSection === 'step3' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-medium text-slate-900 dark:text-slate-100 text-xs">Step 4: Run deploy command</span>
                <div className="flex items-center justify-between p-2.5 bg-slate-900 text-emerald-400 font-mono rounded-lg text-xs">
                  <code>npm run deploy</code>
                  <button onClick={() => copyToClipboard('npm run deploy', 'step4')}>
                    {copiedSection === 'step4' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400 hover:text-white" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <a
            href="https://docs.github.com/en/pages/getting-started-with-github-pages"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            <span>Read official GitHub Pages docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl font-medium text-xs transition-colors shadow-sm"
          >
            Got it, close
          </button>
        </div>
      </div>
    </div>
  );
};
