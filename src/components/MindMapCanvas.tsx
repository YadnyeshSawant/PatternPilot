import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  DSANode,
  LayoutMode,
  ViewportState,
  UserNodeMeta
} from '../types';
import { CalculatedNodePos } from '../utils/layoutEngine';
import { CATEGORY_COLORS } from '../data/dsaData';
import { Plus, Minus, CheckCircle2, BookOpen, Bookmark, Move, ChevronRight } from 'lucide-react';

interface Props {
  treeData: Record<string, DSANode>;
  positions: Record<string, CalculatedNodePos>;
  collapsedNodeIds: Set<string>;
  userMeta: Record<string, UserNodeMeta>;
  selectedNodeId: string | null;
  searchQuery: string;
  layoutMode: LayoutMode;
  viewport: ViewportState;
  onViewportChange: (vp: ViewportState) => void;
  onToggleCollapse: (nodeId: string) => void;
  onSelectNode: (nodeId: string) => void;
  onUpdateNodeOffset: (nodeId: string, dx: number, dy: number) => void;
}

export const MindMapCanvas: React.FC<Props> = ({
  treeData,
  positions,
  collapsedNodeIds,
  userMeta,
  selectedNodeId,
  searchQuery,
  layoutMode,
  viewport,
  onViewportChange,
  onToggleCollapse,
  onSelectNode,
  onUpdateNodeOffset
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pan & Drag States
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle Canvas Background Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan if clicking on canvas background or SVG
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'canvas-bg') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      onViewportChange({
        ...viewport,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    } else if (draggingNodeId) {
      const deltaX = (e.clientX - dragStart.x) / viewport.zoom;
      const deltaY = (e.clientY - dragStart.y) / viewport.zoom;
      onUpdateNodeOffset(draggingNodeId, deltaX, deltaY);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, [isPanning, draggingNodeId, panStart, dragStart, viewport, onViewportChange, onUpdateNodeOffset]);

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
  };

  // Wheel Zooming
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    const newZoom = Math.min(Math.max(0.2, viewport.zoom * zoomFactor), 2.5);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Adjust viewport pan to zoom towards mouse cursor position
      const newX = mouseX - (mouseX - viewport.x) * (newZoom / viewport.zoom);
      const newY = mouseY - (mouseY - viewport.y) * (newZoom / viewport.zoom);

      onViewportChange({ x: newX, y: newY, zoom: newZoom });
    }
  }, [viewport, onViewportChange]);

  // Handle Node Mouse Down for Dragging
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setDraggingNodeId(nodeId);
    setDragStart({ x: e.clientX, y: e.clientY });
    onSelectNode(nodeId);
  };

  // Generate Bezier connecting path between parent and child nodes
  const renderConnectionPath = (parentId: string, childId: string) => {
    const parentPos = positions[parentId];
    const childPos = positions[childId];
    if (!parentPos || !childPos) return null;

    const parentNode = treeData[parentId];
    const categoryStyle = CATEGORY_COLORS[parentNode?.category || 'Array'];
    const strokeColor = categoryStyle?.accent || '#6366f1';

    let pathD = '';

    if (layoutMode === 'tree-right') {
      const x1 = parentPos.x + parentPos.width;
      const y1 = parentPos.y + parentPos.height / 2;
      const x2 = childPos.x;
      const y2 = childPos.y + childPos.height / 2;
      const controlDist = Math.abs(x2 - x1) * 0.45;
      pathD = `M ${x1} ${y1} C ${x1 + controlDist} ${y1}, ${x2 - controlDist} ${y2}, ${x2} ${y2}`;
    } else if (layoutMode === 'mindmap') {
      const isChildLeft = childPos.isLeftBranch;
      const x1 = isChildLeft ? parentPos.x : parentPos.x + parentPos.width;
      const y1 = parentPos.y + parentPos.height / 2;
      const x2 = isChildLeft ? childPos.x + childPos.width : childPos.x;
      const y2 = childPos.y + childPos.height / 2;
      const controlDist = Math.abs(x2 - x1) * 0.45;
      pathD = `M ${x1} ${y1} C ${x1 + (isChildLeft ? -controlDist : controlDist)} ${y1}, ${x2 + (isChildLeft ? controlDist : -controlDist)} ${y2}, ${x2} ${y2}`;
    } else {
      // Flowchart Vertical
      const x1 = parentPos.x + parentPos.width / 2;
      const y1 = parentPos.y + parentPos.height;
      const x2 = childPos.x + childPos.width / 2;
      const y2 = childPos.y;
      const controlDist = Math.abs(y2 - y1) * 0.45;
      pathD = `M ${x1} ${y1} C ${x1} ${y1 + controlDist}, ${x2} ${y2 - controlDist}, ${x2} ${y2}`;
    }

    return (
      <path
        key={`${parentId}-${childId}`}
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={selectedNodeId === parentId || selectedNodeId === childId ? 3 : 2}
        strokeOpacity={selectedNodeId === parentId || selectedNodeId === childId ? 0.9 : 0.45}
        className="transition-all duration-300 pointer-events-none"
      />
    );
  };

  // Collect all parent-child connections
  const connections: React.ReactNode[] = [];
  Object.keys(positions).forEach((parentId) => {
    if (collapsedNodeIds.has(parentId)) return;
    const parentNode = treeData[parentId];
    if (parentNode && parentNode.childrenIds) {
      parentNode.childrenIds.forEach((childId) => {
        if (positions[childId]) {
          connections.push(renderConnectionPath(parentId, childId));
        }
      });
    }
  });

  return (
    <div
      id="mindmap-viewport"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      className="relative w-full h-[calc(100vh-60px)] overflow-hidden bg-slate-50 dark:bg-slate-950 select-none cursor-grab active:cursor-grabbing"
    >
      {/* Canvas SVG Grid Pattern Background */}
      <svg id="canvas-bg" className="absolute inset-0 w-full h-full pointer-events-auto">
        <defs>
          <pattern id="dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="1.2" className="fill-slate-300 dark:fill-slate-800" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Main Scalable Viewport Canvas Container */}
      <div
        id="dsa-mindmap-canvas"
        style={{
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          transformOrigin: '0 0'
        }}
        className="absolute inset-0 transition-transform duration-75 ease-out pointer-events-none"
      >
        {/* SVG Bezier Lines Layer */}
        <svg className="absolute overflow-visible top-0 left-0 w-full h-full pointer-events-none">
          {connections}
        </svg>

        {/* HTML Node Cards Layer */}
        {Object.keys(positions).map((nodeId) => {
          const pos = positions[nodeId];
          const node = treeData[nodeId];
          if (!pos || !node) return null;

          const isCollapsed = collapsedNodeIds.has(nodeId);
          const hasChildren = node.childrenIds && node.childrenIds.length > 0;
          const isSelected = selectedNodeId === nodeId;
          const meta = userMeta[nodeId] || { status: 'not_started' };

          // Search match filter
          const isSearchMatch =
            searchQuery.trim() !== '' &&
            (node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              node.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              node.description?.toLowerCase().includes(searchQuery.toLowerCase()));

          const categoryStyle = CATEGORY_COLORS[node.category] || {
            bg: 'bg-slate-100 dark:bg-slate-800',
            text: 'text-slate-800 dark:text-slate-200',
            border: 'border-slate-300 dark:border-slate-700',
            accent: '#6366f1'
          };

          return (
            <div
              key={nodeId}
              onMouseDown={(e) => handleNodeMouseDown(e, nodeId)}
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                width: `${pos.width}px`,
                height: `${pos.height}px`
              }}
              className={`absolute pointer-events-auto rounded-2xl border-2 shadow-sm p-3 flex flex-col justify-between transition-shadow duration-150 group cursor-grab active:cursor-grabbing ${
                isSelected
                  ? 'border-indigo-600 dark:border-indigo-400 ring-4 ring-indigo-500/20 shadow-lg scale-102 z-20 bg-white dark:bg-slate-900'
                  : isSearchMatch
                  ? 'border-amber-500 ring-4 ring-amber-500/30 z-20 bg-amber-50/90 dark:bg-slate-900'
                  : `${categoryStyle.border} ${categoryStyle.bg} bg-white dark:bg-slate-900/90 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md`
              }`}
            >
              {/* Card Header row */}
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span
                    style={{ backgroundColor: categoryStyle.accent }}
                    className="w-2 h-2 rounded-full flex-shrink-0"
                  />
                  <span className="text-[10px] font-bold tracking-tight uppercase truncate text-slate-500 dark:text-slate-400">
                    {node.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {meta.isBookmarked && (
                    <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  )}
                  {meta.status === 'mastered' && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                  {meta.status === 'learning' && (
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </div>
              </div>

              {/* Title & Level */}
              <div className="my-0.5">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                  {node.title}
                </h3>
              </div>

              {/* Card Footer row & Expand Toggle */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 pt-1 mt-0.5">
                <span className="font-mono text-[9px] opacity-75">
                  {node.timeComplexity ? node.timeComplexity.split(' ')[0] : `L${node.level}`}
                </span>

                {hasChildren && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCollapse(nodeId);
                    }}
                    title={isCollapsed ? 'Expand Children' : 'Collapse Branch'}
                    className="p-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all flex items-center justify-center -mr-1"
                  >
                    {isCollapsed ? (
                      <Plus className="w-3 h-3 stroke-[3]" />
                    ) : (
                      <Minus className="w-3 h-3 stroke-[3]" />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
