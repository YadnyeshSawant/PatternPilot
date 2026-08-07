export type NodeCategory = 
  | 'Array'
  | 'String'
  | 'Hash Map'
  | 'Stack'
  | 'Queue / Deque'
  | 'Linked List'
  | 'Trees'
  | 'Recursion'
  | 'Heap'
  | 'Graphs'
  | 'Trie'
  | 'Dynamic Programming'
  | 'Greedy'
  | 'Bit Manipulation'
  | 'Sorting Algorithms'
  | 'Range Structures'
  | 'Advanced Graphs'
  | 'Advanced Dynamic Programming'
  | 'Advanced String Algorithms';

export type MasteryStatus = 'not_started' | 'learning' | 'mastered';

export interface DSANode {
  id: string;
  title: string;
  category: NodeCategory;
  level: number; // 0 = Root ("Mandatory DSA"), 1 = Major Topic (Array, String...), 2 = Subtopic, 3 = Pattern, 4 = Detail
  childrenIds?: string[];
  parentId?: string;
  codeSnippet?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  description?: string;
  keyTechnique?: string;
  leetcodeProblems?: {
    name: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    url?: string;
  }[];
}

export interface NodePosition {
  x: number;
  y: number;
  dx: number; // custom user drag offset x
  dy: number; // custom user drag offset y
}

export type LayoutMode = 'mindmap' | 'tree-right' | 'flowchart-vertical';

export interface ViewportState {
  x: number;
  y: number;
  zoom: number;
}

export interface UserNodeMeta {
  status: MasteryStatus;
  notes?: string;
  isBookmarked?: boolean;
}
