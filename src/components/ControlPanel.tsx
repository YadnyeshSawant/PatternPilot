import React from 'react';
import { GitGraph, Award } from 'lucide-react';
import { DSANode, UserNodeMeta } from '../types';

interface Props {
  treeData?: Record<string, DSANode>;
  userMeta?: Record<string, UserNodeMeta>;
}

export const ControlPanel: React.FC<Props> = ({ treeData = {}, userMeta = {} }) => {
  const totalNodes = Math.max(0, Object.keys(treeData).length - 1); // exclude root
  let masteredCount = 0;

  (Object.entries(userMeta) as [string, UserNodeMeta][]).forEach(([id, meta]) => {
    if (id === 'root') return;
    if (meta.status === 'mastered') masteredCount++;
  });

  const percentage = totalNodes > 0 ? Math.round((masteredCount / totalNodes) * 100) : 0;

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3 sm:px-4 py-2 sm:py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20">
            <GitGraph className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
              <span>PatternPilot</span>
            </h1>
          </div>
        </div>

        {/* Right Corner: Curriculum Mastery Progress */}
        <div className="flex items-center gap-2 sm:gap-2.5 bg-slate-100 dark:bg-slate-800/80 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-2xs">
          <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
          <span className="text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
            <span className="hidden md:inline">Curriculum </span>Mastery: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{masteredCount}</span> / {totalNodes} <span className="hidden xs:inline">({percentage}%)</span>
          </span>
          <div className="w-16 sm:w-28 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
