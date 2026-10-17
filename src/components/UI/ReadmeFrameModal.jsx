import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Built-in fallbacks if offline or GitHub API is unavailable
const FALLBACK_READMES = {
  prins: `# prins

> **npm Pre-Install Package Inspector**  
> Know what's inside before it hits your disk.

\`\`\`bash
npm install -g prins-cli
# or run directly:
npx prins-cli <package-name>
\`\`\`

### Overview
When installing packages, standard package managers extract files without showing key metadata:
- Unpacked disk space consumed
- Number of direct dependencies
- License type
- Publisher and author details
- Background installation scripts
- Deprecation warnings

**prins** queries registry metadata before installation, displays a summary card, and asks for confirmation before downloading anything to your project.`,

  depshred: `# depshred

> **Clean up your node_modules. Stop installing stuff Node already has.**

\`\`\`bash
npx depshred
\`\`\`

### Why depshred?
When following tutorials or generating code with AI, it is easy to end up with dozens of unnecessary packages for tasks modern Node.js already handles natively (e.g. \`dotenv\`, \`uuid\`, \`rimraf\`).

**depshred** analyzes your dependencies, identifies packages you do not actually need, and demonstrates how to replace them with clean, native Node standard library code.`
};

/**
 * Minimal, resilient Markdown & HTML renderer for GitHub READMEs
 * Handles relative images, HTML tags (<div align="center">, <p>, <a>, <img>),
 * code fences, lists, headers (h1-h6), and badges without external dependencies.
 */
function MarkdownRenderer({ content, repo, branch }) {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    let raw = content;

    // 1. Rewrite relative image sources to raw GitHub URLs
    const rawBase = `https://raw.githubusercontent.com/gozajpeg/${repo}/${branch}/`;
    raw = raw.replace(/src=["'](?!http)(?:\.\/)?([^"']+)["']/g, `src="${rawBase}$1"`);
    raw = raw.replace(/!\[([^\]]*)\]\((?!http)(?:\.\/)?([^)]+)\)/g, `![$1](${rawBase}$2)`);

    // 2. Extract code blocks to protect them during markdown parsing
    const codeBlocks = [];
    raw = raw.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, (_, lang, code) => {
      const idx = codeBlocks.length;
      codeBlocks.push({ lang: lang.trim(), code: code.trim() });
      return `__CODE_BLOCK_${idx}__`;
    });

    // 3. Convert Markdown syntax to HTML
    // Headers: parse from most # to fewest # to prevent greedy prefix conflicts
    raw = raw.replace(/^###### (.*$)/gim, '<h6 class="text-xs font-bold text-ink-muted mt-3 mb-1 uppercase tracking-wider">$1</h6>');
    raw = raw.replace(/^##### (.*$)/gim, '<h5 class="text-sm font-semibold text-ink-soft mt-3 mb-1.5 uppercase tracking-wider">$1</h5>');
    raw = raw.replace(/^#### (.*$)/gim, '<h4 class="text-base font-bold text-ink mt-5 mb-2">$1</h4>');
    raw = raw.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-ink mt-6 mb-2">$1</h3>');
    raw = raw.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-ink mt-8 mb-3 pb-2 border-b border-white/[0.08]">$1</h2>');
    raw = raw.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-ink mt-4 mb-4 pb-2 border-b border-white/[0.08]">$1</h1>');

    // Horizontal rules
    raw = raw.replace(/^---$/gim, '<hr class="border-t border-white/[0.08] my-6" />');

    // Bold & italic
    raw = raw.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-ink">$1</strong>');
    raw = raw.replace(/\*(.*?)\*/g, '<em class="italic text-ink-soft">$1</em>');

    // Inline code
    raw = raw.replace(/`([^`]+)`/g, '<code class="font-mono text-xs text-ink bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 rounded">$1</code>');

    // Unordered lists
    raw = raw.replace(/^\s*[-*]\s+(.*)$/gim, '<li class="text-ink-soft text-sm leading-relaxed ml-4 list-disc">$1</li>');

    // Standard markdown links [text](url)
    raw = raw.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-ink underline decoration-white/30 hover:decoration-white font-medium transition-colors">$1</a>');

    // Paragraph wrapping for non-HTML lines
    const lines = raw.split('\n');
    const processedLines = lines.map((line) => {
      const trimmed = line.trim();
      if (
        !trimmed ||
        trimmed.startsWith('<') ||
        trimmed.startsWith('__CODE_BLOCK_') ||
        trimmed.startsWith('<li') ||
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<hr')
      ) {
        return line;
      }
      return `<p class="text-ink-soft text-sm leading-relaxed my-2.5">${line}</p>`;
    });
    raw = processedLines.join('\n');

    // 4. Restore code blocks with clean terminal styling
    raw = raw.replace(/__CODE_BLOCK_(\d+)__/g, (_, idx) => {
      const { lang, code } = codeBlocks[Number(idx)];
      const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      return `
        <div class="my-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0E0E0E]">
          <div class="flex items-center justify-between px-3.5 py-2 border-b border-white/[0.06] bg-white/[0.02]">
            <span class="font-mono text-[11px] text-ink-muted uppercase">${lang || 'terminal'}</span>
          </div>
          <pre class="p-4 font-mono text-xs sm:text-[13px] text-ink leading-relaxed overflow-x-auto no-scrollbar m-0"><code>${escaped}</code></pre>
        </div>
      `;
    });

    return raw;
  }, [content, repo, branch]);

  return (
    <div
      className="readme-content space-y-3 font-sans text-ink-soft selection:bg-white/20"
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}

export default function ReadmeFrameModal({ project, isOpen, onClose }) {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !project) return;

    let isMounted = true;
    setLoading(true);

    const rawUrl = `https://raw.githubusercontent.com/gozajpeg/${project.repo}/${project.branch}/README.md`;

    fetch(rawUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (isMounted) {
          setMarkdown(text);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setMarkdown(FALLBACK_READMES[project.repo] || FALLBACK_READMES.prins);
          setLoading(false);
        }
      });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, project, onClose]);

  if (!mounted || !isOpen || !project) return null;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl h-[82vh] max-h-[800px] bg-[#121212] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          {/* Header Bar - Clean, no pills, no badges, no cyber text */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/[0.08] bg-[#161616] shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-sans text-sm font-semibold text-ink">
                {project.name}
              </span>
              <span className="text-ink-muted/60 text-xs hidden sm:inline">
                github.com/gozajpeg/{project.repo}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs font-semibold text-ink-muted hover:text-ink transition-colors no-underline hidden sm:inline-flex items-center gap-1"
              >
                <span>GitHub ↗</span>
              </a>
              {project.npm && (
                <a
                  href={project.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-semibold text-ink-muted hover:text-ink transition-colors no-underline hidden sm:inline-flex items-center gap-1"
                >
                  <span>npm ↗</span>
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="font-sans text-xs font-semibold text-ink-muted hover:text-ink bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg px-3 py-1.5 cursor-pointer transition-colors"
                aria-label="Close README viewer"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-10">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-ink-muted">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span className="font-sans text-xs">Loading documentation...</span>
              </div>
            ) : (
              <MarkdownRenderer content={markdown} repo={project.repo} branch={project.branch} />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
