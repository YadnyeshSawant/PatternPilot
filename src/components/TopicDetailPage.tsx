import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Cpu,
  BookOpen,
  ExternalLink,
  Code2,
  Copy,
  Check,
  Bookmark,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Share2,
  FolderTree
} from 'lucide-react';
import { DSANode, MasteryStatus, UserNodeMeta } from '../types';
import { CATEGORY_COLORS, dsaTreeData } from '../data/dsaData';
import { generateCppCodeSnippet } from '../utils/cppCodeGenerator';

interface Props {
  node: DSANode;
  meta: UserNodeMeta;
  onClose: () => void;
  onSelectNode: (id: string) => void;
  onUpdateMeta: (id: string, updates: Partial<UserNodeMeta>) => void;
}

/**
 * Normalizes code snippets so indentation is clean, uniform, and properly formatted.
 */
function formatCodeSnippet(rawCode: string): string {
  if (!rawCode) return '';
  const lines = rawCode.replace(/\r\n/g, '\n').split('\n');
  while (lines.length > 0 && lines[0].trim() === '') lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();
  if (lines.length === 0) return '';

  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim().length === 0) continue;
    const match = line.match(/^(\s*)/);
    if (match) {
      minIndent = Math.min(minIndent, match[1].length);
    }
  }

  if (minIndent === Infinity) minIndent = 0;

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

  if (targetNode.childrenIds && targetNode.childrenIds.length > 0) {
    for (const childId of targetNode.childrenIds) {
      const child = dsaTreeData[childId];
      if (child) {
        const childSnippet = getEffectiveCodeSnippet(child);
        if (childSnippet) return childSnippet;
      }
    }
  }

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

export const TopicDetailPage: React.FC<Props> = ({
  node,
  meta,
  onClose,
  onSelectNode,
  onUpdateMeta,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'cpp' | 'js'>('cpp');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate adjacent topics for next/previous navigation
  const { prevNode, nextNode } = useMemo(() => {
    const keys = Object.keys(dsaTreeData).filter((id) => id !== 'root');
    const currentIndex = keys.indexOf(node.id);
    const prevKey = currentIndex > 0 ? keys[currentIndex - 1] : null;
    const nextKey = currentIndex < keys.length - 1 ? keys[currentIndex + 1] : null;
    return {
      prevNode: prevKey ? dsaTreeData[prevKey] : null,
      nextNode: nextKey ? dsaTreeData[nextKey] : null,
    };
  }, [node.id]);

  const categoryStyle = CATEGORY_COLORS[node.category] || {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-200 dark:border-indigo-800',
    accent: '#6366f1',
  };

  const rawJsSnippet = getEffectiveCodeSnippet(node);
  const cppSnippet = generateCppCodeSnippet(node);

  const activeSnippet =
    selectedLang === 'cpp'
      ? formatCodeSnippet(cppSnippet)
      : formatCodeSnippet(rawJsSnippet);

  const copyCode = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyPageUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleStatusChange = (status: MasteryStatus) => {
    onUpdateMeta(node.id, { status });
  };

  const toggleBookmark = () => {
    onUpdateMeta(node.id, { isBookmarked: !meta.isBookmarked });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 animate-in fade-in duration-200">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
          {/* Back Button */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Syllabus</span>
          </button>

          {/* Breadcrumb Title */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold">
              <FolderTree className="w-3.5 h-3.5 text-indigo-500" />
              Syllabus
            </span>
            <span>/</span>
            <span className="text-slate-700 dark:text-slate-300">{node.category}</span>
            <span>/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold truncate max-w-xs">
              {node.title}
            </span>
          </div>

          {/* Action Buttons: Share URL & Bookmark */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={copyPageUrl}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
              title="Copy direct URL to this topic"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'URL Copied!' : 'Share Topic'}</span>
            </button>

            <button
              onClick={toggleBookmark}
              title={meta.isBookmarked ? 'Remove Bookmark' : 'Bookmark Node'}
              className={`p-1.5 rounded-lg transition-all ${
                meta.isBookmarked
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Page Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3.5">
        {/* Topic Header Hero Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
                >
                  {node.category}
                </span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-semibold rounded-full border border-slate-200 dark:border-slate-700">
                  Level {node.level}
                </span>
                {node.id.startsWith('17') || node.id.startsWith('18') || node.id.startsWith('19') ? (
                  <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[11px] font-bold rounded-full border border-rose-200 dark:border-rose-800">
                    ADVANCED DSA
                  </span>
                ) : null}
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                {node.title}
              </h1>

              {node.description && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {node.description}
                </p>
              )}
            </div>

            {/* Quick Practice Status Toggle */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-1.5 shrink-0 md:min-w-[240px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Practice Status
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => handleStatusChange('not_started')}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all text-center border cursor-pointer ${
                    meta.status === 'not_started'
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-400 dark:border-slate-600 font-bold shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  Unvisited
                </button>
                <button
                  onClick={() => handleStatusChange('learning')}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all text-center border cursor-pointer ${
                    meta.status === 'learning'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border-amber-300 font-bold shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/20'
                  }`}
                >
                  Learning
                </button>
                <button
                  onClick={() => handleStatusChange('mastered')}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all text-center border cursor-pointer ${
                    meta.status === 'mastered'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border-emerald-400 font-bold shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
                  }`}
                >
                  Mastered
                </button>
              </div>
            </div>
          </div>

          {/* Complexity Badges & Key Technique */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {node.timeComplexity && (
              <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] text-blue-700 dark:text-blue-300 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Time Complexity</span>
                </div>
                <div className="text-base font-mono font-extrabold text-blue-900 dark:text-blue-100">
                  {node.timeComplexity}
                </div>
              </div>
            )}

            {node.spaceComplexity && (
              <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] text-purple-700 dark:text-purple-300 font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Space Complexity</span>
                </div>
                <div className="text-base font-mono font-extrabold text-purple-900 dark:text-purple-100">
                  {node.spaceComplexity}
                </div>
              </div>
            )}

            {node.keyTechnique && (
              <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-0.5 md:col-span-1">
                <div className="flex items-center gap-1.5 text-[11px] text-amber-800 dark:text-amber-300 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Key Pattern Technique</span>
                </div>
                <p className="text-xs text-amber-900 dark:text-amber-200 leading-snug font-medium">
                  {node.keyTechnique}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Code Snippet & Implementation Section */}
        {activeSnippet && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                    Algorithm Pattern Implementation
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Production-ready template for interview whiteboard or online judge submissions.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Switcher */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-bold">
                  <button
                    onClick={() => setSelectedLang('cpp')}
                    className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer ${
                      selectedLang === 'cpp'
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    C++
                  </button>
                  <button
                    onClick={() => setSelectedLang('js')}
                    className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer ${
                      selectedLang === 'js'
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    JavaScript
                  </button>
                </div>

                <button
                  onClick={copyCode}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  title="Expand Code View"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-800"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="relative group">
              <pre className="p-3.5 bg-slate-950 text-emerald-400 dark:text-emerald-300 rounded-xl text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed border border-slate-800 shadow-inner whitespace-pre font-normal max-h-80">
                <code>{activeSnippet}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Practice Problems Section */}
        {node.leetcodeProblems && node.leetcodeProblems.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Curated Practice Problems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {node.leetcodeProblems.map((prob, idx) => {
                const searchUrl = `https://leetcode.com/problemset/all/?search=${encodeURIComponent(
                  prob.name
                )}`;
                const diffColor =
                  prob.difficulty === 'Easy'
                    ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
                    : prob.difficulty === 'Medium'
                    ? 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800'
                    : 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';

                return (
                  <a
                    key={idx}
                    href={searchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-2xs flex items-center justify-between group transition-all"
                  >
                    <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-xs">
                      {prob.name}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
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

        {/* User Personal Study Notes */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2">
          <label className="text-xs font-bold text-slate-900 dark:text-white block">
            Personal Notes & Insights
          </label>
          <textarea
            value={meta.notes || ''}
            onChange={(e) => onUpdateMeta(node.id, { notes: e.target.value })}
            placeholder="Document key insights, edge cases, time complexity proofs, or custom notes..."
            rows={3}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 dark:text-slate-200 resize-none"
          />
        </div>

        {/* Next & Previous Topic Sequential Footer Navigation */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prevNode ? (
            <button
              onClick={() => onSelectNode(prevNode.id)}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 text-left group transition-all cursor-pointer flex items-center gap-2.5"
            >
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Previous Topic
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate block">
                  {prevNode.title}
                </span>
              </div>
            </button>
          ) : <div />}

          {nextNode ? (
            <button
              onClick={() => onSelectNode(nextNode.id)}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 text-right group transition-all cursor-pointer flex items-center justify-end gap-2.5"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Next Topic
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate block">
                  {nextNode.title}
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ) : <div />}
        </div>
      </div>

      {/* Code Modal Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {node.title} — {selectedLang === 'cpp' ? 'C++' : 'JavaScript'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Time: {node.timeComplexity || 'O(N)'} | Space: {node.spaceComplexity || 'O(1)'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-bold">
                  <button
                    onClick={() => setSelectedLang('cpp')}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      selectedLang === 'cpp'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    C++
                  </button>
                  <button
                    onClick={() => setSelectedLang('js')}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
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
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close Pop-up"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-auto flex-1 bg-slate-950">
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
