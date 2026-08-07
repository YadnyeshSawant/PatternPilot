import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Cpu, BookOpen, ExternalLink, Code2, Copy, Check, Bookmark, Sparkles, Maximize2 } from 'lucide-react';
import { DSANode, MasteryStatus, UserNodeMeta } from '../types';
import { CATEGORY_COLORS, dsaTreeData } from '../data/dsaData';
import { generateCppCodeSnippet } from '../utils/cppCodeGenerator';

interface Props {
  node: DSANode | null;
  meta: UserNodeMeta;
  onClose: () => void;
  onUpdateMeta: (id: string, updates: Partial<UserNodeMeta>) => void;
}

/**
 * Normalizes code snippets so indentation is clean, uniform, and properly formatted.
 */
function formatCodeSnippet(rawCode: string): string {
  if (!rawCode) return '';
  
  // Replace carriage returns
  const lines = rawCode.replace(/\r\n/g, '\n').split('\n');
  
  // Strip top and bottom empty lines
  while (lines.length > 0 && lines[0].trim() === '') lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();

  if (lines.length === 0) return '';

  // Determine minimum common leading indentation
  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim().length === 0) continue;
    const match = line.match(/^(\s*)/);
    if (match) {
      minIndent = Math.min(minIndent, match[1].length);
    }
  }

  if (minIndent === Infinity) minIndent = 0;

  // Re-align lines relative to minIndent
  const cleaned = lines.map((line) => {
    if (line.trim().length === 0) return '';
    return line.slice(minIndent);
  });

  return cleaned.join('\n');
}

/**
 * Finds or generates an Algorithm Pattern Code for any node/pattern in the tree.
 */
function getEffectiveCodeSnippet(targetNode: DSANode): string {
  if (targetNode.codeSnippet && targetNode.codeSnippet.trim().length > 0) {
    return targetNode.codeSnippet;
  }

  // Look for codeSnippet in children
  if (targetNode.childrenIds && targetNode.childrenIds.length > 0) {
    for (const childId of targetNode.childrenIds) {
      const child = dsaTreeData[childId];
      if (child) {
        const childSnippet = getEffectiveCodeSnippet(child);
        if (childSnippet) return childSnippet;
      }
    }
  }

  // Fallback clean template for any pattern or subtopic lacking explicit codeSnippet
  const cleanTitle = targetNode.title.replace(/^\d+(\.\d+)*\s*/, '');
  const camelName = cleanTitle.replace(/[^a-zA-Z0-9]/g, '') || 'solvePattern';

  return `// ${targetNode.title} Algorithm Pattern
function ${camelName}(data, target) {
  // Key Technique: ${targetNode.keyTechnique || targetNode.description || 'Core algorithmic pattern implementation'}
  if (!data) return null;

  // Time Complexity: ${targetNode.timeComplexity || 'O(N)'}
  // Space Complexity: ${targetNode.spaceComplexity || 'O(1)'}

  // 1. Initialize indices / state trackers
  // 2. Iterate and process elements
  // 3. Return pattern result
  return data;
}`;
}

export const NodeDetailDrawer: React.FC<Props> = ({
  node,
  meta,
  onClose,
  onUpdateMeta
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'cpp' | 'js'>('cpp');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!node) return null;

  const categoryStyle = CATEGORY_COLORS[node.category] || {
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-800 dark:text-slate-200',
    border: 'border-slate-300 dark:border-slate-700',
    accent: '#64748b'
  };

  const rawJsSnippet = getEffectiveCodeSnippet(node);
  const cppSnippet = generateCppCodeSnippet(node);

  const activeSnippet = selectedLang === 'cpp'
    ? formatCodeSnippet(cppSnippet)
    : formatCodeSnippet(rawJsSnippet);

  const copyCode = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleStatusChange = (status: MasteryStatus) => {
    onUpdateMeta(node.id, { status });
  };

  const toggleBookmark = () => {
    onUpdateMeta(node.id, { isBookmarked: !meta.isBookmarked });
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
      {/* Drawer Header */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/70 dark:bg-slate-950/40">
        <div className="space-y-2 max-w-[80%]">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
            >
              {node.category}
            </span>
            <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono rounded">
              Level {node.level}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
            {node.title}
          </h2>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleBookmark}
            title={meta.isBookmarked ? 'Remove Bookmark' : 'Bookmark Node'}
            className={`p-2 rounded-lg transition-colors ${
              meta.isBookmarked
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-5 h-5 fill-current" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Drawer Body */}
      <div className="p-5 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-300 text-sm">
        {/* Mastery Tracker Selector */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Practice & Mastery Status
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleStatusChange('not_started')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-center border ${
                meta.status === 'not_started'
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-400 dark:border-slate-600 font-bold shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              Not Started
            </button>
            <button
              onClick={() => handleStatusChange('learning')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-center border ${
                meta.status === 'learning'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border-amber-300 font-bold shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/20'
              }`}
            >
              Learning 📖
            </button>
            <button
              onClick={() => handleStatusChange('mastered')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-center border ${
                meta.status === 'mastered'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border-emerald-400 font-bold shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
              }`}
            >
              Mastered ✅
            </button>
          </div>
        </div>

        {/* Overview Description */}
        {node.description && (
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              Concept Overview
            </h4>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
              {node.description}
            </p>
          </div>
        )}

        {/* Complexity Cards */}
        {(node.timeComplexity || node.spaceComplexity) && (
          <div className="grid grid-cols-2 gap-3">
            {node.timeComplexity && (
              <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-300 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Time Complexity</span>
                </div>
                <div className="text-base font-mono font-bold text-blue-900 dark:text-blue-100">
                  {node.timeComplexity}
                </div>
              </div>
            )}
            {node.spaceComplexity && (
              <div className="p-3.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-purple-700 dark:text-purple-300 font-semibold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Space Complexity</span>
                </div>
                <div className="text-base font-mono font-bold text-purple-900 dark:text-purple-100">
                  {node.spaceComplexity}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Key Technique */}
        {node.keyTechnique && (
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Key Technique
            </h4>
            <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 rounded-xl border border-amber-200 dark:border-amber-900/40 text-xs leading-relaxed font-medium">
              {node.keyTechnique}
            </div>
          </div>
        )}

        {/* Code Snippet Template */}
        {activeSnippet && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                Algorithm Pattern Code
              </h4>

              <div className="flex items-center gap-2">
                {/* Language Switcher */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-bold">
                  <button
                    onClick={() => setSelectedLang('cpp')}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      selectedLang === 'cpp'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    C++
                  </button>
                  <button
                    onClick={() => setSelectedLang('js')}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      selectedLang === 'js'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    JavaScript
                  </button>
                </div>

                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCode ? 'Copied' : 'Copy'}
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  title="Expand Code View"
                  className="p-1 rounded-md text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="relative group">
              <pre className="p-4 bg-slate-950 text-emerald-400 dark:text-emerald-300 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800 shadow-inner whitespace-pre font-normal max-h-60">
                <code>{activeSnippet}</code>
              </pre>
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-slate-900/80 text-slate-300 border border-slate-700/80 text-[11px] font-medium flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-xs"
              >
                <Maximize2 className="w-3 h-3 text-indigo-400" />
                <span>Expand</span>
              </button>
            </div>
          </div>
        )}

        {/* Classic Problems */}
        {node.leetcodeProblems && node.leetcodeProblems.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Recommended Practice Problems
            </h4>
            <div className="space-y-2">
              {node.leetcodeProblems.map((prob, idx) => {
                const searchUrl = `https://leetcode.com/problemset/all/?search=${encodeURIComponent(prob.name)}`;
                const diffColor =
                  prob.difficulty === 'Easy'
                    ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                    : prob.difficulty === 'Medium'
                    ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
                    : 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';

                return (
                  <a
                    key={idx}
                    href={searchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 flex items-center justify-between group transition-all"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-xs">
                      {prob.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${diffColor}`}>
                        {prob.difficulty}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* User Personal Notes */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Personal Study Notes
          </label>
          <textarea
            value={meta.notes || ''}
            onChange={(e) => onUpdateMeta(node.id, { notes: e.target.value })}
            placeholder="Write your custom insights, edge cases, or review reminders here..."
            rows={3}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 dark:text-slate-200 resize-none"
          />
        </div>
      </div>

      {/* Code Modal Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {node.title} — {selectedLang === 'cpp' ? 'C++' : 'JavaScript'} Pattern
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Time: {node.timeComplexity || 'O(N)'} | Space: {node.spaceComplexity || 'O(1)'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Language Switcher */}
                <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs font-bold">
                  <button
                    onClick={() => setSelectedLang('cpp')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      selectedLang === 'cpp'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    C++
                  </button>
                  <button
                    onClick={() => setSelectedLang('js')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      selectedLang === 'js'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    JavaScript
                  </button>
                </div>

                <button
                  onClick={copyCode}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close Pop-up"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Code Body */}
            <div className="p-5 overflow-auto flex-1 bg-slate-950">
              <pre className="text-xs sm:text-sm font-mono text-emerald-400 leading-relaxed whitespace-pre font-normal">
                <code>{activeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
