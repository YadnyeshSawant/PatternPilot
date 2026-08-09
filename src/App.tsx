/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { dsaTreeData } from './data/dsaData';
import { UserNodeMeta } from './types';
import { ControlPanel } from './components/ControlPanel';
import { StatsBar } from './components/StatsBar';
import { StaticFlowchartView } from './components/StaticFlowchartView';
import { TopicDetailPage } from './components/TopicDetailPage';
import { GitHubPagesModal } from './components/GitHubPagesModal';
import { SplashScreen } from './components/SplashScreen';
import { updateSEOMetadata } from './utils/seo';

export default function App() {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState<boolean>(true);
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Collapsed Nodes State (Start with all nodes having children collapsed by default)
  const [collapsedNodeIds, setCollapsedNodeIds] = useState<Set<string>>(() => {
    const initialSet = new Set<string>();
    Object.values(dsaTreeData).forEach((node) => {
      // Level 1+ nodes with children start collapsed so subtopics are hidden until selected
      if (node.level >= 1 && node.childrenIds && node.childrenIds.length > 0) {
        initialSet.add(node.id);
      }
    });
    return initialSet;
  });

  // User Mastery & Bookmark Metadata
  const [userMeta, setUserMeta] = useState<Record<string, UserNodeMeta>>(() => {
    const saved = localStorage.getItem('dsa_mindmap_usermeta');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('dsa_mindmap_usermeta', JSON.stringify(userMeta));
  }, [userMeta]);

  // Controls & Selection
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Select node handler: auto-expands subtopics when a pattern/node is selected and syncs URL ?topic=
  const handleSelectNode = useCallback((nodeId: string, pushHistory = true) => {
    setSelectedNodeId(nodeId);
    setCollapsedNodeIds((prev) => {
      if (prev.has(nodeId)) {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      }
      return prev;
    });

    if (pushHistory) {
      const url = new URL(window.location.href);
      if (url.searchParams.get('topic') !== nodeId) {
        url.searchParams.set('topic', nodeId);
        window.history.pushState({ topic: nodeId }, '', url.toString());
      }
    }
  }, []);

  // Close node details drawer and remove ?topic= query parameter
  const handleCloseNode = useCallback((pushHistory = true) => {
    setSelectedNodeId(null);

    if (pushHistory) {
      const url = new URL(window.location.href);
      if (url.searchParams.has('topic')) {
        url.searchParams.delete('topic');
        window.history.pushState({ topic: null }, '', url.toString());
      }
    }
  }, []);

  // Sync with browser Back/Forward buttons and initial URL ?topic= parameter
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const topicFromUrl = params.get('topic');
      if (topicFromUrl && dsaTreeData[topicFromUrl]) {
        handleSelectNode(topicFromUrl, false);
      } else {
        handleCloseNode(false);
      }
    };

    // Initial sync on mount
    syncFromUrl();

    // Listen to browser Back/Forward navigation
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [handleSelectNode, handleCloseNode]);
  const [searchQuery, setSearchQuery] = useState('');
  const [syllabusMode, setSyllabusMode] = useState<'all' | 'mandatory' | 'advanced'>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'bookmarked' | 'mastered' | 'learning'>('all');
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle node collapse/expand
  const handleToggleCollapse = useCallback((nodeId: string) => {
    setCollapsedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  // Update user node metadata
  const handleUpdateMeta = (id: string, updates: Partial<UserNodeMeta>) => {
    setUserMeta((prev) => {
      const current = prev[id] || { status: 'not_started' };
      return {
        ...prev,
        [id]: { ...current, ...updates }
      };
    });
  };

  // Search results count
  const searchResultsCount = useMemo(() => {
    if (!searchQuery.trim()) return 0;
    const query = searchQuery.toLowerCase();
    return Object.values(dsaTreeData).filter(
      (node) =>
        node.id !== 'root' &&
        (node.title.toLowerCase().includes(query) ||
          node.category.toLowerCase().includes(query) ||
          node.description?.toLowerCase().includes(query))
    ).length;
  }, [searchQuery]);

  // Expand / Collapse All
  const handleExpandAll = () => {
    setCollapsedNodeIds(new Set());
    showToast('Expanded all topics and patterns');
  };

  const handleCollapseAll = () => {
    const allWithChildren = new Set<string>();
    Object.values(dsaTreeData).forEach((node) => {
      if (node.childrenIds && node.childrenIds.length > 0) {
        allWithChildren.add(node.id);
      }
    });
    setCollapsedNodeIds(allWithChildren);
    showToast('Collapsed all topics and patterns');
  };

  const selectedNode = selectedNodeId ? dsaTreeData[selectedNodeId] || null : null;
  const selectedNodeMeta = selectedNodeId ? userMeta[selectedNodeId] || { status: 'not_started' } : { status: 'not_started' };

  // Update SEO Head Tags & Schema.org JSON-LD dynamically
  useEffect(() => {
    updateSEOMetadata(selectedNode);
  }, [selectedNode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-200">
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen onDismiss={() => setShowSplash(false)} />
      )}

      {/* Top Controls Header with Curriculum Mastery in Right Corner */}
      <ControlPanel
        treeData={dsaTreeData}
        userMeta={userMeta}
      />

      {selectedNode ? (
        /* Full-Page Dedicated Topic Detail View */
        <main className="relative flex-1">
          <TopicDetailPage
            node={selectedNode}
            meta={selectedNodeMeta}
            onClose={() => handleCloseNode()}
            onSelectNode={(id) => handleSelectNode(id)}
            onUpdateMeta={handleUpdateMeta}
          />
        </main>
      ) : (
        /* Main Syllabus Flowchart / Tree / Overview View */
        <>
          {/* Syllabus Selection & Filter Bar */}
          <StatsBar
            treeData={dsaTreeData}
            userMeta={userMeta}
            syllabusMode={syllabusMode}
            onSyllabusModeChange={setSyllabusMode}
            filterMode={filterMode}
            onFilterModeChange={setFilterMode}
          />

          <main className="relative flex-1">
            <StaticFlowchartView
              treeData={dsaTreeData}
              collapsedNodeIds={collapsedNodeIds}
              userMeta={userMeta}
              selectedNodeId={selectedNodeId}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchResultsCount={searchResultsCount}
              syllabusMode={syllabusMode}
              filterMode={filterMode}
              onToggleCollapse={handleToggleCollapse}
              onSelectNode={handleSelectNode}
              onExpandAll={handleExpandAll}
              onCollapseAll={handleCollapseAll}
            />
          </main>
        </>
      )}

      {/* Deploy to GitHub Pages Modal */}
      <GitHubPagesModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-slate-900/90 text-white dark:bg-slate-100 dark:text-slate-900 rounded-xl text-xs font-semibold shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  );
}


