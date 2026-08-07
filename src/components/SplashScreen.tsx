import React, { useState, useEffect } from 'react';
import { GitGraph, ArrowRight, Code2, Layers, CheckCircle2, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onDismiss: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on mount
    setIsVisible(true);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl text-white overflow-hidden select-none transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}
    >
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Splash Content Card */}
      <div
        className={`relative max-w-xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/50 text-center flex flex-col items-center gap-6 z-10 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        }`}
      >
        {/* Badge & Logo */}
        <div className="relative">
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-xl shadow-indigo-500/30 flex items-center justify-center ring-4 ring-indigo-500/20 animate-pulse">
            <GitGraph className="w-10 h-10" />
          </div>
          <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
        </div>

        {/* App Title & Tagline */}
        <div className="space-y-2 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Learning Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            PatternPilot
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
            Master 200+ Data Structures & Algorithm topics across <strong>Mandatory DSA</strong> (Interviews) and <strong>Advanced DSA</strong> (Codeforces, ICPC, & Contests).
          </p>
        </div>

        {/* Syllabus Tracks Overview */}
        <div className="grid grid-cols-2 gap-2.5 w-full text-left">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-500/30 flex flex-col justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">Mandatory DSA</h4>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Arrays, Two Pointers, Trees, Graphs, DP, Sorting & Range Structures.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-red-500/30 flex flex-col justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">Advanced DSA</h4>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              SCCs, Flows, Profile DP, Convex Hull Trick, Suffix Automaton & SOS DP.
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-2.5 w-full text-left">
          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-[11px] font-semibold text-slate-200">Flowcharts</h4>
              <p className="text-[9px] text-slate-400">Interactive decision trees</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-[11px] font-semibold text-slate-200">C++ Snippets</h4>
              <p className="text-[9px] text-slate-400">Production code templates</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-1.5">
          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span>Initializing workspace...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="w-full pt-1">
          <button
            onClick={handleEnter}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer group"
          >
            <span>{progress >= 100 ? 'Explore Pattern Roadmap' : 'Enter Roadmap'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

