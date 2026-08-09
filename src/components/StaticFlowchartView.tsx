import React, { useState } from 'react';
import { DSANode, UserNodeMeta, NodeCategory } from '../types';
import { CATEGORY_COLORS } from '../data/dsaData';
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  CheckCircle2,
  BookOpen,
  Bookmark,
  Code2,
  ExternalLink,
  Layers,
  ArrowRight,
  Search,
  Sparkles,
  Trophy,
  FolderTree
} from 'lucide-react';

interface Props {
  treeData: Record<string, DSANode>;
  collapsedNodeIds: Set<string>;
  userMeta: Record<string, UserNodeMeta>;
  selectedNodeId: string | null;
  searchQuery: string;
  onSearchChange?: (query: string) => void;
  searchResultsCount?: number;
  syllabusMode?: 'all' | 'mandatory' | 'advanced';
  filterMode: 'all' | 'bookmarked' | 'mastered' | 'learning';
  onToggleCollapse: (nodeId: string) => void;
  onSelectNode: (nodeId: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export const StaticFlowchartView: React.FC<Props> = ({
  treeData,
  collapsedNodeIds,
  userMeta,
  selectedNodeId,
  searchQuery,
  onSearchChange,
  searchResultsCount = 0,
  syllabusMode = 'all',
  filterMode,
  onToggleCollapse,
  onSelectNode,
  onExpandAll,
  onCollapseAll
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewStyle, setViewStyle] = useState<'flowchart' | 'tree' | 'grid'>('flowchart');

  // Root node and top-level categories
  const rootNode = treeData['root'];
  const categoryIds = rootNode?.childrenIds || [];

  // Filter category IDs based on syllabusMode (1-16 vs 17-19) and selectedCategory dropdown
  const filteredCategoryIds = categoryIds.filter((catId) => {
    const catNode = treeData[catId];
    if (!catNode) return false;

    // Syllabus Mode filter
    const catNum = parseInt(catId, 10);
    if (syllabusMode === 'mandatory' && (isNaN(catNum) || catNum < 1 || catNum > 16)) {
      return false;
    }
    if (syllabusMode === 'advanced' && (isNaN(catNum) || catNum < 17 || catNum > 19)) {
      return false;
    }

    if (selectedCategory !== 'all' && catNode.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  // Available categories for current syllabus mode (for dropdown options)
  const syllabusCategoryIds = categoryIds.filter((catId) => {
    const catNum = parseInt(catId, 10);
    if (syllabusMode === 'mandatory') return !isNaN(catNum) && catNum >= 1 && catNum <= 16;
    if (syllabusMode === 'advanced') return !isNaN(catNum) && catNum >= 17 && catNum <= 19;
    return true;
  });

  // Check if a node matches search or filter
  const isNodeVisible = (nodeId: string): boolean => {
    const node = treeData[nodeId];
    if (!node) return false;

    // Filter mode check
    const meta = userMeta[nodeId] || { status: 'not_started' };
    if (filterMode === 'bookmarked' && !meta.isBookmarked) return false;
    if (filterMode === 'mastered' && meta.status !== 'mastered') return false;
    if (filterMode === 'learning' && meta.status !== 'learning') return false;

    // Search query check
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchSelf =
        node.title.toLowerCase().includes(q) ||
        node.category.toLowerCase().includes(q) ||
        node.description?.toLowerCase().includes(q) ||
        node.keyTechnique?.toLowerCase().includes(q);
      
      if (matchSelf) return true;

      // Check if any child matches
      const hasMatchingChild = (node.childrenIds || []).some((childId) => isNodeVisible(childId));
      return hasMatchingChild;
    }

    return true;
  };

  // Helper to render recursively in Flowchart style
  const renderFlowchartNode = (nodeId: string, depth: number = 0) => {
    const node = treeData[nodeId];
    if (!node) return null;
    if (!isNodeVisible(nodeId)) return null;

    const isCollapsed = collapsedNodeIds.has(nodeId);
    const hasChildren = node.childrenIds && node.childrenIds.length > 0;
    const isSelected = selectedNodeId === nodeId;
    const meta = userMeta[nodeId] || { status: 'not_started' };

    const categoryStyle = CATEGORY_COLORS[node.category] || {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-800 dark:text-slate-200',
      border: 'border-slate-300 dark:border-slate-700',
      accent: '#6366f1'
    };

    const isSearchMatch =
      searchQuery.trim() !== '' &&
      (node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description?.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <div key={nodeId} className="flex flex-col items-start w-full relative">
        {/* Card Box */}
        <div
          onClick={() => onSelectNode(nodeId)}
          className={`group relative w-full rounded-xl border-2 p-3 sm:p-4 transition-all duration-150 cursor-pointer shadow-xs ${
            isSelected
              ? 'border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500/30 bg-white dark:bg-slate-900 shadow-md'
              : isSearchMatch
              ? 'border-amber-500 bg-amber-50/80 dark:bg-slate-900 ring-2 ring-amber-500/30'
              : `${categoryStyle.border} bg-white dark:bg-slate-900/90 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-sm`
          }`}
        >
          {/* Header row */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span
                style={{ backgroundColor: categoryStyle.accent }}
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              />
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                {node.category}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {meta.isBookmarked && <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />}
              {meta.status === 'mastered' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mastered</span>
                </span>
              )}
              {meta.status === 'learning' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Learning</span>
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
            {node.title}
          </h3>

          {/* Key Technique or Brief Description */}
          {node.description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {node.description}
            </p>
          )}

          {/* Bottom stats & toggle */}
          <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3 font-mono">
              {node.timeComplexity && (
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 font-medium">
                  Time: {node.timeComplexity}
                </span>
              )}
              {node.spaceComplexity && (
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 font-medium hidden sm:inline">
                  Space: {node.spaceComplexity}
                </span>
              )}
              {node.leetcodeProblems && node.leetcodeProblems.length > 0 && (
                <span className="text-indigo-600 dark:text-indigo-400 font-sans font-semibold">
                  {node.leetcodeProblems.length} LeetCode problem{node.leetcodeProblems.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {node.codeSnippet && (
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                  <Code2 className="w-3 h-3 text-indigo-500" />
                  <span>Code</span>
                </span>
              )}

              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCollapse(nodeId);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 font-semibold text-xs flex items-center gap-1 transition-colors text-slate-700 dark:text-slate-300"
                >
                  <span>{isCollapsed ? `Expand (${node.childrenIds?.length})` : 'Hide'}</span>
                  {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Children Branch Render */}
        {hasChildren && !isCollapsed && (
          <div className="pl-2 sm:pl-6 border-l-2 border-slate-200 dark:border-slate-800 mt-2 sm:mt-3 space-y-2 sm:space-y-3 w-full">
            {node.childrenIds!.map((childId) => renderFlowchartNode(childId, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Advanced DSA Banner
  const renderAdvancedDsaBanner = () => (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 border border-red-500/30 p-4 sm:p-8 text-white shadow-xl my-4 sm:my-6">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[11px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            Competitive Programming & Research
          </span>
        </div>
        <div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5 sm:gap-3">
            <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400" />
            <span>ADVANCED DSA</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-medium leading-relaxed">
            High-level algorithms and data structures designed for elite competitive programming, research, and top-tier algorithmic contests.
          </p>
        </div>
        <div className="pt-1 sm:pt-2">
          <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Mainly Useful For:</h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              'Codeforces Expert+',
              'ICPC',
              'Google Kick Start–style contests',
              'Meta Hacker Cup',
              'Advanced competitive programming',
              'Top-tier research/algorithmic interviews'
            ].map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] sm:text-xs font-semibold text-red-200 flex items-center gap-1.5 shadow-2xs"
              >
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render Overview Directory Index Row
  const renderOverviewRow = (nodeId: string, indexStr: string, isLastChild: boolean) => {
    const node = treeData[nodeId];
    if (!node || !isNodeVisible(nodeId)) return null;

    const isSelected = selectedNodeId === nodeId;
    const meta = userMeta[nodeId] || { status: 'not_started' };
    const questionsCount = node.questions?.length || 0;

    const isSearchMatch =
      searchQuery.trim() !== '' &&
      (node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description?.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <div key={nodeId} className="relative group">
        <div
          onClick={() => onSelectNode(nodeId)}
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2.5 px-3 sm:px-4 my-1 rounded-xl border transition-all cursor-pointer ${
            isSelected
              ? 'bg-indigo-50/90 dark:bg-indigo-950/80 border-indigo-500 shadow-xs ring-1 ring-indigo-500/50'
              : isSearchMatch
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400'
              : 'bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 hover:bg-indigo-50/50 dark:hover:bg-slate-800/70 hover:border-indigo-300 dark:hover:border-indigo-700'
          }`}
        >
          {/* Left: Tree Connector symbol + Topic Link */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="font-mono text-xs text-slate-400 dark:text-slate-500 shrink-0 select-none">
              {isLastChild ? '└──' : '├──'}
            </span>

            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-200/60 dark:border-indigo-800/60 shrink-0">
              {indexStr}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(nodeId);
              }}
              className="text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors hover:underline truncate cursor-pointer"
            >
              {node.title}
            </button>
          </div>

          {/* Center & Right Metadata Tags & Quick Link */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto pl-6 sm:pl-0">
            {node.timeComplexity && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hidden md:inline-block">
                {node.timeComplexity}
              </span>
            )}

            {questionsCount > 0 && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80 hidden sm:inline-block">
                {questionsCount} {questionsCount === 1 ? 'question' : 'questions'}
              </span>
            )}

            {meta.isBookmarked && <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />}

            {meta.status === 'mastered' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3 h-3" />
                <span>Mastered</span>
              </span>
            ) : meta.status === 'learning' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                <BookOpen className="w-3 h-3" />
                <span>Learning</span>
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-800/50">
                Unvisited
              </span>
            )}

            {/* Jump Link Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(nodeId);
              }}
              className="p-1.5 rounded-lg text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Open Topic Details"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recursive Subchildren if any */}
        {node.childrenIds && node.childrenIds.length > 0 && !collapsedNodeIds.has(nodeId) && (
          <div className="pl-4 sm:pl-6 border-l-2 border-indigo-200/50 dark:border-indigo-900/40 ml-3 sm:ml-4">
            {node.childrenIds.map((childId, subIdx) =>
              renderOverviewRow(
                childId,
                `${indexStr}.${subIdx + 1}`,
                subIdx === node.childrenIds!.length - 1
              )
            )}
          </div>
        )}
      </div>
    );
  };

  // Render Complete Syllabus Summary Index
  const renderOverviewSection = () => (
    <div className="space-y-6">
      {/* Overview Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-indigo-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 text-indigo-300">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              Syllabus Summary Directory
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mt-0.5">
              Complete ordered index of all 19 Data Structures & Algorithms modules. Click any topic title to view C++ source code, problem maps, and study notes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
          <button
            onClick={onExpandAll}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
          >
            Expand All
          </button>
          <button
            onClick={onCollapseAll}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Ordered Category Sections */}
      <div className="space-y-4">
        {filteredCategoryIds.map((catId, catIdx) => {
          const catNode = treeData[catId];
          if (!catNode || !isNodeVisible(catId)) return null;

          const isCatCollapsed = collapsedNodeIds.has(catId);
          const children = catNode.childrenIds || [];
          const sectionNum = catIdx + 1;

          // Calculate section progress
          let sectionMastered = 0;
          children.forEach((cId) => {
            if (userMeta[cId]?.status === 'mastered') sectionMastered++;
          });

          return (
            <React.Fragment key={catId}>
              {catId === '17' && (
                <div className="my-6 pt-4 border-t-2 border-dashed border-red-300 dark:border-red-900/60">
                  <div className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-transparent p-4 rounded-2xl border border-red-500/20 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <h3 className="text-sm font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wider">
                        Advanced DSA Sections (17 – 19)
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Competitive programming & interview mastery: Segment Trees, Disjoint Set Union (DSU), and Advanced Graph Algorithms.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 transition-all">
                {/* Category Section Header */}
                <div
                  onClick={() => onToggleCollapse(catId)}
                  className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800 cursor-pointer group select-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      {sectionNum < 10 ? `0${sectionNum}` : sectionNum}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                          {catNode.title}
                        </h3>
                        {catId === '17' || catId === '18' || catId === '19' ? (
                          <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-800/60">
                            ADVANCED
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {catNode.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                      {sectionMastered} / {children.length} Mastered
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCollapse(catId);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      {isCatCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Subtopic Rows */}
                {!isCatCollapsed && (
                  <div className="pt-2">
                    {children.length > 0 ? (
                      children.map((childId, childIdx) =>
                        renderOverviewRow(
                          childId,
                          `${sectionNum}.${childIdx + 1}`,
                          childIdx === children.length - 1
                        )
                      )
                    ) : (
                      <p className="text-xs text-slate-400 italic py-2 pl-4">No subtopics available in this category.</p>
                    )}
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

  return (
    <div id="mindmap-viewport" className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6 space-y-4 sm:space-y-6">
      {/* Category Selection Dropdown & View Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Category Select Dropdown */}
        <div className="flex items-center gap-2 flex-1 max-w-xs w-full">
          <label htmlFor="category-select" className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap shrink-0">
            Category:
          </label>
          <div className="relative w-full">
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-3 pr-8 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none transition-all truncate"
            >
              <option value="all">All Categories ({syllabusCategoryIds.length} Topics)</option>
              {syllabusCategoryIds.map((catId) => {
                const catNode = treeData[catId];
                if (!catNode) return null;
                return (
                  <option key={catId} value={catNode.category}>
                    {catNode.title}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Centered Search Bar */}
        <div className="relative flex-1 max-w-md mx-auto w-full">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search 100+ topics, Kadane, BFS, DP..."
            className="w-full pl-8 sm:pl-9 pr-14 sm:pr-16 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] sm:text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-2xs transition-all"
          />
          {searchQuery && (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
              {searchResultsCount} found
            </span>
          )}
        </div>

        {/* View Style Switcher & Expand/Collapse */}
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 border-t lg:border-t-0 pt-2.5 lg:pt-0 border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 sm:p-1 rounded-lg sm:rounded-xl">
            <button
              onClick={() => setViewStyle('flowchart')}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md sm:rounded-lg transition-colors cursor-pointer ${
                viewStyle === 'flowchart'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Flowchart
            </button>
            <button
              onClick={() => setViewStyle('tree')}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md sm:rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                viewStyle === 'tree'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <FolderTree className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setViewStyle('grid')}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md sm:rounded-lg transition-colors cursor-pointer ${
                viewStyle === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Grid
            </button>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 sm:p-1 rounded-lg sm:rounded-xl">
            <button
              onClick={onExpandAll}
              className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md sm:rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900 cursor-pointer"
            >
              Expand All
            </button>
            <button
              onClick={onCollapseAll}
              className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md sm:rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900 cursor-pointer"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* Main Flowchart / Tree Overview / Grid View Content Area */}
      {viewStyle === 'flowchart' ? (
        <div className="space-y-8">
          {filteredCategoryIds.map((catId) => {
            const catNode = treeData[catId];
            if (!catNode || !isNodeVisible(catId)) return null;
            const isCatCollapsed = collapsedNodeIds.has(catId);
            const categoryStyle = CATEGORY_COLORS[catNode.category] || {
              bg: 'bg-indigo-50 dark:bg-indigo-950/40',
              text: 'text-indigo-700 dark:text-indigo-300',
              border: 'border-indigo-200 dark:border-indigo-800',
              accent: '#6366f1'
            };

            return (
              <React.Fragment key={catId}>
                {catId === '17' && renderAdvancedDsaBanner()}
                <section
                  className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs"
                >
                {/* Category Header */}
                <div
                  onClick={() => onToggleCollapse(catId)}
                  className={`flex items-center justify-between gap-3 pb-4 cursor-pointer select-none group transition-colors ${
                    !isCatCollapsed ? 'border-b border-slate-200 dark:border-slate-800' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: categoryStyle.accent }}
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform"
                    >
                      {catNode.title.split('.')[0]}
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <span>{catNode.title}</span>
                      </h2>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {catNode.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hidden sm:inline-block">
                      {catNode.childrenIds?.length || 0} Subtopics
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCollapse(catId);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>{isCatCollapsed ? 'Expand Pattern' : 'Collapse Pattern'}</span>
                      {isCatCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Flowchart Subtopics */}
                {!isCatCollapsed && (
                  <div className="space-y-4 pt-2">
                    {catNode.childrenIds?.map((childId) => renderFlowchartNode(childId, 1))}
                  </div>
                )}
              </section>
            </React.Fragment>
          );
        })}
      </div>
    ) : viewStyle === 'tree' ? (
      renderOverviewSection()
    ) : (
      /* Grid View: Grouped by Category with Pattern Cards and Subtopics on selection */
      <div className="space-y-8">
        {filteredCategoryIds.map((catId) => {
          const catNode = treeData[catId];
          if (!catNode || !isNodeVisible(catId)) return null;
          const categoryStyle = CATEGORY_COLORS[catNode.category] || {
            bg: 'bg-indigo-50 dark:bg-indigo-950/40',
            text: 'text-indigo-700 dark:text-indigo-300',
            border: 'border-indigo-200 dark:border-indigo-800',
            accent: '#6366f1'
          };

          const patternIds = (catNode.childrenIds || []).filter((id) => isNodeVisible(id));

          return (
            <React.Fragment key={catId}>
              {catId === '17' && renderAdvancedDsaBanner()}
              <section
                className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs"
              >
                {/* Category Header */}
                <div
                  onClick={() => onSelectNode(catId)}
                  className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: categoryStyle.accent }}
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform"
                    >
                      {catNode.title.split('.')[0]}
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <span>{catNode.title}</span>
                      </h2>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {catNode.description}
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {patternIds.length} Patterns
                  </span>
                </div>

                {/* Level 1 Patterns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {patternIds.map((patternId) => {
                    const patternNode = treeData[patternId];
                    if (!patternNode) return null;
                    const isSelected = selectedNodeId === patternId;
                    const isPatternCollapsed = collapsedNodeIds.has(patternId);
                    const hasSubtopics = patternNode.childrenIds && patternNode.childrenIds.length > 0;
                    const meta = userMeta[patternId] || { status: 'not_started' };

                    return (
                      <div
                        key={patternId}
                        className={`bg-white dark:bg-slate-900 border-2 rounded-2xl p-4 transition-all duration-150 flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md ${
                          isSelected
                            ? 'border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500/30 shadow-md'
                            : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600'
                        }`}
                      >
                        <div
                          onClick={() => onSelectNode(patternId)}
                          className="cursor-pointer space-y-2 group"
                        >
                          {/* Header badges */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                style={{ backgroundColor: categoryStyle.accent }}
                                className="w-2.5 h-2.5 rounded-full"
                              />
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Pattern
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {meta.isBookmarked && <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                              {meta.status === 'mastered' && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Mastered</span>
                                </span>
                              )}
                              {meta.status === 'learning' && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                                  <BookOpen className="w-3 h-3" />
                                  <span>Learning</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                            {patternNode.title}
                          </h3>

                          {/* Description */}
                          {patternNode.description && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {patternNode.description}
                            </p>
                          )}
                        </div>

                        {/* Card Footer & Subtopics */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                            {patternNode.timeComplexity ? (
                              <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 font-medium">
                                Time: {patternNode.timeComplexity}
                              </span>
                            ) : (
                              <span />
                            )}
                            {patternNode.leetcodeProblems && patternNode.leetcodeProblems.length > 0 && (
                              <span className="text-indigo-600 dark:text-indigo-400 font-sans font-semibold">
                                {patternNode.leetcodeProblems.length} LeetCode
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-1">
                            <button
                              onClick={() => onSelectNode(patternId)}
                              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
                            >
                              <span>Details & Code</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            {hasSubtopics && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleCollapse(patternId);
                                }}
                                className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 font-semibold text-[11px] flex items-center gap-1 transition-colors text-slate-700 dark:text-slate-300"
                              >
                                <span>{isPatternCollapsed ? `Subtopics (${patternNode.childrenIds!.length})` : 'Hide Subtopics'}</span>
                                {isPatternCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                            )}
                          </div>

                          {/* Expanded Subtopics inside the card */}
                          {hasSubtopics && !isPatternCollapsed && (
                            <div className="mt-3 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                                Subtopics ({patternNode.childrenIds!.length})
                              </span>
                              <div className="space-y-1.5">
                                {patternNode.childrenIds!.map((subId) => {
                                  const subNode = treeData[subId];
                                  if (!subNode || !isNodeVisible(subId)) return null;
                                  const isSubSelected = selectedNodeId === subId;
                                  const subMeta = userMeta[subId] || { status: 'not_started' };

                                  return (
                                    <div
                                      key={subId}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectNode(subId);
                                      }}
                                      className={`p-2 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                                        isSubSelected
                                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold'
                                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 overflow-hidden">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                                        <span className="truncate font-medium">{subNode.title}</span>
                                      </div>
                                      <div className="flex items-center gap-1 flex-shrink-0">
                                        {subMeta.status === 'mastered' && (
                                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        )}
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </React.Fragment>
          );
        })}
        </div>
      )}
    </div>
  );
};
