import { DSANode, LayoutMode } from '../types';

export interface CalculatedNodePos {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isLeftBranch?: boolean;
}

export function computeLayout(
  treeData: Record<string, DSANode>,
  collapsedNodeIds: Set<string>,
  customOffsets: Record<string, { dx: number; dy: number }>,
  mode: LayoutMode = 'tree-right'
): { positions: Record<string, CalculatedNodePos>; totalWidth: number; totalHeight: number } {
  const positions: Record<string, CalculatedNodePos> = {};

  const NODE_WIDTH = 220;
  const NODE_HEIGHT = 64;
  const X_GAP = 100;
  const Y_GAP = 28;

  // Helper to count visible leaves in subtree to assign vertical coordinates
  function getSubtreeLeafCount(nodeId: string): number {
    const node = treeData[nodeId];
    if (!node) return 1;
    if (collapsedNodeIds.has(nodeId) || !node.childrenIds || node.childrenIds.length === 0) {
      return 1;
    }
    return node.childrenIds.reduce((sum, childId) => sum + getSubtreeLeafCount(childId), 0);
  }

  if (mode === 'tree-right') {
    let currentY = 0;

    function layoutTreeRight(nodeId: string, level: number, parentYStart: number): number {
      const node = treeData[nodeId];
      if (!node) return currentY;

      const leafCount = getSubtreeLeafCount(nodeId);
      const subtreeHeight = leafCount * (NODE_HEIGHT + Y_GAP) - Y_GAP;

      const x = level * (NODE_WIDTH + X_GAP) + 80;
      
      let nodeY: number;

      if (!collapsedNodeIds.has(nodeId) && node.childrenIds && node.childrenIds.length > 0) {
        let childYStart = parentYStart;
        const childYs: number[] = [];
        for (const childId of node.childrenIds) {
          const cY = layoutTreeRight(childId, level + 1, childYStart);
          childYs.push(cY);
          const childLeaves = getSubtreeLeafCount(childId);
          childYStart += childLeaves * (NODE_HEIGHT + Y_GAP);
        }
        // Center parent relative to its children
        nodeY = (childYs[0] + childYs[childYs.length - 1]) / 2;
      } else {
        nodeY = currentY + subtreeHeight / 2;
        currentY += subtreeHeight + Y_GAP;
      }

      const offset = customOffsets[nodeId] || { dx: 0, dy: 0 };
      positions[nodeId] = {
        id: nodeId,
        x: x + offset.dx,
        y: nodeY + offset.dy,
        width: NODE_WIDTH,
        height: NODE_HEIGHT
      };

      return nodeY;
    }

    layoutTreeRight('root', 0, 0);
  } else if (mode === 'mindmap') {
    // Left / Right dual branch mindmap
    const root = treeData['root'];
    const children = root?.childrenIds || [];
    const leftChildren = children.filter((_, idx) => idx % 2 === 1);
    const rightChildren = children.filter((_, idx) => idx % 2 === 0);

    // Root at center
    const rootOffset = customOffsets['root'] || { dx: 0, dy: 0 };
    positions['root'] = {
      id: 'root',
      x: 0 + rootOffset.dx,
      y: 0 + rootOffset.dy,
      width: NODE_WIDTH + 20,
      height: NODE_HEIGHT + 10
    };

    // Layout right branch
    let rightY = -((rightChildren.reduce((s, id) => s + getSubtreeLeafCount(id), 0) * (NODE_HEIGHT + Y_GAP)) / 2);
    for (const childId of rightChildren) {
      const leafCount = getSubtreeLeafCount(childId);
      const subtreeHeight = leafCount * (NODE_HEIGHT + Y_GAP);
      layoutSubtreeDirection(childId, 1, rightY + subtreeHeight / 2, false);
      rightY += subtreeHeight;
    }

    // Layout left branch
    let leftY = -((leftChildren.reduce((s, id) => s + getSubtreeLeafCount(id), 0) * (NODE_HEIGHT + Y_GAP)) / 2);
    for (const childId of leftChildren) {
      const leafCount = getSubtreeLeafCount(childId);
      const subtreeHeight = leafCount * (NODE_HEIGHT + Y_GAP);
      layoutSubtreeDirection(childId, 1, leftY + subtreeHeight / 2, true);
      leftY += subtreeHeight;
    }

    function layoutSubtreeDirection(nodeId: string, level: number, centerY: number, isLeft: boolean) {
      const node = treeData[nodeId];
      if (!node) return;

      const directionMultiplier = isLeft ? -1 : 1;
      const baseX = directionMultiplier * level * (NODE_WIDTH + X_GAP);
      const offset = customOffsets[nodeId] || { dx: 0, dy: 0 };

      positions[nodeId] = {
        id: nodeId,
        x: baseX + offset.dx,
        y: centerY + offset.dy,
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        isLeftBranch: isLeft
      };

      if (!collapsedNodeIds.has(nodeId) && node.childrenIds && node.childrenIds.length > 0) {
        const totalLeaves = getSubtreeLeafCount(nodeId);
        let curY = centerY - (totalLeaves * (NODE_HEIGHT + Y_GAP)) / 2;
        for (const childId of node.childrenIds) {
          const childLeaves = getSubtreeLeafCount(childId);
          const childSubtreeHeight = childLeaves * (NODE_HEIGHT + Y_GAP);
          const childCenterY = curY + childSubtreeHeight / 2;
          layoutSubtreeDirection(childId, level + 1, childCenterY, isLeft);
          curY += childSubtreeHeight;
        }
      }
    }
  } else {
    // Flowchart Vertical
    let currentX = 0;

    function layoutVertical(nodeId: string, level: number): number {
      const node = treeData[nodeId];
      if (!node) return currentX;

      const leafCount = getSubtreeLeafCount(nodeId);
      const subtreeWidth = leafCount * (NODE_WIDTH + X_GAP) - X_GAP;

      const y = level * (NODE_HEIGHT + Y_GAP * 2) + 60;
      let nodeX: number;

      if (!collapsedNodeIds.has(nodeId) && node.childrenIds && node.childrenIds.length > 0) {
        const childXs: number[] = [];
        for (const childId of node.childrenIds) {
          const cX = layoutVertical(childId, level + 1);
          childXs.push(cX);
        }
        nodeX = (childXs[0] + childXs[childXs.length - 1]) / 2;
      } else {
        nodeX = currentX + subtreeWidth / 2;
        currentX += subtreeWidth + X_GAP;
      }

      const offset = customOffsets[nodeId] || { dx: 0, dy: 0 };
      positions[nodeId] = {
        id: nodeId,
        x: nodeX + offset.dx,
        y: y + offset.dy,
        width: NODE_WIDTH,
        height: NODE_HEIGHT
      };

      return nodeX;
    }

    layoutVertical('root', 0);
  }

  // Calculate bounding box
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  Object.values(positions).forEach((p) => {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x + p.width);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y + p.height);
  });

  return {
    positions,
    totalWidth: Math.max(1200, maxX - minX + 400),
    totalHeight: Math.max(800, maxY - minY + 400)
  };
}
