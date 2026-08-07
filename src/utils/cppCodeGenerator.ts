import { DSANode } from '../types';
import { dsaTreeData } from '../data/dsaData';

/**
 * Converts or generates C++ algorithm code for any DSANode.
 */
export function generateCppCodeSnippet(node: DSANode): string {
  // Find codeSnippet from node or first child that has one
  let rawJsSnippet = node.codeSnippet || '';

  if (!rawJsSnippet && node.childrenIds && node.childrenIds.length > 0) {
    for (const childId of node.childrenIds) {
      const child = dsaTreeData[childId];
      if (child && child.codeSnippet) {
        rawJsSnippet = child.codeSnippet;
        break;
      }
    }
  }

  const cleanTitle = node.title.replace(/^\d+(\.\d+)*\s*/, '');
  const camelName = cleanTitle.replace(/[^a-zA-Z0-9]/g, '') || 'solvePattern';

  if (!rawJsSnippet) {
    // Generate C++ stub template with proper headers and strong types
    return `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

using namespace std;

// ${node.title} - C++ Algorithm Pattern
// Key Technique: ${node.keyTechnique || node.description || 'Core algorithmic pattern'}
// Time Complexity: ${node.timeComplexity || 'O(N)'} | Space Complexity: ${node.spaceComplexity || 'O(1)'}

class Solution {
public:
    void ${camelName}(vector<int>& nums) {
        if (nums.empty()) return;

        int left = 0;
        int right = nums.size() - 1;

        // Implement ${cleanTitle} pattern logic here
        while (left < right) {
            // Process elements
            left++;
            right--;
        }
    }
};`;
  }

  // Convert JS code snippet to idiomatic C++ snippet
  let cpp = rawJsSnippet;

  // Replace variable declarations
  cpp = cpp.replace(/\blet\b/g, 'int');
  cpp = cpp.replace(/\bconst\b/g, 'int');

  // Replace array & string methods and properties
  cpp = cpp.replace(/arr\.length/g, 'nums.size()');
  cpp = cpp.replace(/nums\.length/g, 'nums.size()');
  cpp = cpp.replace(/chars\.length/g, 'chars.size()');
  cpp = cpp.replace(/s\.length/g, 's.length()');
  cpp = cpp.replace(/words\.length/g, 'words.size()');
  cpp = cpp.replace(/p\.length/g, 'p.length()');
  cpp = cpp.replace(/t\.length/g, 't.length()');

  // Array swap pattern: [arr[a], arr[b]] = [arr[b], arr[a]]; -> swap(nums[a], nums[b]);
  cpp = cpp.replace(/\[\s*(arr|nums|words)\[([^\]]+)\]\s*,\s*\1\[([^\]]+)\]\s*\]\s*=\s*\[\s*\1\[\3\]\s*,\s*\1\[\2\]\s*\];/g, 'swap($1[$2], $1[$3]);');
  cpp = cpp.replace(/\[\s*(words|chars)\[([^\]]+)\]\s*,\s*\1\[([^\]]+)\]\s*\]\s*=\s*\[\s*\1\[\3\]\s*,\s*\1\[\2\]\s*\];/g, 'swap($1[$2], $1[$3]);');

  // JS Math & Constant replacements
  cpp = cpp.replace(/Math\.min/g, 'min');
  cpp = cpp.replace(/Math\.max/g, 'max');
  cpp = cpp.replace(/Infinity/g, 'INT_MAX');

  // Maps / Deques / Arrays
  cpp = cpp.replace(/int charMap = new Map\(\);/g, 'unordered_map<char, int> charMap;');
  cpp = cpp.replace(/int deque = \[\];/g, 'deque<int> dq;');
  cpp = cpp.replace(/int res = \[\];/g, 'vector<int> res;');
  cpp = cpp.replace(/deque\.length/g, 'dq.size()');
  cpp = cpp.replace(/deque\.push\(([^)]+)\)/g, 'dq.push_back($1)');
  cpp = cpp.replace(/deque\.shift\(\)/g, 'dq.pop_front()');
  cpp = cpp.replace(/deque\.pop\(\)/g, 'dq.pop_back()');
  cpp = cpp.replace(/deque\[0\]/g, 'dq.front()');
  cpp = cpp.replace(/deque\[deque\.size\(\) - 1\]/g, 'dq.back()');
  cpp = cpp.replace(/res\.push\(([^)]+)\)/g, 'res.push_back($1)');

  // Fix typings in declarations
  cpp = cpp.replace(/int (low|mid|high|left|right|windowSum|maxSum|minLen|sum|needed|formed|start|write|read) =/g, 'int $1 =');
  cpp = cpp.replace(/int prefix = new Array\(nums\.size\(\) \+ 1\)\.fill\(0\);/g, 'vector<int> prefix(nums.size() + 1, 0);');
  cpp = cpp.replace(/int prefixXOR = new Array\(nums\.size\(\) \+ 1\)\.fill\(0\);/g, 'vector<int> prefixXOR(nums.size() + 1, 0);');
  cpp = cpp.replace(/int pCount = new Array\(26\)\.fill\(0\);/g, 'vector<int> pCount(26, 0);');
  cpp = cpp.replace(/int sCount = new Array\(26\)\.fill\(0\);/g, 'vector<int> sCount(26, 0);');
  cpp = cpp.replace(/int windowMap = \{\};/g, 'unordered_map<char, int> windowMap;');
  cpp = cpp.replace(/int targetMap = \{\};/g, 'unordered_map<char, int> targetMap;');

  // Loop replacements
  cpp = cpp.replace(/for \(int i = 0;/g, 'for (int i = 0;');
  cpp = cpp.replace(/for \(int right = 0;/g, 'for (int right = 0;');

  // Standard C++ Header & Class wrapper
  return `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <deque>
#include <algorithm>
#include <climits>

using namespace std;

// ${node.title} (C++ Implementation)
// Technique: ${node.keyTechnique || node.description || 'Algorithmic Pattern'}
// Complexity: Time: ${node.timeComplexity || 'O(N)'} | Space: ${node.spaceComplexity || 'O(1)'}

class Solution {
public:
    void ${camelName}(vector<int>& nums) {
${indentCppCode(cpp)}
    }
};`;
}

function indentCppCode(code: string): string {
  return code
    .split('\n')
    .map((line) => '        ' + line)
    .join('\n');
}
