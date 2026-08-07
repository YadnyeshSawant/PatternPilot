import React from 'react';
import { DSANode, UserNodeMeta } from '../types';
import { CheckCircle2, Bookmark, BookOpen, Layers, Trophy } from 'lucide-react';

export type SyllabusMode = 'all' | 'mandatory' | 'advanced';

interface Props {
  treeData: Record<string, DSANode>;
  userMeta: Record<string, UserNodeMeta>;
  syllabusMode: SyllabusMode;
  onSyllabusModeChange: (mode: SyllabusMode) => void;
  filterMode: 'all' | 'bookmarked' | 'mastered' | 'learning';
  onFilterModeChange: (mode: 'all' | 'bookmarked' | 'mastered' | 'learning') => void;
}

export const StatsBar: React.FC<Props> = ({
  treeData,
  userMeta,
  syllabusMode,
  onSyllabusModeChange,
  filterMode,
  onFilterModeChange
}) => {
  const totalNodes = Object.keys(treeData).length - 1; // exclude root
  let masteredCount = 0;
  let learningCount = 0;
  let bookmarkedCount = 0;

  (Object.entries(userMeta) as [string, UserNodeMeta][]).forEach(([id, meta]) => {
    if (id === 'root') return;
    if (meta.status === 'mastered') masteredCount++;
    if (meta.status === 'learning') learningCount++;
    if (meta.isBookmarked) bookmarkedCount++;
  });

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2 text-xs text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Syllabus Selection Toggle Button Group */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => onSyllabusModeChange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              syllabusMode === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Syllabus</span>
          </button>

          <button
            onClick={() => onSyllabusModeChange('mandatory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              syllabusMode === 'mandatory'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mandatory DSA</span>
          </button>

          <button
            onClick={() => onSyllabusModeChange('advanced')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              syllabusMode === 'advanced'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Advanced DSA</span>
          </button>
        </div>

        {/* Node Status Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onFilterModeChange('all')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            All Nodes ({totalNodes})
          </button>
          <button
            onClick={() => onFilterModeChange('bookmarked')}
            className={`px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              filterMode === 'bookmarked'
                ? 'bg-amber-500 text-white font-bold'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100'
            }`}
          >
            <Bookmark className="w-3 h-3 fill-current" />
            <span>Bookmarked ({bookmarkedCount})</span>
          </button>
          <button
            onClick={() => onFilterModeChange('mastered')}
            className={`px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              filterMode === 'mastered'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Mastered ({masteredCount})</span>
          </button>
          <button
            onClick={() => onFilterModeChange('learning')}
            className={`px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              filterMode === 'learning'
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Learning ({learningCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
