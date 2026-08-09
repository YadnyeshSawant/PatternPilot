import { DSANode } from '../types';

/**
 * Dynamically updates document head tags (title, description, canonical, JSON-LD)
 * for search engine indexing when navigating topics or home.
 */
export function updateSEOMetadata(node: DSANode | null) {
  const baseUrl = 'https://yadnyeshsawant.github.io/PatternPilot/';

  if (node) {
    const title = `${node.title} — Data Structures & Algorithms Pattern | PatternPilot`;
    const description = `${node.title} (${node.category}): ${
      node.description || 'Learn algorithmic techniques, C++ code templates, time complexity analysis, and practice problems.'
    }`;
    const canonicalUrl = `${baseUrl}?topic=${encodeURIComponent(node.id)}`;

    // 1. Update Document Title
    document.title = title;

    // 2. Update Meta Description
    updateMetaTag('name', 'description', description);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);

    // 3. Update Canonical Tag
    updateCanonicalTag(canonicalUrl);

    // 4. Inject Dynamic Schema.org JSON-LD for Google Rich Snippets
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: node.title,
      description: description,
      articleSection: node.category,
      proficiencyLevel: `Level ${node.level}`,
      dependencies: node.timeComplexity ? `Time Complexity: ${node.timeComplexity}` : undefined,
      author: {
        '@type': 'Organization',
        name: 'PatternPilot',
      },
      mainEntityOfPage: canonicalUrl,
    };
    injectJsonLdScript(jsonLd);
  } else {
    // Reset to Home / Default Metadata
    const defaultTitle = 'PatternPilot — Data Structures & Algorithms Roadmap & C++ Visualizer';
    const defaultDesc =
      'Master Data Structures & Algorithms (DSA) with PatternPilot. Interactive 19-module syllabus, algorithmic patterns, C++ code templates, LeetCode problem maps, and time complexity guides.';

    document.title = defaultTitle;
    updateMetaTag('name', 'description', defaultDesc);
    updateMetaTag('property', 'og:title', 'PatternPilot — Interactive Data Structures & Algorithms Syllabus');
    updateMetaTag('property', 'og:description', defaultDesc);
    updateMetaTag('property', 'og:url', baseUrl);
    updateMetaTag('name', 'twitter:title', defaultTitle);
    updateMetaTag('name', 'twitter:description', defaultDesc);
    updateCanonicalTag(baseUrl);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'PatternPilot: Complete Data Structures & Algorithms Mastery',
      description: defaultDesc,
      provider: {
        '@type': 'Organization',
        name: 'PatternPilot',
        sameAs: baseUrl,
      },
    };
    injectJsonLdScript(jsonLd);
  }
}

function updateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonicalTag(url: string) {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

function injectJsonLdScript(data: object) {
  let script = document.querySelector<HTMLScriptElement>('#dynamic-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'dynamic-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}
