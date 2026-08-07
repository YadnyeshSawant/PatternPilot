import { DSANode } from '../types';

export const dsaTreeData: Record<string, DSANode> = {
  'root': {
    id: 'root',
    title: 'Mandatory DSA',
    category: 'Array',
    level: 0,
    childrenIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
    description: 'Master Data Structures & Algorithms Roadmap - Complete patterns for technical coding interviews and competitive programming.',
  },

  // 1. ARRAY
  '1': {
    id: '1',
    title: '1. Array',
    category: 'Array',
    level: 1,
    parentId: 'root',
    childrenIds: ['1.1', '1.2', '1.3', '1.4', '1.5'],
    description: 'Contiguous memory layout providing O(1) random access. Essential foundation for most algorithms.',
  },
  '1.1': {
    id: '1.1',
    title: '1.1 Two Pointer',
    category: 'Array',
    level: 2,
    parentId: '1',
    childrenIds: ['1.1.1', '1.1.2', '1.1.3'],
    description: 'Use two indices to iterate through array simultaneously to solve search & pair problems efficiently.',
  },
  '1.1.1': {
    id: '1.1.1',
    title: '1.1.1 Opposite ends (left + right)',
    category: 'Array',
    level: 3,
    parentId: '1.1',
    description: 'Pointers start at start (0) and end (N-1), moving towards each other based on comparison conditions.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyTechnique: 'Sorted arrays, 2-sum pairs, container with most water.',
    codeSnippet: `let left = 0, right = arr.length - 1;
while (left < right) {
  let currentSum = arr[left] + arr[right];
  if (currentSum === target) return [left, right];
  if (currentSum < target) left++;
  else right--;
}`,
    leetcodeProblems: [
      { name: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium' },
      { name: 'Container With Most Water', difficulty: 'Medium' },
      { name: '3Sum', difficulty: 'Medium' }
    ]
  },
  '1.1.2': {
    id: '1.1.2',
    title: '1.1.2 Same direction (fast & slow pointers)',
    category: 'Array',
    level: 3,
    parentId: '1.1',
    description: 'Both pointers move in the same direction at varying speeds or conditions, useful for in-place modifications.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyTechnique: 'Remove duplicates, move zeroes, slow reads write target index.',
    codeSnippet: `let slow = 0;
for (let fast = 0; fast < arr.length; fast++) {
  if (arr[fast] !== 0) {
    [arr[slow], arr[fast]] = [arr[fast], arr[slow]];
    slow++;
  }
}`,
    leetcodeProblems: [
      { name: 'Remove Duplicates from Sorted Array', difficulty: 'Easy' },
      { name: 'Move Zeroes', difficulty: 'Easy' }
    ]
  },
  '1.1.3': {
    id: '1.1.3',
    title: '1.1.3 Partition / Dutch flag',
    category: 'Array',
    level: 3,
    parentId: '1.1',
    description: '3-way partitioning technique to segregate elements into three distinct groups in linear time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyTechnique: 'Low, Mid, High pointers to partition 0s, 1s, and 2s.',
    codeSnippet: `let low = 0, mid = 0, high = arr.length - 1;
while (mid <= high) {
  if (arr[mid] === 0) {
    [arr[low], arr[mid]] = [arr[mid], arr[low]];
    low++;
    mid++;
  } else if (arr[mid] === 1) {
    mid++;
  } else {
    [arr[mid], arr[high]] = [arr[high], arr[mid]];
    high--;
  }
}`,
    leetcodeProblems: [
      { name: 'Sort Colors', difficulty: 'Medium' }
    ]
  },

  '1.2': {
    id: '1.2',
    title: '1.2 Sliding Window',
    category: 'Array',
    level: 2,
    parentId: '1',
    childrenIds: ['1.2.1', '1.2.2'],
    description: 'Maintain a window of elements over a dynamic or fixed subarray to avoid redundant calculations.',
  },
  '1.2.1': {
    id: '1.2.1',
    title: '1.2.1 Fixed Size',
    category: 'Array',
    level: 3,
    parentId: '1.2',
    description: 'Window size K remains constant. Slide window right by adding new element and removing oldest element.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    codeSnippet: `let windowSum = 0;
for (let i = 0; i < k; i++) {
  windowSum += arr[i];
}
let maxSum = windowSum;
for (let i = k; i < arr.length; i++) {
  windowSum += arr[i] - arr[i - k];
  maxSum = Math.max(maxSum, windowSum);
}`,
    leetcodeProblems: [
      { name: 'Maximum Average Subarray I', difficulty: 'Easy' }
    ]
  },
  '1.2.2': {
    id: '1.2.2',
    title: '1.2.2 Variable Size',
    category: 'Array',
    level: 3,
    parentId: '1.2',
    childrenIds: ['1.2.2.1', '1.2.2.2'],
    description: 'Window size expands and shrinks based on dynamic constraints like sum or character frequency.',
  },
  '1.2.2.1': {
    id: '1.2.2.1',
    title: '1.2.2.1 Expand–Shrink',
    category: 'Array',
    level: 4,
    parentId: '1.2.2',
    description: 'Expand right pointer to satisfy condition, then shrink left pointer to find optimal minimum/maximum size.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    codeSnippet: `let left = 0, sum = 0, minLen = Infinity;
for (let right = 0; right < arr.length; right++) {
  sum += arr[right];
  while (sum >= target) {
    minLen = Math.min(minLen, right - left + 1);
    sum -= arr[left];
    left++;
  }
}
return minLen === Infinity ? 0 : minLen;`,
    leetcodeProblems: [
      { name: 'Minimum Size Subarray Sum', difficulty: 'Medium' }
    ]
  },
  '1.2.2.2': {
    id: '1.2.2.2',
    title: '1.2.2.2 Monotonic Window',
    category: 'Array',
    level: 4,
    parentId: '1.2.2',
    description: 'Maintain a deque (double-ended queue) of monotonic indices to fetch min/max of window in O(1).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    codeSnippet: `const deque = []; // stores indices
const res = [];
for (let i = 0; i < nums.length; i++) {
  if (deque.length && deque[0] < i - k + 1) deque.shift();
  while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
    deque.pop();
  }
  deque.push(i);
  if (i >= k - 1) res.push(nums[deque[0]]);
}`,
    leetcodeProblems: [
      { name: 'Sliding Window Maximum', difficulty: 'Hard' }
    ]
  },

  '1.3': {
    id: '1.3',
    title: '1.3 Prefix Based',
    category: 'Array',
    level: 2,
    parentId: '1',
    childrenIds: ['1.3.1', '1.3.2', '1.3.3'],
    description: 'Precompute cumulative properties (sum, XOR) to query subsegment values in O(1) time.',
  },
  '1.3.1': {
    id: '1.3.1',
    title: '1.3.1 Prefix Sum',
    category: 'Array',
    level: 3,
    parentId: '1.3',
    description: 'P[i] = A[0] + ... + A[i]. Range sum from i to j is P[j] - P[i-1].',
    timeComplexity: 'O(N) build, O(1) query',
    spaceComplexity: 'O(N)',
    codeSnippet: `const prefix = new Array(arr.length + 1).fill(0);
for (let i = 0; i < arr.length; i++) {
  prefix[i + 1] = prefix[i] + arr[i];
}
// Range sum [left, right] = prefix[right + 1] - prefix[left]`,
    leetcodeProblems: [
      { name: 'Range Sum Query - Immutable', difficulty: 'Easy' },
      { name: 'Subarray Sum Equals K', difficulty: 'Medium' }
    ]
  },
  '1.3.2': {
    id: '1.3.2',
    title: '1.3.2 Prefix XOR',
    category: 'Array',
    level: 3,
    parentId: '1.3',
    description: 'Cumulative XOR allows finding range XOR using P[j] ^ P[i-1] because x ^ x = 0.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    codeSnippet: `const prefixXOR = new Array(arr.length + 1).fill(0);
for (let i = 0; i < arr.length; i++) {
  prefixXOR[i + 1] = prefixXOR[i] ^ arr[i];
}
// Range XOR [L, R] = prefixXOR[R + 1] ^ prefixXOR[L]`,
    leetcodeProblems: [
      { name: 'XOR Queries of a Subarray', difficulty: 'Medium' }
    ]
  },
  '1.3.3': {
    id: '1.3.3',
    title: '1.3.3 2D Prefix',
    category: 'Array',
    level: 3,
    parentId: '1.3',
    description: '2D matrix sum computation in O(1) using inclusion-exclusion principle.',
    timeComplexity: 'O(N*M) build, O(1) query',
    spaceComplexity: 'O(N*M)',
    codeSnippet: `// Build 2D Prefix Sum Matrix
const P = Array.from({ length: R + 1 }, () => new Array(C + 1).fill(0));
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    P[r + 1][c + 1] = matrix[r][c] + P[r][c + 1] + P[r + 1][c] - P[r][c];
  }
}
// Query rectangle (r1, c1) to (r2, c2):
// P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]`,
    leetcodeProblems: [
      { name: 'Range Sum Query 2D - Immutable', difficulty: 'Medium' }
    ]
  },

  '1.4': {
    id: '1.4',
    title: "1.4 Kadane's / Subarray",
    category: 'Array',
    level: 2,
    parentId: '1',
    childrenIds: ['1.4.1', '1.4.2', '1.4.3'],
    description: 'Dynamic programming techniques to find contiguous subarray optimizing specific sum or product criteria.',
  },
  '1.4.1': {
    id: '1.4.1',
    title: "1.4.1 Max subarray sum (Kadane's)",
    category: 'Array',
    level: 3,
    parentId: '1.4',
    description: 'Iterate keeping track of maximum sum ending at current element: current = max(num, current + num).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    codeSnippet: `let maxSoFar = arr[0], current = arr[0];
for (let i = 1; i < arr.length; i++) {
  current = Math.max(arr[i], current + arr[i]);
  maxSoFar = Math.max(maxSoFar, current);
}`,
    leetcodeProblems: [
      { name: 'Maximum Subarray', difficulty: 'Medium' }
    ]
  },
  '1.4.2': {
    id: '1.4.2',
    title: '1.4.2 Max product subarray',
    category: 'Array',
    level: 3,
    parentId: '1.4',
    description: 'Track both maximum and minimum product ending at current index due to negative numbers flipping signs.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    leetcodeProblems: [
      { name: 'Maximum Product Subarray', difficulty: 'Medium' }
    ]
  },
  '1.4.3': {
    id: '1.4.3',
    title: '1.4.3 Subarray with given XOR / sum',
    category: 'Array',
    level: 3,
    parentId: '1.4',
    description: 'Store prefix sums / prefix XORs in a Hash Map to count or locate subarrays matching target in O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Subarray Sum Equals K', difficulty: 'Medium' }
    ]
  },

  '1.5': {
    id: '1.5',
    title: '1.5 Binary Search',
    category: 'Array',
    level: 2,
    parentId: '1',
    childrenIds: ['1.5.1', '1.5.2'],
    description: 'Divide and conquer on sorted ranges to locate target or evaluate monotonic decision space in logarithmic time.',
  },
  '1.5.1': {
    id: '1.5.1',
    title: '1.5.1 On index',
    category: 'Array',
    level: 3,
    parentId: '1.5',
    description: 'Standard binary search on sorted array or rotated sorted array indices.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    codeSnippet: `let low = 0, high = arr.length - 1;
while (low <= high) {
  let mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) low = mid + 1;
  else high = mid - 1;
}`,
    leetcodeProblems: [
      { name: 'Binary Search', difficulty: 'Easy' },
      { name: 'Search in Rotated Sorted Array', difficulty: 'Medium' }
    ]
  },
  '1.5.2': {
    id: '1.5.2',
    title: '1.5.2 On answer',
    category: 'Array',
    level: 3,
    parentId: '1.5',
    description: 'Define search space over possible solution answers [minVal, maxVal] and check predicate feasibility.',
    timeComplexity: 'O(N log(Range))',
    spaceComplexity: 'O(1)',
    leetcodeProblems: [
      { name: 'Koko Eating Bananas', difficulty: 'Medium' },
      { name: 'Capacity To Ship Packages Within D Days', difficulty: 'Medium' }
    ]
  },

  // 2. STRING
  '2': {
    id: '2',
    title: '2. String',
    category: 'String',
    level: 1,
    parentId: 'root',
    childrenIds: ['2.1', '2.2', '2.3'],
    description: 'Sequence of characters. Core focus on substring search, sliding windows, and matching patterns.',
  },
  '2.1': {
    id: '2.1',
    title: '2.1 Sliding Window',
    category: 'String',
    level: 2,
    parentId: '2',
    childrenIds: ['2.1.1', '2.1.2', '2.1.3'],
    description: 'Window tracking frequency of characters or substring properties.',
  },
  '2.1.1': {
    id: '2.1.1',
    title: '2.1.1 Longest substring without repeat',
    category: 'String',
    level: 3,
    parentId: '2.1',
    description: 'Maintain last seen character index in HashMap/Set to shift left pointer past duplicates.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    codeSnippet: `const charMap = new Map();
let left = 0, maxLen = 0;
for (let right = 0; right < s.length; right++) {
  const char = s[right];
  if (charMap.has(char) && charMap.get(char) >= left) {
    left = charMap.get(char) + 1;
  }
  charMap.set(char, right);
  maxLen = Math.max(maxLen, right - left + 1);
}`,
    leetcodeProblems: [
      { name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium' }
    ]
  },
  '2.1.2': {
    id: '2.1.2',
    title: '2.1.2 Minimum window substring',
    category: 'String',
    level: 3,
    parentId: '2.1',
    description: 'Track frequency match counts of target pattern while expanding right and contracting left.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    codeSnippet: `const targetMap = {};
for (const char of t) targetMap[char] = (targetMap[char] || 0) + 1;
let left = 0, needed = Object.keys(targetMap).length, formed = 0;
const windowMap = {};
let minLen = Infinity, start = 0;

for (let right = 0; right < s.length; right++) {
  const char = s[right];
  windowMap[char] = (windowMap[char] || 0) + 1;
  if (targetMap[char] && windowMap[char] === targetMap[char]) formed++;

  while (formed === needed) {
    if (right - left + 1 < minLen) {
      minLen = right - left + 1;
      start = left;
    }
    const leftChar = s[left];
    windowMap[leftChar]--;
    if (targetMap[leftChar] && windowMap[leftChar] < targetMap[leftChar]) formed--;
    left++;
  }
}`,
    leetcodeProblems: [
      { name: 'Minimum Window Substring', difficulty: 'Hard' }
    ]
  },
  '2.1.3': {
    id: '2.1.3',
    title: '2.1.3 Anagram / permutation in string',
    category: 'String',
    level: 3,
    parentId: '2.1',
    description: 'Fixed-length sliding window comparing character count array or hash map.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    codeSnippet: `const pCount = new Array(26).fill(0);
const sCount = new Array(26).fill(0);
for (let i = 0; i < p.length; i++) {
  pCount[p.charCodeAt(i) - 97]++;
  sCount[s.charCodeAt(i) - 97]++;
}
const res = [];
if (pCount.join() === sCount.join()) res.push(0);

for (let i = p.length; i < s.length; i++) {
  sCount[s.charCodeAt(i) - 97]++;
  sCount[s.charCodeAt(i - p.length) - 97]--;
  if (pCount.join() === sCount.join()) res.push(i - p.length + 1);
}`,
    leetcodeProblems: [
      { name: 'Find All Anagrams in a String', difficulty: 'Medium' },
      { name: 'Permutation in String', difficulty: 'Medium' }
    ]
  },

  '2.2': {
    id: '2.2',
    title: '2.2 Two Pointers',
    category: 'String',
    level: 2,
    parentId: '2',
    childrenIds: ['2.2.1', '2.2.2', '2.2.3'],
    description: 'Symmetric or bidirectional traversal over string indices.',
  },
  '2.2.1': {
    id: '2.2.1',
    title: '2.2.1 Palindrome check',
    category: 'String',
    level: 3,
    parentId: '2.2',
    description: 'Check if string reads same forward and backward, skipping non-alphanumeric characters.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    codeSnippet: `let left = 0, right = s.length - 1;
while (left < right) {
  while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++;
  while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--;
  if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
  left++;
  right--;
}
return true;`,
    leetcodeProblems: [
      { name: 'Valid Palindrome', difficulty: 'Easy' }
    ]
  },
  '2.2.2': {
    id: '2.2.2',
    title: '2.2.2 Reverse words / characters',
    category: 'String',
    level: 3,
    parentId: '2.2',
    description: 'In-place array/string character swap using left and right pointers.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    codeSnippet: `const words = s.trim().split(/\\s+/);
let left = 0, right = words.length - 1;
while (left < right) {
  [words[left], words[right]] = [words[right], words[left]];
  left++;
  right--;
}
return words.join(' ');`,
    leetcodeProblems: [
      { name: 'Reverse String', difficulty: 'Easy' },
      { name: 'Reverse Words in a String', difficulty: 'Medium' }
    ]
  },
  '2.2.3': {
    id: '2.2.3',
    title: '2.2.3 String compression',
    category: 'String',
    level: 3,
    parentId: '2.2',
    description: 'Read pointer counts consecutive identical characters, write pointer overwrites array.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    codeSnippet: `let write = 0, read = 0;
while (read < chars.length) {
  let char = chars[read], count = 0;
  while (read < chars.length && chars[read] === char) {
    read++;
    count++;
  }
  chars[write++] = char;
  if (count > 1) {
    for (const digit of String(count)) {
      chars[write++] = digit;
    }
  }
}
return write;`,
    leetcodeProblems: [
      { name: 'String Compression', difficulty: 'Medium' }
    ]
  },

  '2.3': {
    id: '2.3',
    title: '2.3 Pattern Matching',
    category: 'String',
    level: 2,
    parentId: '2',
    childrenIds: ['2.3.1', '2.3.2', '2.3.3'],
    description: 'Linear time string searching algorithms using precomputed tables or hashing.',
  },
  '2.3.1': {
    id: '2.3.1',
    title: '2.3.1 KMP (failure function)',
    category: 'String',
    level: 3,
    parentId: '2.3',
    description: 'Precomputes Longest Proper Prefix which is also Suffix (LPS) array to prevent redundant comparisons.',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(M)',
    leetcodeProblems: [
      { name: 'Find the Index of the First Occurrence in a String', difficulty: 'Easy' }
    ]
  },
  '2.3.2': {
    id: '2.3.2',
    title: '2.3.2 Rabin-Karp (rolling hash)',
    category: 'String',
    level: 3,
    parentId: '2.3',
    description: 'Computes polynomial rolling hash values to match substrings in expected linear time.',
    timeComplexity: 'O(N + M) average',
    spaceComplexity: 'O(1)',
    leetcodeProblems: [
      { name: 'Repeated Substring Pattern', difficulty: 'Easy' }
    ]
  },
  '2.3.3': {
    id: '2.3.3',
    title: '2.3.3 Z-algorithm',
    category: 'String',
    level: 3,
    parentId: '2.3',
    description: 'Constructs Z-array where Z[i] is length of longest common prefix starting at i and string start.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Sum of Scores of Built Strings', difficulty: 'Hard' }
    ]
  },

  // 3. HASH MAP
  '3': {
    id: '3',
    title: '3. Hash Map',
    category: 'Hash Map',
    level: 1,
    parentId: 'root',
    childrenIds: ['3.1', '3.2', '3.3', '3.4', '3.5'],
    description: 'Key-value data structure offering average O(1) time complexity for insertion, lookup, and deletion.',
  },
  '3.1': {
    id: '3.1',
    title: '3.1 Frequency Based',
    category: 'Hash Map',
    level: 2,
    parentId: '3',
    description: 'Count element occurrences to find mode, duplicates, or check anagrams.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Top K Frequent Elements', difficulty: 'Medium' }
    ]
  },
  '3.2': {
    id: '3.2',
    title: '3.2 Lookup Based',
    category: 'Hash Map',
    level: 2,
    parentId: '3',
    description: 'Store seen values or complements to achieve O(1) query for relationship checking.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Two Sum', difficulty: 'Easy' }
    ]
  },
  '3.3': {
    id: '3.3',
    title: '3.3 Set Based',
    category: 'Hash Map',
    level: 2,
    parentId: '3',
    description: 'Unordered sets for fast duplicate detection, intersection, and union operations.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Longest Consecutive Sequence', difficulty: 'Medium' }
    ]
  },
  '3.4': {
    id: '3.4',
    title: '3.4 Index Mapping',
    category: 'Hash Map',
    level: 2,
    parentId: '3',
    description: 'Store value-to-index mappings to instantly compute distances or last-seen positions.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Contains Duplicate II', difficulty: 'Easy' }
    ]
  },
  '3.5': {
    id: '3.5',
    title: '3.5 Grouping Pattern',
    category: 'Hash Map',
    level: 2,
    parentId: '3',
    description: 'Categorize elements under a common hash key (e.g., sorted anagram string key).',
    timeComplexity: 'O(N * K log K)',
    spaceComplexity: 'O(N * K)',
    leetcodeProblems: [
      { name: 'Group Anagrams', difficulty: 'Medium' }
    ]
  },

  // 4. STACK
  '4': {
    id: '4',
    title: '4. Stack',
    category: 'Stack',
    level: 1,
    parentId: 'root',
    childrenIds: ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6'],
    description: 'LIFO (Last In, First Out) structure ideal for nested structures, evaluation, and monotonic order.',
  },
  '4.1': {
    id: '4.1',
    title: '4.1 Monotonic Stack',
    category: 'Stack',
    level: 2,
    parentId: '4',
    childrenIds: ['4.1.1', '4.1.2'],
    description: 'Stack elements strictly maintained in monotonic increasing or decreasing order.',
  },
  '4.1.1': {
    id: '4.1.1',
    title: '4.1.1 Increasing',
    category: 'Stack',
    level: 3,
    parentId: '4.1',
    description: 'Maintains elements in increasing order. Used to find next smaller element.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Daily Temperatures', difficulty: 'Medium' }
    ]
  },
  '4.1.2': {
    id: '4.1.2',
    title: '4.1.2 Decreasing',
    category: 'Stack',
    level: 3,
    parentId: '4.1',
    description: 'Maintains elements in decreasing order. Used to find next greater element.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Next Greater Element I', difficulty: 'Easy' }
    ]
  },

  '4.2': {
    id: '4.2',
    title: '4.2 Nearest Element',
    category: 'Stack',
    level: 2,
    parentId: '4',
    childrenIds: ['4.2.1', '4.2.2', '4.2.3'],
    description: 'Locating closest element satisfying condition (greater/smaller) to the left or right.',
  },
  '4.2.1': {
    id: '4.2.1',
    title: '4.2.1 Next Greater',
    category: 'Stack',
    level: 3,
    parentId: '4.2',
    description: 'Find first element to the right that is strictly larger.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Next Greater Element II', difficulty: 'Medium' }
    ]
  },
  '4.2.2': {
    id: '4.2.2',
    title: '4.2.2 Next Smaller',
    category: 'Stack',
    level: 3,
    parentId: '4.2',
    description: 'Find first element to the right that is strictly smaller.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  '4.2.3': {
    id: '4.2.3',
    title: '4.2.3 Previous Variants',
    category: 'Stack',
    level: 3,
    parentId: '4.2',
    description: 'Finding previous greater/smaller element to the left using stack iteration.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },

  '4.3': {
    id: '4.3',
    title: '4.3 Range / Span',
    category: 'Stack',
    level: 2,
    parentId: '4',
    description: 'Calculate consecutive days or span where price/value was less than or equal to today.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Online Stock Span', difficulty: 'Medium' }
    ]
  },
  '4.4': {
    id: '4.4',
    title: '4.4 Min/Max Stack',
    category: 'Stack',
    level: 2,
    parentId: '4',
    description: 'Auxiliary stack or pairs tracking current minimum/maximum element at every stack level in O(1).',
    timeComplexity: 'O(1) all ops',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Min Stack', difficulty: 'Medium' }
    ]
  },
  '4.5': {
    id: '4.5',
    title: '4.5 Expression Handling',
    category: 'Stack',
    level: 2,
    parentId: '4',
    description: 'Parse, convert, and evaluate infix, prefix, and Reverse Polish Notation (postfix) expressions.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Evaluate Reverse Polish Notation', difficulty: 'Medium' },
      { name: 'Basic Calculator', difficulty: 'Hard' }
    ]
  },
  '4.6': {
    id: '4.6',
    title: '4.6 Histogram Pattern',
    category: 'Stack',
    level: 2,
    parentId: '4',
    description: 'Find maximum rectangle area using heights array with monotonic stack calculating spans.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Largest Rectangle in Histogram', difficulty: 'Hard' },
      { name: 'Maximal Rectangle', difficulty: 'Hard' }
    ]
  },

  // 5. QUEUE / DEQUE
  '5': {
    id: '5',
    title: '5. Queue / Deque',
    category: 'Queue / Deque',
    level: 1,
    parentId: 'root',
    childrenIds: ['5.1', '5.2', '5.3', '5.4'],
    description: 'FIFO (First-In First-Out) and Double-Ended Queue structures for level-by-level exploration.',
  },
  '5.1': {
    id: '5.1',
    title: '5.1 FIFO Processing',
    category: 'Queue / Deque',
    level: 2,
    parentId: '5',
    description: 'Standard queue processing tasks in order of arrival.',
    timeComplexity: 'O(1) push/pop',
    spaceComplexity: 'O(N)'
  },
  '5.2': {
    id: '5.2',
    title: '5.2 Level-wise Processing',
    category: 'Queue / Deque',
    level: 2,
    parentId: '5',
    description: 'BFS traversal taking level size at start of loop to process nodes level by level.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    leetcodeProblems: [
      { name: 'Binary Tree Level Order Traversal', difficulty: 'Medium' }
    ]
  },
  '5.3': {
    id: '5.3',
    title: '5.3 Circular Queue Pattern',
    category: 'Queue / Deque',
    level: 2,
    parentId: '5',
    description: 'Fixed size buffer using head and tail pointers modulo capacity.',
    timeComplexity: 'O(1) ops',
    spaceComplexity: 'O(K)',
    leetcodeProblems: [
      { name: 'Design Circular Queue', difficulty: 'Medium' }
    ]
  },
  '5.4': {
    id: '5.4',
    title: '5.4 Deque Based',
    category: 'Queue / Deque',
    level: 2,
    parentId: '5',
    description: 'Push and pop from both ends in O(1) time. Key for sliding window min/max and 0-1 BFS.',
    timeComplexity: 'O(1) ops',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Sliding Window Maximum', difficulty: 'Hard' }
    ]
  },

  // 6. LINKED LIST
  '6': {
    id: '6',
    title: '6. Linked List',
    category: 'Linked List',
    level: 1,
    parentId: 'root',
    childrenIds: ['6.1', '6.2', '6.3'],
    description: 'Linear nodes connected by pointers. Core focus on pointer manipulation and cycle detection.',
  },
  '6.1': {
    id: '6.1',
    title: '6.1 Pointer Techniques',
    category: 'Linked List',
    level: 2,
    parentId: '6',
    childrenIds: ['6.1.1', '6.1.2', '6.1.3'],
    description: 'Multi-pointer traversal patterns.',
  },
  '6.1.1': {
    id: '6.1.1',
    title: '6.1.1 Fast–Slow',
    category: 'Linked List',
    level: 3,
    parentId: '6.1',
    description: 'Slow moves 1 step, Fast moves 2 steps.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },
  '6.1.2': {
    id: '6.1.2',
    title: '6.1.2 Cycle Detection',
    category: 'Linked List',
    level: 3,
    parentId: '6.1',
    description: "Floyd's Cycle-Finding Algorithm. If fast and slow meet, cycle exists.",
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    leetcodeProblems: [
      { name: 'Linked List Cycle', difficulty: 'Easy' },
      { name: 'Linked List Cycle II', difficulty: 'Medium' }
    ]
  },
  '6.1.3': {
    id: '6.1.3',
    title: '6.1.3 Finding Middle',
    category: 'Linked List',
    level: 3,
    parentId: '6.1',
    description: 'When fast reaches end, slow sits at exact middle node.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    leetcodeProblems: [
      { name: 'Middle of the Linked List', difficulty: 'Easy' }
    ]
  },

  '6.2': {
    id: '6.2',
    title: '6.2 Reversal',
    category: 'Linked List',
    level: 2,
    parentId: '6',
    childrenIds: ['6.2.1', '6.2.2'],
    description: 'Inverting node pointer directions.',
  },
  '6.2.1': {
    id: '6.2.1',
    title: '6.2.1 Full Reverse',
    category: 'Linked List',
    level: 3,
    parentId: '6.2',
    description: 'Iteratively rewire next pointers using prev, curr, next pointers.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    codeSnippet: `let prev = null, curr = head;
while (curr) {
  let nextTemp = curr.next;
  curr.next = prev;
  prev = curr;
  curr = nextTemp;
}
return prev;`,
    leetcodeProblems: [
      { name: 'Reverse Linked List', difficulty: 'Easy' }
    ]
  },
  '6.2.2': {
    id: '6.2.2',
    title: '6.2.2 Partial (k-group)',
    category: 'Linked List',
    level: 3,
    parentId: '6.2',
    description: 'Reverse linked list in sub-blocks of size K.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    leetcodeProblems: [
      { name: 'Reverse Nodes in k-Group', difficulty: 'Hard' }
    ]
  },

  '6.3': {
    id: '6.3',
    title: '6.3 Merge Lists',
    category: 'Linked List',
    level: 2,
    parentId: '6',
    description: 'Combine sorted linked lists using dummy head node and pointer comparison.',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(1)',
    leetcodeProblems: [
      { name: 'Merge Two Sorted Lists', difficulty: 'Easy' },
      { name: 'Merge k Sorted Lists', difficulty: 'Hard' }
    ]
  },

  // 7. TREES
  '7': {
    id: '7',
    title: '7. Trees',
    category: 'Trees',
    level: 1,
    parentId: 'root',
    childrenIds: ['7.1', '7.2', '7.3', '7.4'],
    description: 'Hierarchical non-linear structure with root and child nodes. Core tree traversal and recursion patterns.',
  },
  '7.1': {
    id: '7.1',
    title: '7.1 Traversal',
    category: 'Trees',
    level: 2,
    parentId: '7',
    childrenIds: ['7.1.1', '7.1.2'],
    description: 'Systematic methods for visiting every node in a tree structure.',
  },
  '7.1.1': {
    id: '7.1.1',
    title: '7.1.1 DFS (Pre / In / Post Order)',
    category: 'Trees',
    level: 3,
    parentId: '7.1',
    description: 'Depth-first explorations: Pre-order (Root-L-R), In-order (L-Root-R), Post-order (L-R-Root).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    leetcodeProblems: [
      { name: 'Binary Tree Inorder Traversal', difficulty: 'Easy' }
    ]
  },
  '7.1.2': {
    id: '7.1.2',
    title: '7.1.2 BFS (Level Order / Zigzag / Right Side View)',
    category: 'Trees',
    level: 3,
    parentId: '7.1',
    description: 'Breadth-first exploration using queue level loops.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(W)',
    leetcodeProblems: [
      { name: 'Binary Tree Level Order Traversal', difficulty: 'Medium' },
      { name: 'Binary Tree Right Side View', difficulty: 'Medium' }
    ]
  },

  '7.2': {
    id: '7.2',
    title: '7.2 Recursion Patterns',
    category: 'Trees',
    level: 2,
    parentId: '7',
    childrenIds: ['7.2.1', '7.2.2'],
    description: 'Divide and conquer approaches on tree branches.',
  },
  '7.2.1': {
    id: '7.2.1',
    title: '7.2.1 Top Down Approach',
    category: 'Trees',
    level: 3,
    parentId: '7.2',
    description: 'Pass values down to child nodes via function parameters.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)'
  },
  '7.2.2': {
    id: '7.2.2',
    title: '7.2.2 Bottom Up Approach',
    category: 'Trees',
    level: 3,
    parentId: '7.2',
    description: 'Return values up from leaf nodes to parent nodes.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    leetcodeProblems: [
      { name: 'Maximum Depth of Binary Tree', difficulty: 'Easy' }
    ]
  },

  '7.3': {
    id: '7.3',
    title: '7.3 Path Based',
    category: 'Trees',
    level: 2,
    parentId: '7',
    childrenIds: ['7.3.1', '7.3.2'],
    description: 'Measuring distances, heights, and paths connecting nodes.',
  },
  '7.3.1': {
    id: '7.3.1',
    title: '7.3.1 Max Path Sum',
    category: 'Trees',
    level: 3,
    parentId: '7.3',
    description: 'Find non-empty path yielding highest node value sum across any branch split.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    leetcodeProblems: [
      { name: 'Binary Tree Maximum Path Sum', difficulty: 'Hard' }
    ]
  },
  '7.3.2': {
    id: '7.3.2',
    title: '7.3.2 Diameter / Height / Depth',
    category: 'Trees',
    level: 3,
    parentId: '7.3',
    description: 'Longest path between any two nodes in tree = leftHeight + rightHeight.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    leetcodeProblems: [
      { name: 'Diameter of Binary Tree', difficulty: 'Easy' }
    ]
  },

  '7.4': {
    id: '7.4',
    title: '7.4 BST (Binary Search Tree)',
    category: 'Trees',
    level: 2,
    parentId: '7',
    description: 'Left subtree elements < Root < Right subtree elements. In-order traversal yields sorted sequence.',
    timeComplexity: 'O(log N) average, O(N) worst',
    spaceComplexity: 'O(H)',
    leetcodeProblems: [
      { name: 'Validate Binary Search Tree', difficulty: 'Medium' },
      { name: 'Lowest Common Ancestor of a BST', difficulty: 'Medium' }
    ]
  },

  // 8. RECURSION
  '8': {
    id: '8',
    title: '8. Recursion',
    category: 'Recursion',
    level: 1,
    parentId: 'root',
    childrenIds: ['8.1', '8.2'],
    description: 'Functions calling themselves to solve subproblems. Fundamental for Backtracking and Divide & Conquer.',
  },
  '8.1': {
    id: '8.1',
    title: '8.1 Backtracking',
    category: 'Recursion',
    level: 2,
    parentId: '8',
    childrenIds: ['8.1.1', '8.1.2'],
    description: 'Systematic state-space tree search with step undoing.',
  },
  '8.1.1': {
    id: '8.1.1',
    title: '8.1.1 Exploration',
    category: 'Recursion',
    level: 3,
    parentId: '8.1',
    childrenIds: ['8.1.1.1', '8.1.1.2', '8.1.1.3', '8.1.1.4', '8.1.1.5', '8.1.1.6'],
    description: 'Combinatorial state generation techniques.',
  },
  '8.1.1.1': {
    id: '8.1.1.1',
    title: '8.1.1.1 Decision Tree',
    category: 'Recursion',
    level: 4,
    parentId: '8.1.1',
    description: 'Model choices at each step as recursive tree branches.'
  },
  '8.1.1.2': {
    id: '8.1.1.2',
    title: '8.1.1.2 Choose–Explore–Unchoose',
    category: 'Recursion',
    level: 4,
    parentId: '8.1.1',
    description: 'Standard backtracking paradigm: mutate state, recurse, backtrack state.',
    codeSnippet: `function backtrack(path, choices) {
  if (isTarget(path)) { result.push([...path]); return; }
  for (let choice of choices) {
    path.push(choice); // Choose
    backtrack(path, remainingChoices); // Explore
    path.pop(); // Unchoose
  }
}`
  },
  '8.1.1.3': {
    id: '8.1.1.3',
    title: '8.1.1.3 Subsets (Power Set)',
    category: 'Recursion',
    level: 4,
    parentId: '8.1.1',
    description: 'Generate all 2^N subsets of a set using include/exclude decision branches.',
    timeComplexity: 'O(2^N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Subsets', difficulty: 'Medium' }
    ]
  },
  '8.1.1.4': {
    id: '8.1.1.4',
    title: '8.1.1.4 Permutations / Combinations (nCr)',
    category: 'Recursion',
    level: 4,
    parentId: '8.1.1',
    description: 'Generate all N! orderings or combinations of length K.',
    timeComplexity: 'O(N!)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Permutations', difficulty: 'Medium' },
      { name: 'Combination Sum', difficulty: 'Medium' }
    ]
  },
  '8.1.1.5': {
    id: '8.1.1.5',
    title: '8.1.1.5 Word Search on Grid',
    category: 'Recursion',
    level: 4,
    parentId: '8.1.1',
    description: 'Grid DFS with char matching and visited cell tracking via temporary mutation.',
    leetcodeProblems: [
      { name: 'Word Search', difficulty: 'Medium' }
    ]
  },
  '8.1.1.6': {
    id: '8.1.1.6',
    title: '8.1.1.6 Palindrome Partitioning',
    category: 'Recursion',
    level: 4,
    parentId: '8.1.1',
    description: 'Partition string into all possible palindrome substring combinations.',
    leetcodeProblems: [
      { name: 'Palindrome Partitioning', difficulty: 'Medium' }
    ]
  },

  '8.1.2': {
    id: '8.1.2',
    title: '8.1.2 Pruning / State Tracking',
    category: 'Recursion',
    level: 3,
    parentId: '8.1',
    description: 'Cut invalid recursive subtrees early when path exceeds constraints.',
    timeComplexity: 'O(Branching^Depth)',
    spaceComplexity: 'O(Depth)'
  },

  '8.2': {
    id: '8.2',
    title: '8.2 Divide & Conquer',
    category: 'Recursion',
    level: 2,
    parentId: '8',
    childrenIds: ['8.2.1', '8.2.2', '8.2.3'],
    description: 'Break problem into disjoint subproblems, solve recursively, combine results.',
  },
  '8.2.1': {
    id: '8.2.1',
    title: '8.2.1 Merge Sort Pattern',
    category: 'Recursion',
    level: 3,
    parentId: '8.2',
    description: 'Split array into halves, sort left and right, merge sorted halves in linear time.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Sort An Array', difficulty: 'Medium' }
    ]
  },
  '8.2.2': {
    id: '8.2.2',
    title: '8.2.2 Quick Select (Kth Largest)',
    category: 'Recursion',
    level: 3,
    parentId: '8.2',
    description: 'Partition array around pivot. Recurse only into partition containing Kth index.',
    timeComplexity: 'O(N) avg',
    spaceComplexity: 'O(1)',
    leetcodeProblems: [
      { name: 'Kth Largest Element in an Array', difficulty: 'Medium' }
    ]
  },
  '8.2.3': {
    id: '8.2.3',
    title: '8.2.3 Count Inversions',
    category: 'Recursion',
    level: 3,
    parentId: '8.2',
    description: 'Enhanced Merge Sort counting pairs where i < j and arr[i] > arr[j].',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)'
  },

  // 9. HEAP
  '9': {
    id: '9',
    title: '9. Heap',
    category: 'Heap',
    level: 1,
    parentId: 'root',
    childrenIds: ['9.1', '9.2', '9.3'],
    description: 'Tree-based Priority Queue providing O(1) top access and O(log N) insertion/deletion.',
  },
  '9.1': {
    id: '9.1',
    title: '9.1 Top K / Kth Element / K Closest Points',
    category: 'Heap',
    level: 2,
    parentId: '9',
    description: 'Maintain size K min-heap or max-heap to track extreme elements efficiently.',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    leetcodeProblems: [
      { name: 'Kth Largest Element in a Stream', difficulty: 'Easy' },
      { name: 'K Closest Points to Origin', difficulty: 'Medium' }
    ]
  },
  '9.2': {
    id: '9.2',
    title: '9.2 Greedy + Heap',
    category: 'Heap',
    level: 2,
    parentId: '9',
    childrenIds: ['9.2.1', '9.2.2', '9.2.3', '9.2.4'],
    description: 'Combine greedy choice with priority queue for dynamic availability picking.',
  },
  '9.2.1': {
    id: '9.2.1',
    title: '9.2.1 Task Scheduler',
    category: 'Heap',
    level: 3,
    parentId: '9.2',
    description: 'Max heap frequency count with cooldown queue.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(26)',
    leetcodeProblems: [
      { name: 'Task Scheduler', difficulty: 'Medium' }
    ]
  },
  '9.2.2': {
    id: '9.2.2',
    title: '9.2.2 Meeting Rooms',
    category: 'Heap',
    level: 3,
    parentId: '9.2',
    description: 'Min heap tracking meeting end times to calculate minimum rooms required.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Meeting Rooms II', difficulty: 'Medium' }
    ]
  },
  '9.2.3': {
    id: '9.2.3',
    title: '9.2.3 Reorganize String',
    category: 'Heap',
    level: 3,
    parentId: '9.2',
    description: 'Max heap popping two most frequent characters to avoid adjacent duplicate placement.',
    leetcodeProblems: [
      { name: 'Reorganize String', difficulty: 'Medium' }
    ]
  },
  '9.2.4': {
    id: '9.2.4',
    title: '9.2.4 Huffman Encoding',
    category: 'Heap',
    level: 3,
    parentId: '9.2',
    description: 'Min heap repeatedly combining lowest frequency nodes to create optimal prefix code tree.'
  },
  '9.3': {
    id: '9.3',
    title: '9.3 K-Way Merge',
    category: 'Heap',
    level: 2,
    parentId: '9',
    description: 'Min heap tracking head elements from K sorted lists to produce merged sequence.',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    leetcodeProblems: [
      { name: 'Merge k Sorted Lists', difficulty: 'Hard' }
    ]
  },

  // 10. GRAPHS
  '10': {
    id: '10',
    title: '10. Graphs',
    category: 'Graphs',
    level: 1,
    parentId: 'root',
    childrenIds: ['10.1', '10.2', '10.3', '10.4', '10.5', '10.6', '10.7'],
    description: 'Vertices connected by edges. Covers traversal, cycle detection, paths, and spanning trees.',
  },
  '10.1': {
    id: '10.1',
    title: '10.1 Traversal',
    category: 'Graphs',
    level: 2,
    parentId: '10',
    childrenIds: ['10.1.1', '10.1.2'],
    description: 'Exploring graph structure with visited array.',
  },
  '10.1.1': {
    id: '10.1.1',
    title: '10.1.1 BFS',
    category: 'Graphs',
    level: 3,
    parentId: '10.1',
    description: 'Queue-based level-by-level traversal. Guarantees shortest path in unweighted graphs.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    leetcodeProblems: [
      { name: 'Number of Islands', difficulty: 'Medium' }
    ]
  },
  '10.1.2': {
    id: '10.1.2',
    title: '10.1.2 DFS',
    category: 'Graphs',
    level: 3,
    parentId: '10.1',
    description: 'Recursive or stack-based deep branch exploration.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    leetcodeProblems: [
      { name: 'Clone Graph', difficulty: 'Medium' }
    ]
  },

  '10.2': {
    id: '10.2',
    title: '10.2 Cycle Detection',
    category: 'Graphs',
    level: 2,
    parentId: '10',
    childrenIds: ['10.2.1', '10.2.2'],
    description: 'Determining presence of back-edges or circular loops.',
  },
  '10.2.1': {
    id: '10.2.1',
    title: '10.2.1 Directed',
    category: 'Graphs',
    level: 3,
    parentId: '10.2',
    description: 'DFS tracking recursion call stack states (unvisited, visiting, visited).',
    leetcodeProblems: [
      { name: 'Course Schedule', difficulty: 'Medium' }
    ]
  },
  '10.2.2': {
    id: '10.2.2',
    title: '10.2.2 Undirected',
    category: 'Graphs',
    level: 3,
    parentId: '10.2',
    description: 'DFS/BFS tracking parent node or Union-Find DSU.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)'
  },

  '10.3': {
    id: '10.3',
    title: '10.3 Topological Sort',
    category: 'Graphs',
    level: 2,
    parentId: '10',
    childrenIds: ['10.3.1', '10.3.2', '10.3.3'],
    description: 'Linear ordering of vertices in Directed Acyclic Graph (DAG) respecting dependencies.',
  },
  '10.3.1': {
    id: '10.3.1',
    title: '10.3.1 Topological Sort (BFS / DFS)',
    category: 'Graphs',
    level: 3,
    parentId: '10.3',
    description: 'Ordering dependencies for build systems or prerequisite tasks.'
  },
  '10.3.2': {
    id: '10.3.2',
    title: "10.3.2 Kahn's Algorithm (BFS In-Degree)",
    category: 'Graphs',
    level: 3,
    parentId: '10.3',
    description: 'In-degree array + queue. Push nodes with in-degree 0 into queue.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    leetcodeProblems: [
      { name: 'Course Schedule II', difficulty: 'Medium' }
    ]
  },
  '10.3.3': {
    id: '10.3.3',
    title: '10.3.3 DFS-Based Topological Sort',
    category: 'Graphs',
    level: 3,
    parentId: '10.3',
    description: 'Post-order DFS pushing visited nodes onto stack, then popping stack.'
  },

  '10.4': {
    id: '10.4',
    title: '10.4 Shortest Path',
    category: 'Graphs',
    level: 2,
    parentId: '10',
    childrenIds: ['10.4.1', '10.4.2', '10.4.3'],
    description: 'Finding optimal path distance in weighted graphs.',
  },
  '10.4.1': {
    id: '10.4.1',
    title: '10.4.1 Dijkstra',
    category: 'Graphs',
    level: 3,
    parentId: '10.4',
    description: 'Min-heap priority queue for non-negative weighted graphs.',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    leetcodeProblems: [
      { name: 'Network Delay Time', difficulty: 'Medium' }
    ]
  },
  '10.4.2': {
    id: '10.4.2',
    title: '10.4.2 Bellman-Ford',
    category: 'Graphs',
    level: 3,
    parentId: '10.4',
    description: 'Relaxes all edges V-1 times. Handles negative edge weights and detects negative cycles.',
    timeComplexity: 'O(V * E)',
    spaceComplexity: 'O(V)'
  },
  '10.4.3': {
    id: '10.4.3',
    title: '10.4.3 Floyd-Warshall (All Pairs)',
    category: 'Graphs',
    level: 3,
    parentId: '10.4',
    description: '3D/2D DP computing shortest path between all pairs of nodes.',
    timeComplexity: 'O(V^3)',
    spaceComplexity: 'O(V^2)'
  },

  '10.5': {
    id: '10.5',
    title: '10.5 Spanning Tree',
    category: 'Graphs',
    level: 2,
    parentId: '10',
    childrenIds: ['10.5.1', '10.5.2'],
    description: 'Subgraph connecting all vertices with minimum total edge weight without cycles.',
  },
  '10.5.1': {
    id: '10.5.1',
    title: '10.5.1 Kruskal',
    category: 'Graphs',
    level: 3,
    parentId: '10.5',
    description: 'Sort edges by weight and pick using Union-Find DSU.',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V + E)',
    leetcodeProblems: [
      { name: 'Min Cost to Connect All Points', difficulty: 'Medium' }
    ]
  },
  '10.5.2': {
    id: '10.5.2',
    title: '10.5.2 Prims',
    category: 'Graphs',
    level: 3,
    parentId: '10.5',
    description: 'Grow MST from arbitrary vertex using Min Heap picking cheapest adjacent edge.',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V)'
  },

  '10.6': {
    id: '10.6',
    title: '10.6 Union-Find (DSU) – Detect Cycle in Undirected Graph',
    category: 'Graphs',
    level: 2,
    parentId: '10',
    description: 'Disjoint Set Union with path compression & rank/size tracking. O(α(N)) amortized operations.',
    timeComplexity: 'O(α(N))',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Redundant Connection', difficulty: 'Medium' },
      { name: 'Number of Connected Components in an Undirected Graph', difficulty: 'Medium' }
    ]
  },

  '10.7': {
    id: '10.7',
    title: '10.7 Bipartite / Multi-Source BFS / 0-1 BFS',
    category: 'Graphs',
    level: 2,
    parentId: '10',
    description: 'Graph coloring with 2 colors, multi-starting point BFS, and Deque 0-1 edge BFS.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    leetcodeProblems: [
      { name: 'Is Graph Bipartite?', difficulty: 'Medium' },
      { name: '01 Matrix', difficulty: 'Medium' }
    ]
  },

  // 11. TRIE
  '11': {
    id: '11',
    title: '11. Trie',
    category: 'Trie',
    level: 1,
    parentId: 'root',
    childrenIds: ['11.1', '11.2'],
    description: 'Tree structure storing characters at nodes for efficient prefix searching.',
  },
  '11.1': {
    id: '11.1',
    title: '11.1 Prefix Based',
    category: 'Trie',
    level: 2,
    parentId: '11',
    childrenIds: ['11.1.1', '11.1.2'],
    description: 'Standard dictionary string prefix trie.',
  },
  '11.1.1': {
    id: '11.1.1',
    title: '11.1.1 Insert/Search',
    category: 'Trie',
    level: 3,
    parentId: '11.1',
    description: 'Insert characters into children map and mark isEndOfWord boolean.',
    timeComplexity: 'O(L) per word',
    spaceComplexity: 'O(N * L)',
    leetcodeProblems: [
      { name: 'Implement Trie (Prefix Tree)', difficulty: 'Medium' }
    ]
  },
  '11.1.2': {
    id: '11.1.2',
    title: '11.1.2 Prefix Match',
    category: 'Trie',
    level: 3,
    parentId: '11.1',
    description: 'Navigate string length and verify path exists.',
    leetcodeProblems: [
      { name: 'Design Add and Search Words Data Structure', difficulty: 'Medium' }
    ]
  },
  '11.2': {
    id: '11.2',
    title: '11.2 Bitwise Trie',
    category: 'Trie',
    level: 2,
    parentId: '11',
    description: 'Binary Trie storing 31-bit integers for maximum XOR pair queries.',
    timeComplexity: 'O(32) per query',
    spaceComplexity: 'O(N * 32)',
    leetcodeProblems: [
      { name: 'Maximum XOR of Two Numbers in an Array', difficulty: 'Medium' }
    ]
  },

  // 12. DYNAMIC PROGRAMMING
  '12': {
    id: '12',
    title: '12. Dynamic Programming',
    category: 'Dynamic Programming',
    level: 1,
    parentId: 'root',
    childrenIds: ['12.1', '12.2', '12.3', '12.4', '12.5'],
    description: 'Optimization over overlapping subproblems with optimal substructure.',
  },
  '12.1': {
    id: '12.1',
    title: '12.1 Core',
    category: 'Dynamic Programming',
    level: 2,
    parentId: '12',
    childrenIds: ['12.1.1', '12.1.2'],
    description: 'Dimensionality of state tables.',
  },
  '12.1.1': {
    id: '12.1.1',
    title: '12.1.1 1D DP',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.1',
    description: 'State depends on single parameter (e.g., house robber, climbing stairs).',
    leetcodeProblems: [
      { name: 'Climbing Stairs', difficulty: 'Easy' },
      { name: 'House Robber', difficulty: 'Medium' }
    ]
  },
  '12.1.2': {
    id: '12.1.2',
    title: '12.1.2 2D DP',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.1',
    description: 'State depends on two indices (e.g. grid paths, string pair comparisons).',
    leetcodeProblems: [
      { name: 'Unique Paths', difficulty: 'Medium' },
      { name: 'Longest Common Subsequence', difficulty: 'Medium' }
    ]
  },

  '12.2': {
    id: '12.2',
    title: '12.2 Transition Type',
    category: 'Dynamic Programming',
    level: 2,
    parentId: '12',
    childrenIds: ['12.2.1', '12.2.2', '12.2.3'],
    description: 'State recurrence relation forms.',
  },
  '12.2.1': {
    id: '12.2.1',
    title: '12.2.1 Linear DP',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.2',
    description: 'Sequential transitions i depend on i-1, i-2, etc.'
  },
  '12.2.2': {
    id: '12.2.2',
    title: '12.2.2 Grid DP',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.2',
    description: 'Cell (r, c) transitions depend on top (r-1, c) and left (r, c-1).'
  },
  '12.2.3': {
    id: '12.2.3',
    title: '12.2.3 Decision DP',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.2',
    description: 'Take vs. Skip decisions at step i.'
  },

  '12.3': {
    id: '12.3',
    title: '12.3 Pattern Types',
    category: 'Dynamic Programming',
    level: 2,
    parentId: '12',
    childrenIds: ['12.3.1', '12.3.2', '12.3.3', '12.3.4'],
    description: 'Classic DP domain templates.',
  },
  '12.3.1': {
    id: '12.3.1',
    title: '12.3.1 Knapsack',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.3',
    description: '0/1 Knapsack (bounded) and Unbounded Knapsack (coin change).',
    leetcodeProblems: [
      { name: 'Coin Change', difficulty: 'Medium' },
      { name: 'Partition Equal Subset Sum', difficulty: 'Medium' }
    ]
  },
  '12.3.2': {
    id: '12.3.2',
    title: '12.3.2 Sequence DP',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.3',
    description: 'Longest Increasing Subsequence (LIS) and Longest Common Subsequence (LCS).',
    leetcodeProblems: [
      { name: 'Longest Increasing Subsequence', difficulty: 'Medium' },
      { name: 'Edit Distance', difficulty: 'Hard' }
    ]
  },
  '12.3.3': {
    id: '12.3.3',
    title: '12.3.3 Partition DP',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.3',
    description: 'Partition array/string into K subsegments minimizing cost.',
    leetcodeProblems: [
      { name: 'Matrix Chain Multiplication / Partition', difficulty: 'Hard' }
    ]
  },
  '12.3.4': {
    id: '12.3.4',
    title: '12.3.4 Interval DP',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.3',
    description: 'Solve on subsegments [i...j] ordered by length (e.g. Burst Balloons, Minimum Cost Tree From Leaf Values).',
    leetcodeProblems: [
      { name: 'Burst Balloons', difficulty: 'Hard' }
    ]
  },

  '12.4': {
    id: '12.4',
    title: '12.4 Advanced',
    category: 'Dynamic Programming',
    level: 2,
    parentId: '12',
    childrenIds: ['12.4.1', '12.4.2', '12.4.3'],
    description: 'Complex state encoding.',
  },
  '12.4.1': {
    id: '12.4.1',
    title: '12.4.1 Bitmask DP',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.4',
    description: 'Represent subset of visited nodes or items using integer bitmask (e.g. TSP).',
    leetcodeProblems: [
      { name: 'Shortest Path Visiting All Nodes', difficulty: 'Hard' }
    ]
  },
  '12.4.2': {
    id: '12.4.2',
    title: '12.4.2 Digit DP',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.4',
    description: 'Count numbers in range [L, R] satisfying digit property using digit positions and tight bounds flag.'
  },
  '12.4.3': {
    id: '12.4.3',
    title: '12.4.3 DP on Trees',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.4',
    description: 'Compute state per node using child return values (e.g. House Robber III, Tree Diameter).',
    leetcodeProblems: [
      { name: 'House Robber III', difficulty: 'Medium' }
    ]
  },

  '12.5': {
    id: '12.5',
    title: '12.5 Optimization',
    category: 'Dynamic Programming',
    level: 2,
    parentId: '12',
    childrenIds: ['12.5.1', '12.5.2'],
    description: 'Implementation paradigms and memory optimizations.',
  },
  '12.5.1': {
    id: '12.5.1',
    title: '12.5.1 Memoization',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.5',
    description: 'Top-down recursion with hash map / table caching subproblem answers.'
  },
  '12.5.2': {
    id: '12.5.2',
    title: '12.5.2 Tabulation',
    category: 'Dynamic Programming',
    level: 3,
    parentId: '12.5',
    description: 'Bottom-up iterative table filling with space optimization rolling arrays.'
  },

  // 13. GREEDY
  '13': {
    id: '13',
    title: '13. Greedy',
    category: 'Greedy',
    level: 1,
    parentId: 'root',
    childrenIds: ['13.1', '13.2', '13.3', '13.4', '13.5'],
    description: 'Locally optimal choice at each step leading to globally optimal solution without backtracks.',
  },
  '13.1': {
    id: '13.1',
    title: '13.1 Interval Greedy',
    category: 'Greedy',
    level: 2,
    parentId: '13',
    childrenIds: ['13.1.1', '13.1.2', '13.1.3'],
    description: 'Sorting interval endpoints to make optimal non-overlapping choices.',
  },
  '13.1.1': {
    id: '13.1.1',
    title: '13.1.1 Activity Selection',
    category: 'Greedy',
    level: 3,
    parentId: '13.1',
    description: 'Sort by end time and pick next compatible interval.',
    leetcodeProblems: [
      { name: 'Non-overlapping Intervals', difficulty: 'Medium' }
    ]
  },
  '13.1.2': {
    id: '13.1.2',
    title: '13.1.2 Non-Overlapping Intervals',
    category: 'Greedy',
    level: 3,
    parentId: '13.1',
    description: 'Remove minimal intervals to clear all overlaps.',
    leetcodeProblems: [
      { name: 'Non-overlapping Intervals', difficulty: 'Medium' }
    ]
  },
  '13.1.3': {
    id: '13.1.3',
    title: '13.1.3 Minimum Removals',
    category: 'Greedy',
    level: 3,
    parentId: '13.1',
    description: 'Greedy removal of overlapping bounds.'
  },

  '13.2': {
    id: '13.2',
    title: '13.2 Scheduling Greedy',
    category: 'Greedy',
    level: 2,
    parentId: '13',
    childrenIds: ['13.2.1', '13.2.2'],
    description: 'Assign tasks to deadlines or maximize total profit.',
  },
  '13.2.1': {
    id: '13.2.1',
    title: '13.2.1 Deadline-Based Scheduling',
    category: 'Greedy',
    level: 3,
    parentId: '13.2',
    description: 'Sort jobs by profit and schedule at latest possible deadline slot.'
  },
  '13.2.2': {
    id: '13.2.2',
    title: '13.2.2 Profit-Based Selection',
    category: 'Greedy',
    level: 3,
    parentId: '13.2',
    description: 'Max heap priority pick for highest immediate returns.'
  },

  '13.3': {
    id: '13.3',
    title: '13.3 Resource Allocation',
    category: 'Greedy',
    level: 2,
    parentId: '13',
    childrenIds: ['13.3.1', '13.3.2'],
    description: 'Minimizing required platforms or room capacity.',
  },
  '13.3.1': {
    id: '13.3.1',
    title: '13.3.1 Minimum Platforms / Rooms',
    category: 'Greedy',
    level: 3,
    parentId: '13.3',
    description: 'Sort arrival and departure times independently to track concurrent count.',
    leetcodeProblems: [
      { name: 'Meeting Rooms II', difficulty: 'Medium' }
    ]
  },
  '13.3.2': {
    id: '13.3.2',
    title: '13.3.2 Meeting Rooms',
    category: 'Greedy',
    level: 3,
    parentId: '13.3',
    description: 'Sort start times and check for adjacent overlap.',
    leetcodeProblems: [
      { name: 'Meeting Rooms', difficulty: 'Easy' }
    ]
  },

  '13.4': {
    id: '13.4',
    title: '13.4 Jump Game Pattern',
    category: 'Greedy',
    level: 2,
    parentId: '13',
    description: 'Maintain maximum reachable index while iterating through array.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    leetcodeProblems: [
      { name: 'Jump Game', difficulty: 'Medium' },
      { name: 'Jump Game II', difficulty: 'Medium' }
    ]
  },

  '13.5': {
    id: '13.5',
    title: '13.5 Huffman / Merge Cost',
    category: 'Greedy',
    level: 2,
    parentId: '13',
    description: 'Combine smallest two elements repeatedly using min-heap (e.g., Minimum Cost to Connect Sticks).',
    leetcodeProblems: [
      { name: 'Minimum Cost to Connect Sticks', difficulty: 'Medium' }
    ]
  },

  // 14. BIT MANIPULATION
  '14': {
    id: '14',
    title: '14. Bit Manipulation',
    category: 'Bit Manipulation',
    level: 1,
    parentId: 'root',
    childrenIds: ['14.1', '14.2'],
    description: 'Direct bitwise operations (AND, OR, XOR, NOT, shifts) for constant-time bit tricks.',
  },
  '14.1': {
    id: '14.1',
    title: '14.1 Core',
    category: 'Bit Manipulation',
    level: 2,
    parentId: '14',
    childrenIds: ['14.1.1', '14.1.2'],
    description: 'Fundamental bit properties.',
  },
  '14.1.1': {
    id: '14.1.1',
    title: '14.1.1 XOR Pattern',
    category: 'Bit Manipulation',
    level: 3,
    parentId: '14.1',
    description: 'x ^ x = 0 and x ^ 0 = x. Isolates unique elements in pair sets.',
    leetcodeProblems: [
      { name: 'Single Number', difficulty: 'Easy' }
    ]
  },
  '14.1.2': {
    id: '14.1.2',
    title: '14.1.2 Bit Masking',
    category: 'Bit Manipulation',
    level: 3,
    parentId: '14.1',
    description: 'Represent boolean state array using integer binary bit set/clear flags.',
    leetcodeProblems: [
      { name: 'Subsets', difficulty: 'Medium' }
    ]
  },

  '14.2': {
    id: '14.2',
    title: '14.2 Usage',
    category: 'Bit Manipulation',
    level: 2,
    parentId: '14',
    childrenIds: ['14.2.1', '14.2.2', '14.2.3'],
    description: 'Practical applications of bitwise operations.',
  },
  '14.2.1': {
    id: '14.2.1',
    title: '14.2.1 Subset via Bits',
    category: 'Bit Manipulation',
    level: 3,
    parentId: '14.2',
    description: 'Iterate 0 to (2^N - 1) and inspect i-th bit to include/exclude elements.'
  },
  '14.2.2': {
    id: '14.2.2',
    title: '14.2.2 Bit Checks',
    category: 'Bit Manipulation',
    level: 3,
    parentId: '14.2',
    description: 'n & (n - 1) clears lowest set bit. n & (-n) isolates rightmost set bit.',
    leetcodeProblems: [
      { name: 'Number of 1 Bits', difficulty: 'Easy' },
      { name: 'Power of Two', difficulty: 'Easy' }
    ]
  },
  '14.2.3': {
    id: '14.2.3',
    title: '14.2.3 Prefix XOR',
    category: 'Bit Manipulation',
    level: 3,
    parentId: '14.2',
    description: 'XOR sum accumulation.'
  },

  // 15. SORTING ALGORITHMS
  '15': {
    id: '15',
    title: '15. Sorting Algorithms',
    category: 'Sorting Algorithms',
    level: 1,
    parentId: 'root',
    childrenIds: ['15.1', '15.2', '15.3', '15.4', '15.5', '15.6', '15.7', '15.8', '15.9'],
    description: 'Reordering items according to a comparison key. Includes comparison and non-comparison sorts.',
  },
  '15.1': {
    id: '15.1',
    title: '15.1 Bubble Sort',
    category: 'Sorting Algorithms',
    level: 2,
    parentId: '15',
    description: 'Repeatedly swap adjacent out-of-order elements.',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1)'
  },
  '15.2': {
    id: '15.2',
    title: '15.2 Selection Sort',
    category: 'Sorting Algorithms',
    level: 2,
    parentId: '15',
    description: 'Find minimum element in unsorted subarray and swap to front.',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1)'
  },
  '15.3': {
    id: '15.3',
    title: '15.3 Insertion Sort',
    category: 'Sorting Algorithms',
    level: 2,
    parentId: '15',
    description: 'Insert current element into correct position in sorted left portion.',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1)'
  },
  '15.4': {
    id: '15.4',
    title: '15.4 Merge Sort',
    category: 'Sorting Algorithms',
    level: 2,
    parentId: '15',
    description: 'Stable divide and conquer sort.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)'
  },
  '15.5': {
    id: '15.5',
    title: '15.5 Quick Sort',
    category: 'Sorting Algorithms',
    level: 2,
    parentId: '15',
    description: 'In-place partitioning around chosen pivot element.',
    timeComplexity: 'O(N log N) avg, O(N^2) worst',
    spaceComplexity: 'O(log N)'
  },
  '15.6': {
    id: '15.6',
    title: '15.6 Heap Sort',
    category: 'Sorting Algorithms',
    level: 2,
    parentId: '15',
    description: 'Build max-heap and swap max element with end repeatedly.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(1)'
  },
  '15.7': {
    id: '15.7',
    title: '15.7 Counting Sort',
    category: 'Sorting Algorithms',
    level: 2,
    parentId: '15',
    description: 'Non-comparison sort counting frequencies for bounded integer ranges.',
    timeComplexity: 'O(N + K)',
    spaceComplexity: 'O(K)'
  },
  '15.8': {
    id: '15.8',
    title: '15.8 Radix Sort',
    category: 'Sorting Algorithms',
    level: 2,
    parentId: '15',
    description: 'Non-comparison sort grouping numbers by individual digit positions from LSD to MSD.',
    timeComplexity: 'O(d * (N + K))',
    spaceComplexity: 'O(N + K)'
  },
  '15.9': {
    id: '15.9',
    title: '15.9 Bucket Sort',
    category: 'Sorting Algorithms',
    level: 2,
    parentId: '15',
    description: 'Distribute elements into uniform bucket arrays and sort individual buckets.',
    timeComplexity: 'O(N + K) avg',
    spaceComplexity: 'O(N)'
  },

  // 16. RANGE STRUCTURES
  '16': {
    id: '16',
    title: '16. Range Structures',
    category: 'Range Structures',
    level: 1,
    parentId: 'root',
    childrenIds: ['16.1', '16.2'],
    description: 'Advanced tree structures for dynamic range queries and point/range updates in O(log N).',
  },
  '16.1': {
    id: '16.1',
    title: '16.1 Segment Tree',
    category: 'Range Structures',
    level: 2,
    parentId: '16',
    childrenIds: ['16.1.1', '16.1.2'],
    description: 'Binary tree storing segment aggregates for dynamic sum/min/max range queries.',
  },
  '16.1.1': {
    id: '16.1.1',
    title: '16.1.1 Range Query',
    category: 'Range Structures',
    level: 3,
    parentId: '16.1',
    description: 'Query arbitrary subarray [L, R] sum/min/max in O(log N) time.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(4N)',
    leetcodeProblems: [
      { name: 'Range Sum Query - Mutable', difficulty: 'Medium' }
    ]
  },
  '16.1.2': {
    id: '16.1.2',
    title: '16.1.2 Lazy Propagation',
    category: 'Range Structures',
    level: 3,
    parentId: '16.1',
    description: 'Defer range updates to child nodes until child is explicitly queried.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(4N)'
  },

  '16.2': {
    id: '16.2',
    title: '16.2 Fenwick Tree',
    category: 'Range Structures',
    level: 2,
    parentId: '16',
    childrenIds: ['16.2.1'],
    description: 'Binary Indexed Tree (BIT) using lowest set bit (i & -i) to maintain prefix aggregates with minimal code.',
  },
  '16.2.1': {
    id: '16.2.1',
    title: '16.2.1 Prefix Query',
    category: 'Range Structures',
    level: 3,
    parentId: '16.2',
    description: 'Query prefix sum and point update array element in O(log N) time with single array storage.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Count of Smaller Numbers After Self', difficulty: 'Hard' }
    ]
  },

  // 17. ADVANCED GRAPHS
  '17': {
    id: '17',
    title: '17. Advanced Graphs',
    category: 'Advanced Graphs',
    level: 1,
    parentId: 'root',
    childrenIds: ['17.1', '17.2', '17.3', '17.4', '17.5'],
    description: 'High-level graph algorithms: SCCs, bridges, articulation points, Euler paths, and network flows.',
  },
  '17.1': {
    id: '17.1',
    title: '17.1 Strongly Connected Components (SCC)',
    category: 'Advanced Graphs',
    level: 2,
    parentId: '17',
    childrenIds: ['17.1.1', '17.1.2'],
    description: 'Subgraphs in directed graphs where every vertex is reachable from every other vertex in the component.',
  },
  '17.1.1': {
    id: '17.1.1',
    title: '17.1.1 Kosaraju Algorithm',
    category: 'Advanced Graphs',
    level: 3,
    parentId: '17.1',
    description: 'Finds all SCCs in two DFS passes: first pass records finish times, second pass traverses reversed graph.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    keyTechnique: 'Stack order on original graph DFS, then traverse transposed graph in pop order.',
    codeSnippet: `void dfs1(int u, vector<bool>& vis, stack<int>& st, vector<vector<int>>& adj) {
    vis[u] = true;
    for (int v : adj[u]) if (!vis[v]) dfs1(v, vis, st, adj);
    st.push(u);
}
void dfs2(int u, vector<bool>& vis, vector<vector<int>>& radj, vector<int>& comp) {
    vis[u] = true; comp.push_back(u);
    for (int v : radj[u]) if (!vis[v]) dfs2(v, vis, radj, comp);
}`,
    leetcodeProblems: [
      { name: 'Critical Connections in a Network', difficulty: 'Hard' }
    ]
  },
  '17.1.2': {
    id: '17.1.2',
    title: '17.1.2 Tarjan Algorithm',
    category: 'Advanced Graphs',
    level: 3,
    parentId: '17.1',
    description: 'Single-pass DFS tracking discovery time (tin) and lowest reachable time (low) using an active stack.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    keyTechnique: 'Track low[u] = min(low[u], low[v]) and pop stack when tin[u] == low[u].',
    codeSnippet: `void tarjan(int u) {
    tin[u] = low[u] = ++timer;
    st.push(u); inStack[u] = true;
    for (int v : adj[u]) {
        if (tin[v] == -1) { tarjan(v); low[u] = min(low[u], low[v]); }
        else if (inStack[v]) low[u] = min(low[u], tin[v]);
    }
}`
  },
  '17.2': {
    id: '17.2',
    title: '17.2 Bridges',
    category: 'Advanced Graphs',
    level: 2,
    parentId: '17',
    childrenIds: ['17.2.1', '17.2.2'],
    description: 'Edges whose removal increases the number of connected components in an undirected graph.',
  },
  '17.2.1': {
    id: '17.2.1',
    title: '17.2.1 Critical Connections',
    category: 'Advanced Graphs',
    level: 3,
    parentId: '17.2',
    description: 'Find edges where low[v] > tin[u] during DFS, identifying single failure points in networks.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    keyTechnique: 'DFS low link values ignoring immediate parent edge.',
    codeSnippet: `if (low[v] > tin[u]) bridges.push_back({u, v});`,
    leetcodeProblems: [
      { name: 'Critical Connections in a Network', difficulty: 'Hard' }
    ]
  },
  '17.2.2': {
    id: '17.2.2',
    title: '17.2.2 Bridge Finding',
    category: 'Advanced Graphs',
    level: 3,
    parentId: '17.2',
    description: 'General DFS bridge traversal skipping parent edge to maintain low values for back-edges.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)'
  },
  '17.3': {
    id: '17.3',
    title: '17.3 Articulation Points',
    category: 'Advanced Graphs',
    level: 2,
    parentId: '17',
    childrenIds: ['17.3.1', '17.3.2'],
    description: 'Vertices whose removal increases the number of connected components (cut vertices).',
  },
  '17.3.1': {
    id: '17.3.1',
    title: '17.3.1 Cut Vertices',
    category: 'Advanced Graphs',
    level: 3,
    parentId: '17.3',
    description: 'Root is a cut vertex if it has >=2 children. Non-root u is a cut vertex if any child v has low[v] >= tin[u].',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    codeSnippet: `if (parent != -1 && low[v] >= tin[u]) isCutVertex[u] = true;`
  },
  '17.3.2': {
    id: '17.3.2',
    title: '17.3.2 Network Connectivity',
    category: 'Advanced Graphs',
    level: 3,
    parentId: '17.3',
    description: 'Apply cut vertices to determine essential router nodes and biconnected component boundaries.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)'
  },
  '17.4': {
    id: '17.4',
    title: '17.4 Euler Path / Circuit',
    category: 'Advanced Graphs',
    level: 2,
    parentId: '17',
    childrenIds: ['17.4.1', '17.4.2'],
    description: 'Traverse every edge in a finite graph exactly once (Euler Path) or return to starting vertex (Euler Circuit).',
  },
  '17.4.1': {
    id: '17.4.1',
    title: '17.4.1 Hierholzer Algorithm',
    category: 'Advanced Graphs',
    level: 3,
    parentId: '17.4',
    description: 'Linear time algorithm using post-order DFS / stack to construct Eulerian path by removing traversed edges.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    codeSnippet: `void dfs(int u) {
    while (!adj[u].empty()) {
        int v = adj[u].back(); adj[u].pop_back();
        dfs(v);
    }
    path.push_back(u);
}`,
    leetcodeProblems: [
      { name: 'Reconstruct Itinerary', difficulty: 'Hard' },
      { name: 'Valid Arrangement of Pairs', difficulty: 'Hard' }
    ]
  },
  '17.4.2': {
    id: '17.4.2',
    title: '17.4.2 Degree Conditions',
    category: 'Advanced Graphs',
    level: 3,
    parentId: '17.4',
    description: 'Undirected: Euler Circuit iff all degrees even. Directed: Euler Circuit iff in-degree == out-degree for all vertices.',
    timeComplexity: 'O(V)',
    spaceComplexity: 'O(1)'
  },
  '17.5': {
    id: '17.5',
    title: '17.5 Network Flow',
    category: 'Advanced Graphs',
    level: 2,
    parentId: '17',
    childrenIds: ['17.5.1', '17.5.2', '17.5.3'],
    description: 'Compute maximum capacity flow from source to sink in a directed graph.',
  },
  '17.5.1': {
    id: '17.5.1',
    title: '17.5.1 Ford-Fulkerson',
    category: 'Advanced Graphs',
    level: 3,
    parentId: '17.5',
    description: 'Greedy augmentation path method iteratively pushing bottleneck residual flow from source to sink.',
    timeComplexity: 'O(E * max_flow)',
    spaceComplexity: 'O(V + E)'
  },
  '17.5.2': {
    id: '17.5.2',
    title: '17.5.2 Edmonds-Karp',
    category: 'Advanced Graphs',
    level: 3,
    parentId: '17.5',
    description: 'Implementation of Ford-Fulkerson using BFS to pick shortest augmenting paths, guaranteeing polynomial time.',
    timeComplexity: 'O(V * E^2)',
    spaceComplexity: 'O(V + E)'
  },
  '17.5.3': {
    id: '17.5.3',
    title: '17.5.3 Maximum Bipartite Matching',
    category: 'Advanced Graphs',
    level: 3,
    parentId: '17.5',
    description: 'Reduce bipartite graph matching to max flow problem by connecting source to set A and set B to sink with unit capacity.',
    timeComplexity: 'O(V * E)',
    spaceComplexity: 'O(V + E)',
    leetcodeProblems: [
      { name: 'Maximum Students Taking Exam', difficulty: 'Hard' }
    ]
  },

  // 18. ADVANCED DYNAMIC PROGRAMMING
  '18': {
    id: '18',
    title: '18. Advanced Dynamic Programming',
    category: 'Advanced Dynamic Programming',
    level: 1,
    parentId: 'root',
    childrenIds: ['18.1', '18.2', '18.3', '18.4', '18.5'],
    description: 'Advanced DP states, tree rerooting, optimizations, and bitmask techniques for competitive programming.',
  },
  '18.1': {
    id: '18.1',
    title: '18.1 State Compression DP (Bitmask DP)',
    category: 'Advanced Dynamic Programming',
    level: 2,
    parentId: '18',
    description: 'Represent subset states as bitmask integers to solve NP-hard subset problems (e.g., TSP, assignment problem) for N <= 20.',
    timeComplexity: 'O(2^N * N^2)',
    spaceComplexity: 'O(2^N * N)',
    codeSnippet: `for (int mask = 0; mask < (1 << n); ++mask) {
    for (int u = 0; u < n; ++u) {
        if (!(mask & (1 << u))) continue;
        for (int v = 0; v < n; ++v) {
            if (!(mask & (1 << v))) {
                dp[mask | (1 << v)][v] = min(dp[mask | (1 << v)][v], dp[mask][u] + dist[u][v]);
            }
        }
    }
}`,
    leetcodeProblems: [
      { name: 'Shortest Path Visiting All Nodes', difficulty: 'Hard' },
      { name: 'Find the Shortest Superstring', difficulty: 'Hard' }
    ]
  },
  '18.2': {
    id: '18.2',
    title: '18.2 Tree Rerooting DP',
    category: 'Advanced Dynamic Programming',
    level: 2,
    parentId: '18',
    description: 'Compute DP result for every node as root in O(N) by combining bottom-up subtree values with top-down parent contributions.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetcodeProblems: [
      { name: 'Sum of Distances in Tree', difficulty: 'Hard' }
    ]
  },
  '18.3': {
    id: '18.3',
    title: '18.3 Profile DP (Broken Profile)',
    category: 'Advanced Dynamic Programming',
    level: 2,
    parentId: '18',
    description: 'DP over grid boundaries cell-by-cell maintaining filled profile masks to count valid tilings and domino coverings.',
    timeComplexity: 'O(N * M * 2^M)',
    spaceComplexity: 'O(2^M)'
  },
  '18.4': {
    id: '18.4',
    title: '18.4 DP Optimization Techniques',
    category: 'Advanced Dynamic Programming',
    level: 2,
    parentId: '18',
    childrenIds: ['18.4.1', '18.4.2', '18.4.3'],
    description: 'Mathematical and structural optimizations to accelerate polynomial DP recurrence evaluations.',
  },
  '18.4.1': {
    id: '18.4.1',
    title: '18.4.1 Convex Hull Trick',
    category: 'Advanced Dynamic Programming',
    level: 3,
    parentId: '18.4',
    description: 'Maintain upper/lower envelope of linear functions y = m*x + c to optimize 1D DP transitions from O(N^2) to O(N log N) or O(N).',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)'
  },
  '18.4.2': {
    id: '18.4.2',
    title: '18.4.2 Divide & Conquer DP',
    category: 'Advanced Dynamic Programming',
    level: 3,
    parentId: '18.4',
    description: 'Applies when optimal split point opt(i, j) satisfies monotonicity opt(i, j-1) <= opt(i, j) <= opt(i+1, j), reducing O(K N^2) to O(K N log N).',
    timeComplexity: 'O(K * N log N)',
    spaceComplexity: 'O(K * N)'
  },
  '18.4.3': {
    id: '18.4.3',
    title: '18.4.3 Knuth Optimization',
    category: 'Advanced Dynamic Programming',
    level: 3,
    parentId: '18.4',
    description: 'Optimizes range DP dp[i][j] when opt[i][j-1] <= opt[i][j] <= opt[i+1][j], reducing runtime from O(N^3) to O(N^2).',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(N^2)'
  },
  '18.5': {
    id: '18.5',
    title: '18.5 Sum Over Subsets (SOS) DP',
    category: 'Advanced Dynamic Programming',
    level: 2,
    parentId: '18',
    description: 'Compute sum of functions f(mask) for all submasks of a bitmask in O(N 2^N) time using dimension-by-dimension state propagation.',
    timeComplexity: 'O(N * 2^N)',
    spaceComplexity: 'O(2^N)',
    codeSnippet: `for(int i = 0; i<N; ++i) {
    for(int mask = 0; mask < (1<<N); ++mask) {
        if(mask & (1<<i))
            F[mask] += F[mask ^ (1<<i)];
    }
}`,
    leetcodeProblems: [
      { name: 'Partition to K Equal Sum Subsets', difficulty: 'Medium' }
    ]
  },

  // 19. ADVANCED STRING ALGORITHMS
  '19': {
    id: '19',
    title: '19. Advanced String Algorithms',
    category: 'Advanced String Algorithms',
    level: 1,
    parentId: 'root',
    childrenIds: ['19.1', '19.2', '19.3', '19.4', '19.5', '19.6'],
    description: 'High-performance string matching, indexing structures, and linear-time pattern recognition.',
  },
  '19.1': {
    id: '19.1',
    title: '19.1 Rolling Hash',
    category: 'Advanced String Algorithms',
    level: 2,
    parentId: '19',
    description: 'Polynomial hashing technique enabling O(1) comparison of arbitrary substrings after O(N) precomputation.',
    timeComplexity: 'O(1) per query',
    spaceComplexity: 'O(N)',
    codeSnippet: `long long getHash(int l, int r) {
    return (hashVal[r + 1] - hashVal[l] * power[r - l + 1] % MOD + MOD) % MOD;
}`,
    leetcodeProblems: [
      { name: 'Repeated DNA Sequences', difficulty: 'Medium' },
      { name: 'Longest Duplicate Substring', difficulty: 'Hard' }
    ]
  },
  '19.2': {
    id: '19.2',
    title: '19.2 Double Hashing',
    category: 'Advanced String Algorithms',
    level: 2,
    parentId: '19',
    description: 'Computes two independent hash values with separate prime bases (e.g., 10^9+7 and 10^9+9) to guarantee zero collisions.',
    timeComplexity: 'O(1) per query',
    spaceComplexity: 'O(N)'
  },
  '19.3': {
    id: '19.3',
    title: '19.3 Suffix Array',
    category: 'Advanced String Algorithms',
    level: 2,
    parentId: '19',
    description: 'Sorted array of all suffixes of a string, enabling fast substring search in O(M log N) time.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)'
  },
  '19.4': {
    id: '19.4',
    title: '19.4 LCP Array',
    category: 'Advanced String Algorithms',
    level: 2,
    parentId: '19',
    description: 'Array storing lengths of longest common prefixes between adjacent suffixes in the Suffix Array, constructed in O(N) via Kasai algorithm.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  '19.5': {
    id: '19.5',
    title: '19.5 Suffix Automaton',
    category: 'Advanced String Algorithms',
    level: 2,
    parentId: '19',
    description: 'Minimal state machine encoding all substrings of a string in O(N) vertices and O(N) edges.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  '19.6': {
    id: '19.6',
    title: '19.6 Manacher Algorithm',
    category: 'Advanced String Algorithms',
    level: 2,
    parentId: '19',
    description: 'Finds all palindromic substrings and the longest palindrome in O(N) linear time by utilizing previously calculated palindrome radii.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    codeSnippet: `int c = 0, r = 0;
for (int i = 0; i < n; i++) {
    int iMirror = 2 * c - i;
    if (r > i) P[i] = min(r - i, P[iMirror]);
    while (T[i + 1 + P[i]] == T[i - 1 - P[i]]) P[i]++;
    if (i + P[i] > r) { c = i; r = i + P[i]; }
}`,
    leetcodeProblems: [
      { name: 'Longest Palindromic Substring', difficulty: 'Medium' }
    ]
  }
};

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  'Array': { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-800 dark:text-emerald-200', border: 'border-emerald-300 dark:border-emerald-700', accent: '#059669' },
  'String': { bg: 'bg-sky-50 dark:bg-sky-950/40', text: 'text-sky-800 dark:text-sky-200', border: 'border-sky-300 dark:border-sky-700', accent: '#0284c7' },
  'Hash Map': { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-800 dark:text-amber-200', border: 'border-amber-300 dark:border-amber-700', accent: '#d97706' },
  'Stack': { bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-800 dark:text-indigo-200', border: 'border-indigo-300 dark:border-indigo-700', accent: '#4f46e5' },
  'Queue / Deque': { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-800 dark:text-blue-200', border: 'border-blue-300 dark:border-blue-700', accent: '#2563eb' },
  'Linked List': { bg: 'bg-teal-50 dark:bg-teal-950/40', text: 'text-teal-800 dark:text-teal-200', border: 'border-teal-300 dark:border-teal-700', accent: '#0d9488' },
  'Trees': { bg: 'bg-green-50 dark:bg-green-950/40', text: 'text-green-800 dark:text-green-200', border: 'border-green-300 dark:border-green-700', accent: '#16a34a' },
  'Recursion': { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-800 dark:text-purple-200', border: 'border-purple-300 dark:border-purple-700', accent: '#9333ea' },
  'Heap': { bg: 'bg-orange-50 dark:bg-orange-950/40', text: 'text-orange-800 dark:text-orange-200', border: 'border-orange-300 dark:border-orange-700', accent: '#ea580c' },
  'Graphs': { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-800 dark:text-rose-200', border: 'border-rose-300 dark:border-rose-700', accent: '#e11d48' },
  'Trie': { bg: 'bg-cyan-50 dark:bg-cyan-950/40', text: 'text-cyan-800 dark:text-cyan-200', border: 'border-cyan-300 dark:border-cyan-700', accent: '#0891b2' },
  'Dynamic Programming': { bg: 'bg-violet-50 dark:bg-violet-950/40', text: 'text-violet-800 dark:text-violet-200', border: 'border-violet-300 dark:border-violet-700', accent: '#7c3aed' },
  'Greedy': { bg: 'bg-lime-50 dark:bg-lime-950/40', text: 'text-lime-800 dark:text-lime-200', border: 'border-lime-300 dark:border-lime-700', accent: '#65a30d' },
  'Bit Manipulation': { bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40', text: 'text-fuchsia-800 dark:text-fuchsia-200', border: 'border-fuchsia-300 dark:border-fuchsia-700', accent: '#c026d3' },
  'Sorting Algorithms': { bg: 'bg-yellow-50 dark:bg-yellow-950/40', text: 'text-yellow-800 dark:text-yellow-200', border: 'border-yellow-300 dark:border-yellow-700', accent: '#ca8a04' },
  'Range Structures': { bg: 'bg-slate-50 dark:bg-slate-900', text: 'text-slate-800 dark:text-slate-200', border: 'border-slate-300 dark:border-slate-700', accent: '#475569' },
  'Advanced Graphs': { bg: 'bg-red-50 dark:bg-red-950/40', text: 'text-red-800 dark:text-red-200', border: 'border-red-300 dark:border-red-700', accent: '#dc2626' },
  'Advanced Dynamic Programming': { bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40', text: 'text-fuchsia-800 dark:text-fuchsia-200', border: 'border-fuchsia-300 dark:border-fuchsia-700', accent: '#a21caf' },
  'Advanced String Algorithms': { bg: 'bg-cyan-50 dark:bg-cyan-950/40', text: 'text-cyan-800 dark:text-cyan-200', border: 'border-cyan-300 dark:border-cyan-700', accent: '#0e7490' },
};
