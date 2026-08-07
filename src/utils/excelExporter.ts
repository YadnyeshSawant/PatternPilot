import { dsaTreeData } from '../data/dsaData';
import { generateCppCodeSnippet } from './cppCodeGenerator';

/**
 * Generates and downloads an Excel-compatible CSV dataset matching the requested schema:
 * - Category
 * - Pattern Name
 * - Subtopics
 * - Algorithm Pattern Code
 * - Recommended Practice Problems
 * - Level Per Problem
 */
export function exportToExcelCSV() {
  const headers = [
    'Category',
    'Pattern Name',
    'Subtopics',
    'Algorithm Pattern Code',
    'Recommended Practice Problems',
    'Level Per Problem'
  ];

  const rows: string[][] = [headers];

  Object.values(dsaTreeData).forEach((node) => {
    // Determine category name
    const categoryName = node.category || 'General';

    // Pattern Name
    const patternName = node.title;

    // Subtopics / Description / Technique
    const subtopics = node.keyTechnique || node.description || '';

    // Code Snippet (default C++ or JavaScript)
    const rawCode = generateCppCodeSnippet(node);

    // Recommended Problems & Difficulty Levels
    if (node.leetcodeProblems && node.leetcodeProblems.length > 0) {
      node.leetcodeProblems.forEach((prob) => {
        rows.push([
          escapeCsvField(categoryName),
          escapeCsvField(patternName),
          escapeCsvField(subtopics),
          escapeCsvField(rawCode),
          escapeCsvField(prob.name),
          escapeCsvField(prob.difficulty)
        ]);
      });
    } else {
      rows.push([
        escapeCsvField(categoryName),
        escapeCsvField(patternName),
        escapeCsvField(subtopics),
        escapeCsvField(rawCode),
        escapeCsvField('N/A'),
        escapeCsvField('N/A')
      ]);
    }
  });

  // Convert array of rows to CSV string (with BOM for Excel UTF-8 support)
  const csvContent = '\uFEFF' + rows.map((r) => r.join(',')).join('\n');

  // Trigger browser file download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `DSA_Algorithm_Patterns_Structure.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Helper to escape quotes and commas for Excel CSV format
 */
function escapeCsvField(field: string): string {
  if (!field) return '""';
  const escaped = field.replace(/"/g, '""');
  return `"${escaped}"`;
}
