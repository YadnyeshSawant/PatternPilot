import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { dsaTreeData } from '../data/dsaData';
import { generateCppCodeSnippet } from './cppCodeGenerator';

export async function exportToPng(elementId: string, filename = 'dsa-mindmap.png'): Promise<void> {
  const node = document.getElementById(elementId);
  if (!node) throw new Error('Canvas element not found');

  try {
    const dataUrl = await toPng(node, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#f8fafc', // Light slate canvas
      filter: (domNode) => {
        // Exclude controls or toolbar from export if any inside element
        if (domNode instanceof HTMLElement && domNode.classList.contains('no-export')) {
          return false;
        }
        return true;
      }
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Failed to export PNG:', error);
    throw error;
  }
}

export async function exportToPdf(_elementId?: string, filename = 'DSA_Algorithm_Patterns_Report.pdf'): Promise<void> {
  try {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Title & Header Styling
    doc.setFontSize(16);
    doc.setTextColor(30, 41, 59); // Slate 800
    doc.text('DSA Algorithm Patterns & Practice Problems Report', 14, 15);

    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Structured Pattern Reference Guide', 14, 21);

    const head = [[
      'Category',
      'Pattern Name',
      'Subtopics',
      'Algorithm Pattern Code',
      'Recommended Practice Problems',
      'Level Per Problem'
    ]];

    const body: string[][] = [];

    Object.values(dsaTreeData).forEach((node) => {
      const categoryName = node.category || 'General';
      const patternName = node.title;
      const subtopics = node.keyTechnique || node.description || '';
      const rawCode = generateCppCodeSnippet(node);

      if (node.leetcodeProblems && node.leetcodeProblems.length > 0) {
        node.leetcodeProblems.forEach((prob) => {
          body.push([
            categoryName,
            patternName,
            subtopics,
            rawCode,
            prob.name,
            prob.difficulty
          ]);
        });
      } else {
        body.push([
          categoryName,
          patternName,
          subtopics,
          rawCode,
          'N/A',
          'N/A'
        ]);
      }
    });

    autoTable(doc, {
      startY: 25,
      head: head,
      body: body,
      theme: 'grid',
      styles: {
        fontSize: 7,
        cellPadding: 2,
        overflow: 'linebreak',
        valign: 'top',
      },
      headStyles: {
        fillColor: [79, 70, 229], // Indigo 600
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8,
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Category
        1: { cellWidth: 35 }, // Pattern Name
        2: { cellWidth: 45 }, // Subtopics
        3: { cellWidth: 80, font: 'courier' }, // Algorithm Pattern Code
        4: { cellWidth: 50 }, // Recommended Practice Problems
        5: { cellWidth: 25 }, // Level Per Problem
      },
      margin: { top: 25, right: 10, bottom: 15, left: 10 },
    });

    doc.save(filename);
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw error;
  }
}

